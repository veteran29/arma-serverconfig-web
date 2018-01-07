<template>
  <div id="app">
		<div id="content">
	  	<config-builder/>
		</div>
  </div>
</template>

<script>
import ConfigBuilder from "@/components/Config/Builder";

export default {
  name: "app",
  components: {
    ConfigBuilder: ConfigBuilder
  }
};
</script>
