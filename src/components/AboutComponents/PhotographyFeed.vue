<template>
  <div class="photography-section">
    <div class="section-header">
      <h2>Photography</h2>
    </div>
    
    <!-- Masonry Grid Wrapper with Max Height & Blur -->
    <div class="gallery-wrapper" :class="{ 'expanded': isExpanded }">
      <div class="masonry-grid">
        <div 
          v-for="(photo, index) in photos" 
          :key="index"
          class="photo-item"
          @click="openLightbox(photo)"
        >
          <img 
            :src="photo.src" 
            :alt="photo.alt" 
            loading="lazy"
            class="gallery-image"
          />
        </div>
      </div>
      
      <!-- Gradient Overlay & Show More/Less Button -->
      <div class="expand-trigger" :class="{ 'sticky-bottom': isExpanded }">
        <div v-if="!isExpanded" class="gradient-overlay"></div>
        <button class="show-more-btn" @click="toggleExpand">
          {{ isExpanded ? 'Show Less' : 'Show More' }}
          <font-awesome-icon :icon="isExpanded ? 'chevron-up' : 'chevron-down'" />
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="lightboxImage" class="lightbox" @click="closeLightbox">
          <button class="close-btn" @click.stop="closeLightbox">&times;</button>
          <div class="lightbox-content" @click.stop>
            <img :src="lightboxImage.src" :alt="lightboxImage.alt" class="lightbox-img" />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Photo {
  src: string;
  alt: string;
}

const photos = ref<Photo[]>([]);

// Dynamically import all images from the photography folder
// { eager: true } ensures they are available immediately at build time
const loadPhotos = () => {
  const imageModules = import.meta.glob('@/assets/images/photography/*.{jpg,jpeg,png,webp}', { 
    eager: true, 
    query: '?url', 
    import: 'default' 
  });

  const loadedPhotos: Photo[] = [];

  for (const path in imageModules) {
    // Extract filename for Alt text (e.g., "mountain-hike.jpg" -> "Mountain Hike")
    const fileName = path.split('/').pop()?.split('.')[0] || 'Photography';
    const formattedAlt = fileName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    loadedPhotos.push({
      src: imageModules[path] as string,
      alt: formattedAlt
    });
  }
  
  photos.value = loadedPhotos;
};

onMounted(() => {
  loadPhotos();
});

const isExpanded = ref(false);
const lightboxImage = ref<Photo | null>(null);

function lockScroll(lock: boolean) {
  const scroller = document.querySelector('#content') as HTMLElement | null;
  if (lock) {
    if (scroller) {
      (scroller as any).__prevOverflow = scroller.style.overflow;
      scroller.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }
  } else {
    if (scroller && (scroller as any).__prevOverflow !== undefined) {
      scroller.style.overflow = (scroller as any).__prevOverflow || '';
      delete (scroller as any).__prevOverflow;
    } else {
      document.body.style.overflow = '';
    }
  }
}

function toggleExpand() {
  if (isExpanded.value) {
    // When shrinking, scroll back to the section header
    const section = document.querySelector('.photography-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  isExpanded.value = !isExpanded.value;
  
  // Refresh ScrollTrigger after transition to recalculate positions
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 600); // slightly longer than CSS transition (0.5s)
}

function openLightbox(photo: Photo) {
  lightboxImage.value = photo;
  lockScroll(true);
}

function closeLightbox() {
  lightboxImage.value = null;
  lockScroll(false);
}

onBeforeUnmount(() => {
  if (lightboxImage.value) {
    lockScroll(false);
  }
});
</script>

<style scoped>
.photography-section {
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 4rem var(--container-padding, 4em);
  box-sizing: border-box;
}

.section-header {
  margin-bottom: 2rem;
}

h2 {
  font-size: 2rem;
  margin: 0;
  color: #fff;
}

/* Wrapper for clamping height */
.gallery-wrapper {
  position: relative;
  max-height: 600px; /* Initial clamped height */
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.gallery-wrapper.expanded {
  max-height: 5000px; /* Large enough to show all */
}

/* Masonry Layout */
.masonry-grid {
  column-count: 3;
  column-gap: 20px;
}

.photo-item {
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  cursor: zoom-in;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
  /* Ensure images fill the width, height is natural */
}

.photo-item:hover .gallery-image {
  transform: scale(1.02);
}

/* Wrapper for trigger and gradient */
.expand-trigger {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  z-index: 5;
}

.expand-trigger.sticky-bottom {
  position: relative;
  margin-top: 20px;
  padding-bottom: 0;
}

/* Gradient Overlay */
.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, transparent, #101010);
  pointer-events: none;
}

.show-more-btn {
  position: relative;
  z-index: 6;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Space Mono", monospace;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.show-more-btn:hover {
  background: #fff;
  color: #101010;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999; /* Higher z-index */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: zoom-out;
  backdrop-filter: blur(10px); /* Add blur to background */
}

.lightbox-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 50px rgba(0,0,0,0.8);
  cursor: default;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
}

.close-btn:hover {
  opacity: 1;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .masonry-grid {
    column-count: 2;
  }
}

@media (max-width: 600px) {
  .masonry-grid {
    column-count: 1;
  }
}
</style>