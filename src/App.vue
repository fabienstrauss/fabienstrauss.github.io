<template>
  <div id="app">
    <div id="top"></div>
    <!-- -- Navbar -- -->
    <HeaderComponent :showNavbar="showNavbar"/>
    <!-- -- Main Content Area -- -->
    <main id="content" ref="content">
      <!-- -- Background -- -->
      <!--<CanvasBackground/>-->
      <!-- -- Views (Home, About, ...) -- -->
      <router-view/>
      <FooterComponent/>
    </main>
  </div>
</template>

<script setup lang="ts">

  import { ref, onMounted, onUnmounted } from 'vue';
  import HeaderComponent from './components/HeaderComponent.vue';
  import FooterComponent from "@/components/FooterComponent.vue";

  const content = ref<HTMLElement | null>(null);

  const showNavbar = ref(true);
  let lastScroll = 0;

  const onScroll = () => {
    const current = content.value?.scrollTop ?? 0;
    showNavbar.value = current < lastScroll;
    lastScroll = current;
  };

  onMounted(() => content.value?.addEventListener('scroll', onScroll, { passive: true }));
  onUnmounted(() => content.value?.removeEventListener('scroll', onScroll));

</script>

<style scoped> 

  #app {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
  }

  #content {
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    overflow: auto;
  }

</style>
