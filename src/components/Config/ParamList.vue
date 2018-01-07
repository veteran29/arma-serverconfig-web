<template>
	<b-card
		header-bg-variant="dark"
		header-text-variant="light"
		border-variant="secondary"
		:header="title"
	>
		<b-form-group
			v-for="(paramData, paramName, index) in params" :key="index"
		>
			<label class="control-label">{{paramData.title}}</label>
			<config-param
				v-model="paramData.selectedValue"
				:data="paramData"
				:name="paramName"
			></config-param>
		</b-form-group>
	</b-card>
</template>

<script>
import ConfigParam from '@/components/config/param'

export default {
	components: {
		ConfigParam
	},
	props: {
		title: '',
		params: {
			type: Object,
			required: true
		}
	}
}
</script>
