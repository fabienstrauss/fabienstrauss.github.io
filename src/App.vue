<script setup lang="ts">
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
</script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/work">Work</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style scoped> 

</style>
