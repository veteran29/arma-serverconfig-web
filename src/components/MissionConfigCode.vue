<template>
  <pre
    v-highlightjs="source"
  >
    <code class="cpp"/>
  </pre>
</template>

<script>
// Utils
import { isParamACategory } from "@/util/param";

export default {
  props: {
    params: {
      type: Object,
      required: true
    }
  },

  computed: {
    sourceStart() {
      return 'class Missions\n{\n\tclass Mission_1\n\t{\n\t\t// Remember to input correct mission name\n\t\ttemplate = "kp_liberation.Altis";\n\t\tdifficulty = "custom";\n\t\tclass Params\n\t\t{\n';
    },
    sourceEnd() {
      return "\t\t};\n\t};\n};";
    },
    paramLines() {
      if (!Object.keys(this.params).length) {
        return "";
      }

      return Object.keys(this.params)
        .reduce(
          (sourceLines, key) => (sourceLines += this.paramToSourceLine(key)),
          ""
        );
    },
    source() {
      return this.sourceStart + this.paramLines + this.sourceEnd;
    }
  },

  methods: {
    paramToSourceLine(name) {
			const param = this.params[name];
      return isParamACategory(param) ? `\t\t\t/* ${param.title} */\n` : `\t\t\t${name}=${param.selectedValue}\n`;
    }
  }
};
</script>

<style scoped>
pre {
  tab-size: 2;
}
</style>

