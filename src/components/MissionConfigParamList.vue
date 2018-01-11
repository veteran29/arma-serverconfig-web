<template>
  <b-card
    header-bg-variant="dark"
    header-text-variant="light"
    border-variant="secondary"
    :header="title"
  >
    <b-form-group
      v-for="(paramData, paramName, index) in params"
      :key="index"
    >
      <label class="control-label">{{ paramData.title }}</label>
      <!--
				TODO: migrate to vuex?
				v-model here is a BAD practice child component should not mutate "params" (prop)
			-->
      <config-param
        v-model="paramData.selectedValue"
        :data="paramData"
        :name="paramName"
      />
    </b-form-group>
  </b-card>
</template>

<script>
import ConfigParam from "@/components/MissionConfigParam";

export default {
  components: {
    ConfigParam
  },

  props: {
    title: {
      type: String,
      required: false,
      default: "Params"
    },
    params: {
      type: Object,
      required: true
    }
  }
};
</script>
