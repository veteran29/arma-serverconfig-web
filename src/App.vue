<template>
  <div id="app">
	  <h2>Arma config builder</h2>
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
