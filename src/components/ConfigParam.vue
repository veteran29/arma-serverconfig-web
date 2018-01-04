<template>
	<b-select
		:id="selectId"

		v-model="selected"
		:options="options"
	></b-select>
</template>

<script>
export default {
  data() {
    return {
			selected: '',
			selectId: null
		};
  },
  props: {
    name: '',
    data: {}
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
	mounted() {
		this.selected = this.data.default;
	}
};
</script>
