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

  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    overflow-x: hidden;
    overflow-y: auto;
  }

  #content {
    overflow-x: hidden;
    overflow-y: auto;
    flex-grow: 1;
  }

</style>
