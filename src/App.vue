<template>

  <div id="app">
    <!-- -- Navbar -- -->
    <HeaderComponent :showNavbar="showNavbar"/>

    <!-- -- Main Content Area -- -->
    <main id="content" ref="content">
      <router-view/>
    </main>
  </div>

</template>

<script setup lang="ts">

  import { ref, onMounted, onUnmounted } from 'vue';
  import HeaderComponent from './components/HeaderComponent.vue';

  // Define the ref with a proper type annotation
  const content = ref<HTMLElement | null>(null);

  const showNavbar = ref(true);
  let lastScrollPosition = 0;

  const handleScroll = () => {
    // Now TypeScript knows content.value might be an HTMLElement
    const currentScrollPosition = content.value?.scrollTop || 0;
    if (currentScrollPosition > lastScrollPosition) {
      // Scroll Down
      showNavbar.value = false;
    } else {
      // Scroll Up
      showNavbar.value = true;
    }
    lastScrollPosition = currentScrollPosition;
  };

  onMounted(() => {
    content.value?.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    content.value?.removeEventListener('scroll', handleScroll);
  });

</script>

<style scoped> 

  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
  }

  #content {
    flex-grow: 1;
    width: 100vw;
    overflow-y: auto;
  }

</style>
