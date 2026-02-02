<template>
  <div class="hero-visual" ref="visualContainer">
    <div class="profile-scene" :style="sceneStyle">
      <div class="profile-container">
        <img :src="image" alt="Profile" class="profile-image" />
        
        <!-- Connecting Lines (Behind tags) -->
        <div 
          v-for="(tag, index) in tags" 
          :key="`line-${index}`"
          class="tag-line"
          :style="getLineStyle(index, tag)"
        ></div>

        <!-- Dynamic Tags -->
        <div 
          v-for="(tag, index) in tags" 
          :key="`tag-${index}`"
          class="tag-item"
          :style="getTagStyle(index)"
        >
          <div class="tag-content">
            <font-awesome-icon :icon="[tag.prefix || 'fab', tag.icon]" class="tag-icon" />
            <span>{{ tag.label }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

export interface Tag {
  label: string;
  icon: string;
  prefix?: string;
  imageGap?: number; // Optional manual override for start distance
}

const props = defineProps<{
  tags: Tag[];
  image: string;
  lineStartOffset?: number; // Default gap from center
}>();

const visualContainer = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

// Constants
const BASE_RADIUS = 180; // Distance of tags from center
const DEFAULT_GAP = 105;  // Default distance from center where line starts (Image radius ~100px)

// Mouse interaction for 3D effect
const sceneStyle = computed(() => {
  const rotateX = mouseY.value * -10; // Max 10 deg rotation
  const rotateY = mouseX.value * 10;
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  };
});

const handleMouseMove = (event: MouseEvent) => {
  if (!visualContainer.value) return;
  
  const rect = visualContainer.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Normalize to -1 to 1 based on container center
  mouseX.value = (x / rect.width) - 0.5;
  mouseY.value = (y / rect.height) - 0.5;
};

const handleMouseLeave = () => {
  gsap.to(mouseX, { value: 0, duration: 0.5 });
  gsap.to(mouseY, { value: 0, duration: 0.5 });
};

onMounted(() => {
  const container = visualContainer.value;
  if (container) {
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
  }
});

onBeforeUnmount(() => {
  const container = visualContainer.value;
  if (container) {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  }
});

// Dynamic Tag Positioning
const getTagStyle = (index: number) => {
  const count = props.tags.length;
  // Start from -45deg (Top Right)
  const angleDeg = -45 + (index * (360 / count));
  const angleRad = angleDeg * (Math.PI / 180);
  
  const x = Math.cos(angleRad) * BASE_RADIUS;
  const y = Math.sin(angleRad) * BASE_RADIUS;

  return {
    transform: `translate3d(${x}px, ${y}px, 40px)`
  };
};

const getLineStyle = (index: number, tag: Tag) => {
  const count = props.tags.length;
  const angleDeg = -45 + (index * (360 / count));
  
  // Determine start distance (Gap from image)
  const gap = tag.imageGap !== undefined ? tag.imageGap : (props.lineStartOffset || DEFAULT_GAP);
  
  // Length is distance from gap to tag center
  // The line will go under the tag content, appearing to stop at the border
  const length = BASE_RADIUS - gap;

  return {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: `${length}px`,
    height: '1px',
    background: 'rgba(255, 255, 255, 0.3)',
    transformOrigin: 'left center',
    // Align Z-depth with image (20px), well behind tags (40px) to prevent z-fighting
    transform: `rotate(${angleDeg}deg) translate(${gap}px, 0) translateZ(20px)`,
    zIndex: -1 // Behind tags
  };
};

</script>

<style scoped>
.hero-visual {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.profile-scene {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

.profile-container {
  position: absolute; /* Changed to absolute */
  top: 50%; /* Centering */
  left: 50%; /* Centering */
  transform: translate(-50%, -50%); /* Centering */
  width: 0; 
  height: 0;
  transform-style: preserve-3d;
  /* Removed display: flex, align-items, justify-content */
}

.profile-image {
  width: 200px; /* Explicit size */
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
  transform: translateZ(20px);
  /* Center the image relative to its 0x0 parent */
  position: absolute;
  top: -100px; /* Half height */
  left: -100px; /* Half width */
  /* Removed old margin-top and margin-left */
}

/* TAGS SYSTEM */
.tag-item {
  position: absolute; 
  top: 0;
  left: 0;
  /* transform sets the position */
  z-index: 100; /* Ensure tags are above lines */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.tag-content {
  background: rgb(16, 16, 16); /* Solid background */
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* backdrop-filter: blur(8px); Removed as it's no longer needed for opaque background */
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Space Mono", monospace;
  font-size: 0.8rem;
  color: #fff;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  
  /* Center content on the coordinate */
  transform: translate(-50%, -50%); 
}

.tag-content:hover {
  border-color: #4ade80;
  transform: translate(-50%, -50%) scale(1.05);
}

.tag-icon {
  color: #4ade80;
}

.tag-line {
  /* Styles are set inline */
  pointer-events: none;
}
</style>
