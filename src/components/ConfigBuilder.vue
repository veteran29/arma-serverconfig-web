<template>
	<b-container fluid>
		<b-row>
			<b-col id="config-source" md="6">
			<b-row>
				<b-col>

				<b-card
					header="Select params source"
					header-bg-variant="dark"
					header-text-variant="light"
					border-variant="secondary"
				>

					<b-col>
						<!-- <label class="form-control-label">Select source</label> -->
					</b-col>
					<b-col >
						<b-select v-model="selectedSource"
							@change="fetchConfig"
							:disabled="loadingConfig"
						>
							<option v-once :value="null">-</option>
							<option v-for="source in sources" :key="source"
								:value="source"
							>{{ source }}</option>
						</b-select>
					</b-col>
				</b-card>
				</b-col>
			</b-row>

			<b-row>
				<b-col>
				<b-card border-variant="secondary">

					<spinner size="large" message="Loading..." v-if="loadingConfig">Loading...</spinner>
					<b-form-group
						v-else
						v-for="(paramData, paramName, index) in config" :key="index"
					>
							<label class="control-label">{{ paramName }}</label>
							<config-param
								:data="paramData"
								:name="paramName"
							></config-param>
					</b-form-group>

				</b-card>
				</b-col>
			</b-row>
			</b-col>

			<b-col id="config-preview" md="6" >
				<b-textarea value="asdasdasd" :readonly="true"></b-textarea>
			</b-col>
		</b-row>


	</b-container>
</template>

<script>
import ConfigParam from "@/components/ConfigParam"
import Spinner from "vue-simple-spinner"

import configService, { configs as configsList } from "@/services/config"
import Parser from "@/services/parser"

export default {
	components: {
		ConfigParam,
		Spinner
	},
	data() {
		return {
			config: {},
			sources: Object.keys(configsList),
			selectedSource: null,
			loadingConfig: false
		};
	},
	mounted() {},
	methods: {
		fetchConfig(source) {
			this.config = {};
			if(source === null) {
				return;
			}
			this.loadingConfig = true;

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
				})
				.then(() => {
					this.loadingConfig = false;
				});
		}
	}
};
</script>
