<script setup lang="ts">
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
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
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #content {
    overflow-y: auto;
    flex-grow: 1;
  }

</style>
