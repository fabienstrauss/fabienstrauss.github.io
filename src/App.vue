<script setup lang="ts">
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
</script>

<template>
  <div id="app">

    <!-- -- Navbar -- -->
    <nav id="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/work">Work</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

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
    width: 100%;
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #content {
    flex-grow: 1;
  }

</style>
