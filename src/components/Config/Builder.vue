<template>
	<b-container fluid>
		<b-row>
			<!-- Config Settings (left col) -->
			<b-col id="config-source" md="6">
			<!-- Config selection -->
			<b-row>
				<b-col>

				<b-card
					header="Params source"
					header-bg-variant="dark"
					header-text-variant="light"
					border-variant="secondary"
				>
					<b-select v-model="selectedSource"
						@change="fetchConfig"
						:disabled="loadingConfig"
					>
						<option v-once :value="null">-</option>
						<option v-for="source in sources" :key="source"
							:value="source"
						>{{ source }}</option>
					</b-select>
					<b-alert id="no-source-alert" :show="selectedSource === null" variant="warning">Select mission source to configure parameters</b-alert>
				</b-card>
				</b-col>
			</b-row>
			<!-- Config settings -->
			<b-row>
				<b-col>
				<!-- Spinner card -->
				<b-card v-if="loadingConfig" border-variant="secondary">
					<spinner size="large" message="Loading..." >Loading...</spinner>
				</b-card>
				<!-- Parameters list cards -->
				<param-list v-else
					v-for="(category, index) in categorizedParams" :key="index"
					:title="category.title"
					:params="category.params"
				></param-list>
				</b-col>
			</b-row>
			</b-col>

			<!-- Config preview (right col) -->
			<b-col id="config-preview" md="6" g >
				<preview :params="config" />
			</b-col>

		</b-row>

	</b-container>
</template>

<script>
// Components
import ParamList from "@/components/Config/ParamList";
import Preview from "@/components/Config/Preview"
import Spinner from "vue-simple-spinner";
// Services
import configService, { configs as configsList } from "@/services/config";
import Parser from "@/services/parser";
// Utils
import paramUtils from "@/util/param";
import translationParser from "@/services/translationParser";

export default {
  components: {
		ParamList,
		Preview,
    Spinner,
  },

  data() {
    return {
      config: {},
      translations: {},
      sources: Object.keys(configsList),
      selectedSource: null,
      loadingConfig: false
    };
  },

  mounted() {},

  methods: {
    fetchConfig(source) {
      this.config = {};
      if (source === null) {
        return;
      }
      this.loadingConfig = true;

      return (
        Promise.all(configService.getConfigWithTranslations(source))
          /** Parse translations */
          .then(result => {
						this.translations = translationParser.fromString(result[1]);

						return [result[0], this.translations];
          })
          /** Parse config */
          .then(result => {
            const config = result[0].replace(/#include.+$/gm, ""); // dirty hack, TODO add "#include" support to class parser
            const parsed = Parser.parse(config, { translations: result[1]});
            if (!parsed.hasOwnProperty("Params")) {
              throw new Exception("Config file has no mission Params");
            }

            this.config = parsed.Params;
          })
          .catch(err => {
            throw err;
          })
          .then(() => {
            this.loadingConfig = false;
          })
      );
    }
  },

  computed: {
    categorizedParams() {
      return (
        paramUtils
          .categorizeParams(this.config)
          //Filter empty categories
          .filter(x => Object.keys(x.params).length !== 0)
      );
    }
  }
};
</script>

<style scoped>
	.card {
		margin-bottom: 15px;
	}

	#no-source-alert {
		margin-bottom: 0;
		margin-top: 1rem;
	}
</style>
