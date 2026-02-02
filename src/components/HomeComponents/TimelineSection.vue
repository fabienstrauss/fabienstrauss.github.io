<template>
  <div class="timeline-section" :class="sectionClasses">
    <div class="timeline-icon-indicator-wrapper">
      <div class="timeline-indicator"></div>
    </div>
    <MotionDiv
      :key="resizeKey"
      class="timeline-details"
      :variants="variants"
      initial="initial"
      whileHover="hover"
    >
      <div class="timeline-header">
        <img :src="imageSrc" alt="icon" class="icon" />
        <div class="timeline-meta">
          <div class="timeline-where">{{ where }}</div>
          <div class="timeline-time">{{ time_start }} - {{ time_end }}</div>
        </div>
      </div>
      <div class="timeline-body">
        <h3 class="timeline-title">{{ title }}</h3>
        <p class="timeline-content">{{ content }}</p>
      </div>
    </MotionDiv>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
  import { motion } from 'motion-v'

  const props = defineProps<{
    time_start: string
    time_end: string
    where: string
    title: string
    content: string
    indicatorPosition: 'left' | 'right'
    icon: string
  }>()

  const imageSrc = new URL(`../../assets/images/${props.icon}`, import.meta.url).href

  const isMobile = ref(window.innerWidth <= 850)
  function onResize() {
    isMobile.value = window.innerWidth <= 850
  }
  onMounted(() => window.addEventListener('resize', onResize))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))

  const resizeKey = ref(isMobile.value ? 'm' : 'd')
  watch(isMobile, (newVal) => {
    resizeKey.value = newVal ? 'm' : 'd'
  })

  const variants = computed(() => ({
    initial: { x: 0 },
    hover: {
      x: isMobile.value
          ? 10
          : (indicatorPosition === 'left' ? 10 : -10),
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  }))

  const sectionClasses = computed(() => ({
    'left-indicator':  props.indicatorPosition === 'left',
    'right-indicator': props.indicatorPosition === 'right',
    'reverse-row':     props.indicatorPosition === 'left',
  }))
  const indicatorPosition = props.indicatorPosition
  const time_start        = props.time_start
  const time_end          = props.time_end
  const where             = props.where
  const title             = props.title
  const content           = props.content
  const icon              = props.icon

  const MotionDiv = motion.div
</script>
  
  <style scoped>

    .timeline-section {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 0 35px 0;
    }

    .timeline-section {
      display: flex;
      align-items: flex-start;
    }

    .timeline-header {
      display: flex;
      align-items: center;        /* Icon und Text zentriert */
      gap: 8px;
      margin-bottom: 12px;
      font-size: 1rem;
      line-height: 1.2;           /* 1.2em pro Zeile */
    }

    .timeline-meta {
      display: flex;
      flex-direction: column;
      /* Zwei Zeilen à 1.2em = 2.4em Höhe */
    }

    .icon {
      width: auto;
      height: auto;
      max-height: 2.4em;
      object-fit: contain;
      margin-right: 8px;
      border-radius: 15%;
    }

    .timeline-icon-indicator-wrapper {
      margin-top: 8px;
    }

    .right-indicator .timeline-icon-indicator-wrapper {
      order: 1;
    }

    .timeline-indicator {
      top: 0;
      transform: translateY(calc(-50% - 9px));
      width: 18px;
      height: 18px;
      border: 2px solid #4ade80;
      background-color: #101010;
      border-radius: 50%;
      display: block;
      position: relative;
      z-index: 1;
      box-shadow: 0 0 8px #4ade80;
    }
    
    .left-indicator .timeline-indicator {
      left: 0;
      transform: translateX(calc((-50%) - 31px));
    }
    
    .right-indicator .timeline-indicator {
      right: 0;
      transform: translateX(calc((50%) + 31px));
    }
    
    .timeline-details {
      flex-grow: 1;
      text-align: left;
      padding-bottom: 10px;
      position: relative;
      z-index: 2;
    }

    .timeline-details * {
      word-wrap: break-word;
      hyphens: auto;
    }
    
    .timeline-time, .timeline-title, .timeline-content {
      margin: 0;
    }

    .timeline-time {
      color: #f1f1f1a7
    }

    .timeline-content {
      font-size: 14px;
      line-height: 18px;
      margin-top: 5px;
    }
    
    .reverse-row .timeline-details {
      order: 1;
    }

    @media (max-width: 1100px) {

    }

    @media (max-width: 850px) {
   
      .timeline-time {
        font-size: 12px;
      }

      .timeline-content {
        font-size: 14px;
      }

      .timeline-title {
        font-size: 15px;
      }

      .timeline-indicator {
        position: absolute;
        left: -9px;
        transform: translateY(-50%);
      }

      .timeline-section {
        padding-left: 0;
      }

    }

</style>