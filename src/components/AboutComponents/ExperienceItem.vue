<template>
  <div class="experience-card">
    <!-- Left Side: Image with Progressive Frosty Overlay -->
    <div class="image-container">
      <img :src="imageSrc" :alt="where" class="org-image" />
      <div class="frosty-overlay">
        <span class="org-name">{{ where }}</span>
      </div>
    </div>

    <!-- Right Side: Content -->
    <div class="content-wrapper">
      <div class="header-row">
        <h3 class="role-title">{{ title }}</h3>
        <span class="time-pill">{{ time_start }} — {{ time_end }}</span>
      </div>
      
      <div 
        class="scrollable-content" 
        ref="contentRef"
        @scroll="checkScroll"
      >
        <p class="description">{{ content }}</p>
        <!-- Spacer to ensure text clears the bottom mask when fully scrolled -->
        <div class="scroll-spacer"></div>
      </div>
      
      <!-- Fade Mask (Visible if overflowing and not at bottom) -->
      <div 
        class="fade-mask"
        :class="{ 'visible': showMask }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue';

const props = defineProps<{
  icon: string;
  where: string;
  time_start: string;
  time_end: string;
  title: string;
  content: string;
}>();

const imageSrc = computed(() => {
  return new URL(`../../assets/images/${props.icon}`, import.meta.url).href;
});

const contentRef = ref<HTMLElement | null>(null);
const showMask = ref(false);

const checkScroll = () => {
  const el = contentRef.value;
  if (!el) return;
  
  // Tolerance of 5px
  const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 5;
  const hasOverflow = el.scrollHeight > el.clientHeight;
  
  // Show mask if there is overflow AND we are not at the bottom
  showMask.value = hasOverflow && !atBottom;
};

onMounted(() => {
  // Check initially after render
  nextTick(() => {
    checkScroll();
    // Re-check on window resize
    window.addEventListener('resize', checkScroll);
  });
});
</script>

<style scoped>
.experience-card {
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  height: 300px; /* Increased height */
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

/* Left Column: Image */
.image-container {
  position: relative;
  width: 25%; /* Adjusted width slightly for taller aspect */
  min-width: 180px;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.org-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Progressive Frosty Overlay */
.frosty-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%; /* Cover bottom half */
  display: flex;
  align-items: flex-end; /* Text at bottom */
  padding: 16px;
  box-sizing: border-box;
  
  /* Semi-transparent background for readability */
  background: rgba(16, 16, 16, 0.1);
  
  /* Blur effect */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  /* Progressive Mask: Fades the overlay itself from transparent at top to opaque at bottom */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 60%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 60%);
  
  /* Border top is tricky with mask, removing it for cleaner blend */
}

.org-name {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.2;
  display: block;
}

/* Right Column: Content Wrapper */
.content-wrapper {
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow: hidden;
}

.header-row {
  display: flex;
  align-items: center; /* Align center */
  gap: 12px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.role-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  margin-right: auto;
  line-height: 1.2;
}

/* Accent Color Pill */
.time-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid #4ade80;
  font-family: "Space Mono", monospace;
  font-size: 0.85rem;
  color: #4ade80;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Scrollable Content Area */
.scrollable-content {
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 6px;
  
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.scrollable-content::-webkit-scrollbar {
  width: 4px;
}
.scrollable-content::-webkit-scrollbar-track {
  background: transparent;
}
.scrollable-content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.description {
  font-size: 14px;
  line-height: 1.6;
  color: #f1f1f1;
  margin-top: 15px;
}

.scroll-spacer {
  height: 40px; /* Ensures text scrolls up enough to clear the gradient area visually */
}

/* Dynamic Fade Mask */
.fade-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px; /* Taller gradient */
  background: linear-gradient(to bottom, transparent, #1f1f1f 90%); /* Match card background/page bg? Card is semi-transparent, so match underlying or dark */
  /* Using specific dark color #101010 or similar to block text */
  background: linear-gradient(to bottom, transparent, rgba(16, 16, 16, 1) 90%);
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fade-mask.visible {
  opacity: 1;
}

@media (max-width: 850px) {
  .experience-card {
    flex-direction: column;
    height: auto;
    min-height: 400px;
  }
  
  .image-container {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .content-wrapper {
    height: 250px; /* Fixed height content on mobile too */
  }
}
</style>