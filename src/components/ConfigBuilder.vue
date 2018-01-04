<template>
	<b-container fluid>

		<b-row>
			<b-col md="3" offset-md="1">
				<div class="control-label">Select source</div>
			</b-col>
			<b-col md="6">
				<b-select v-model="selectedSource"
					@change="fetchConfig"
				>
					<option v-once :value="selectedSource">-</option>
					<option v-for="source in sources" :key="source"
						:value="source"
					>{{ source }}</option>
				</b-select>
			</b-col>
		</b-row>

		<b-row align-v="center"
			v-for="(paramData, paramName, index) in config" :key="index"
		>
			<b-col md="3" offset-md="1">
				<div class="control-label">{{ paramName }}</div>
			</b-col>
			<b-col md="6">
				<config-param
					:data="paramData"
					:name="paramName"
				></config-param>
			</b-col>
		</b-row>

	</b-container>
</template>

<script>
import ConfigParam from "@/components/ConfigParam"

import configService, { configs as configsList } from "@/services/config"
import Parser from "@/services/parser"

export default {
  components: {
    ConfigParam
  },
  data() {
    return {
      config: {},
      sources: Object.keys(configsList),
      selectedSource: null
    };
  },
  mounted() {},
  methods: {
    fetchConfig(source) {
			this.config = {};
			if(source === null) {
				return;
			}

      configService.getConfig(source)
        .then(config => {
          config = config.replace(/#include.+$/gm, ""); // dirty hack, TODO add "#include" support to class parser
          const parsed = Parser.parse(config);
          if (!parsed.hasOwnProperty("Params")) {
            throw new Exception("Config file has no mission Params");
          }
          return parsed.Params;
        })
        .then(parsed => {
          return (this.config = parsed);
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
</script>
