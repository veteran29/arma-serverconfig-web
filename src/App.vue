<template>
  <div id="app">
		<div id="content">
	  	<config-builder/>
		</div>
  </div>
</template>

<script>
import github from "@/services/config";
import Parser from "@/services/parser";

import ConfigBuilder from "@/components/ConfigBuilder";

export default {
  name: "app",
  components: {
    ConfigBuilder: ConfigBuilder
  }
};
</script>
