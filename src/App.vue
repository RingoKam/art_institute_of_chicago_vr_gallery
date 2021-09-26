<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="experience"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { World } from './World'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

onMounted(() => {
  const container = document.querySelector(".experience")
  const world = new World(container)

  world.start()
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
}

.experience {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>
