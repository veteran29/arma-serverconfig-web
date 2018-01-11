<template>
  <div id="app">
    <nav-bar/>
    <b-container
      tag="main"
      fluid
    >
      <config-builder/>
    </b-container>
  </div>
</template>

<script>
import ConfigBuilder from "@/components/MissionConfig"
import NavBar from "@/components/Navbar"

export default {
  name: "App",
  components: {
		NavBar,
    ConfigBuilder
  }
};
</script>

<style>
	.navbar {
		min-height: 3rem;
		padding: 0rem 1rem;
	}
</style>
