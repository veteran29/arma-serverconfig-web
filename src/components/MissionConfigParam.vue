<template>
  <b-select
    :value="data.default"
    @input="emitInput"
    :options="options"
  />
</template>

<script>
export default {
  props: {
		//value: '',
		//name: '',
		data: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
		};
	},

	computed: {
		options() {
			let options = [];
			for(let [index, value] of this.data.values.entries()) {
				options.push({ value, text: this.data.texts[index] });
			}
			return options;
		}
	},

	created() {
		this.$emit('input', this.data.default);
	},

	methods: {
		emitInput(e) {
			this.$emit('input', e);
		}
	}
};
</script>
