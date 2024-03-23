<script setup lang="ts">

</script>

<template>
  <div id="app">

    <!-- -- Navbar -- -->
    <div id="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/work">Work</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- -- Main Content Area -- -->
    <main id="content">
      <router-view/>
    </main>
  </div>
</template>

<style scoped> 

  html, body {
    margin: 0 px;
    padding: 0 px;
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
  }

  #navbar {
    height: 100px;
    min-height: 100px;
    width: 100vw;
    background-color: black;
    display: flex;
    color: white;
    align-items: center;
    justify-content: space-around;
  }

  #content {
    flex-grow: 1;
    width: 100vw;
  }

</style>
