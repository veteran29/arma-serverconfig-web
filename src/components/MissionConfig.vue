<template>
  <b-row>
    <!-- Left column -->
    <b-col
      md="6"
      id="config-settings"
    >
      <!-- Config selection -->
      <b-row>
        <b-col>

          <b-card
            header="Params source"
            header-bg-variant="dark"
            header-text-variant="light"
            border-variant="secondary"
          >
            <b-select
              v-model="selectedSource"
              @change="fetchConfig"
              :disabled="loadingConfig"
            >
              <option
                v-once
                :value="null"
              >-</option>
              <option
                v-for="source in sources"
                :key="source"
                :value="source"
              >{{ source }}</option>
            </b-select>
            <b-alert
              id="no-source-alert"
              :show="selectedSource === null"
              variant="warning"
            >Select mission source to configure parameters</b-alert>
          </b-card>
        </b-col>
      </b-row>
      <!-- Config settings -->
      <b-row>
        <b-col>
          <!-- Spinner card -->
          <b-card
            v-if="loadingConfig"
            border-variant="secondary"
          >
            <spinner
              size="large"
              message="Loading..."
            >Loading...</spinner>
          </b-card>
          <!-- Parameters list cards -->
          <param-list
            v-else
            v-for="(category, index) in categorizedParams"
            :key="index"
            :title="category.title"
            :params="category.params"
          />
        </b-col>
      </b-row>
    </b-col>

    <!-- Right column -->
    <b-col
      md="6"
      id="config-source"
      class="border border-secondary"
    >
      <source-code :params="config" />

    </b-col>

  </b-row>
</template>

<script>
// Components
import ParamList from "@/components/MissionConfigParamList";
import SourceCode from "@/components/MissionConfigCode";
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
    SourceCode,
    Spinner
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

  computed: {
    categorizedParams() {
      return (
        paramUtils
          .categorizeParams(this.config)
          //Filter empty categories
          .filter(x => Object.keys(x.params).length !== 0)
      );
    }
  },

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
            const parsed = Parser.parse(config, { translations: result[1] });
            if (!parsed.hasOwnProperty("Params")) {
              throw new Error("Config file has no mission Params");
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
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}

#no-source-alert {
  margin-bottom: 0;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  #config-settings {
    position: absolute;
    top: 3rem;
    left: 0;
    width: 50%;
    height: calc(100% - 3rem);
    overflow-y: scroll;
  }

  #config-source {
    position: absolute;
    top: 3rem;
    left: 50%;
    width: 50%;
    height: calc(100% - 3rem);
    overflow-y: scroll;
    padding: 0;
  }
}

.sticky {
  position: sticky;
  top: 3rem;
  height: calc(100vh - 3rem);
}
.sticky > .container {
  height: 100%;
}
</style>
