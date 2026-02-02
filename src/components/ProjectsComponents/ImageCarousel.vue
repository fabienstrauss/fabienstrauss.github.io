<template>
  <figure class="carousel">
    <div class="image-container">
      <div
        class="image-track"
        :style="{ transform: `translateX(-${translateX}%)` }"
        :class="{ 'no-transition': isResetting }"
      >
        <img
          v-for="(img, i) in infiniteImages"
          :key="i"
          :src="img"
          :alt="alt"
          class="image"
        />
      </div>
    </div>

    <button
        v-if="showNav !== false && images.length > 1"
        class="ctrl prev"
        @click="prev"
        aria-label="Previous image"
    >
      <font-awesome-icon icon="chevron-left" />
    </button>

    <button
        v-if="showNav !== false && images.length > 1"
        class="ctrl next"
        @click="next"
        aria-label="Next image"
    >
      <font-awesome-icon icon="chevron-right" />
    </button>

    <figcaption v-if="images.length > 1" class="dots">
      <button
          v-for="(img, i) in images"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="go(i)"
          :aria-label="`Go to image ${i+1}`"
      />
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
const props = defineProps<{ images: string[]; alt?: string; showNav?: boolean }>()
const emit = defineEmits(['prev', 'next'])
const current = ref(0)
const isResetting = ref(false)

// Create infinite loop by duplicating images
const infiniteImages = computed(() => {
  if (props.images.length <= 1) return props.images
  return [...props.images, ...props.images, ...props.images]
})

// Calculate translateX position
const translateX = computed(() => {
  if (props.images.length <= 1) return 0
  return (current.value + props.images.length) * 100
})

async function prev() {
  if (props.images.length <= 1) return

  current.value--
  emit('prev')

  // Reset position after animation completes
  if (current.value === -1) {
    setTimeout(async () => {
      isResetting.value = true
      current.value = props.images.length - 1
      await nextTick()
      setTimeout(() => { isResetting.value = false }, 50)
    }, 400) // Wait for transition to complete
  }
}

async function next() {
  if (props.images.length <= 1) return

  current.value++
  emit('next')

  // Reset position after animation completes
  if (current.value === props.images.length) {
    setTimeout(async () => {
      isResetting.value = true
      current.value = 0
      await nextTick()
      setTimeout(() => { isResetting.value = false }, 50)
    }, 400) // Wait for transition to complete
  }
}

function go(i: number) {
  current.value = i
}

// wenn Bilderliste wechselt, zurück auf erstes Bild
watch(() => props.images, () => { current.value = 0 })
</script>

<style scoped>
/* Root muss GENAU die Panel-Fläche einnehmen */
.carousel {
  position: relative;
  margin: 0;                 /* <figure> default margin entfernen */
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;          /* Sicherheit (keine Ränder) */
  border-radius: inherit;    /* übernimmt Panel-Radius, falls vorhanden */
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out;
}

.image-track.no-transition {
  transition: none;
}

/* Bild füllt komplett, ohne Letterboxing */
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;         /* falls du lieber nicht beschneiden willst: contain */
  display: block;
  flex-shrink: 0;
}

/* Pfeile – gemeinsame Basisklasse + Positionsklassen */
.ctrl {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(0,0,0,.45);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background 0.2s ease;
}
.ctrl:hover {
  background: rgba(0,0,0,.65);
}
.prev { left: 12px; }
.next { right: 12px; }

/* Dots */
.dots {
  position: absolute;
  left: 0; right: 0;
  bottom: 12px;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
}
.dot {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}
.dot:hover {
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}
.dot.active {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}
</style>
