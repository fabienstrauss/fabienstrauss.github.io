<template>

  <div class="marquee fadeout-horizontal" :style="{ '--numItems': total, '--direction': direction }">
    <div class="marquee-track">
      <div
          class="marquee-item"
          :style="{ '--item-position': skill.position }"
          v-for="(skill, i) in skills"
          :key="skill.name + '-' + i"
      >
        <font-awesome-icon
            :icon="[ skill.prefix || 'fab', skill.icon ]"
            class="marquee-icon"
        />
        <span class="marquee-label">{{ skill.name }}</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import {ref, onMounted, onBeforeUnmount, nextTick, defineProps, computed} from 'vue'

  const props = defineProps<{
    skills: { name: string; icon: string; prefix?: 'fab' | 'fas'; position: number}[],
    direction?: 'forwards' | 'reverse'
  }>()

  const total = computed(() => props.skills.length)

</script>

<style scoped>

  .fadeout-horizontal {
    mask-image: linear-gradient(
      to right,
      transparent,
      black 5rem,
      black calc(100% - 5rem),
      transparent
    );
  }

  .marquee {
    width: 100%;
    overflow: hidden;
    --numItems: 1;
    --item-width: 150px;
    --item-gap: 75px;
    --item-width-plus-gap: calc(var(--item-width) + var(--item-gap));
    --track-width: calc(var(--item-width-plus-gap) * calc(var(--numItems) - 1));
    --speed: 20s;
    --single-slide-speed: calc(var(--speed) / var(--numItems));
  }

  .marquee-track {
    container-type: inline-size;
    display: grid;
    grid-template-columns: var(--track-width) [track] 0 [resting];
    width: max-content;
  }

  .marquee-item {
    --item-position: 0;
    grid-area: resting;
    animation: marquee-move var(--speed) linear infinite var(--direction, forwards);
    animation-delay: calc(var(--single-slide-speed) * var(--item-position) * -1);
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 1.5em;
    padding: 0.5em 1em;
    min-height: 175px;
    width: var(--item-width);
    background: #101010;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
  }

  .marquee-icon {
    font-size: 3rem;
    margin-bottom: 0.25em;
    color: #f1f1f1;
  }

  .marquee-label {
    font-size: 0.9rem;
    color: #f1f1f1;
  }

  .marquee::before,
  .marquee::after {
    content: '';
    top: 0; bottom: 0;
    width: 150px;
    pointer-events: none;
    z-index: 2;
  }

  .marquee::before {
    left: 0;
    background: linear-gradient(to right, #101010, transparent);
  }

  .marquee::after {
    right: 0;
    background: linear-gradient(to left, #101010, transparent);
  }

  @keyframes marquee-move {
    to {
      transform: translateX(calc(-100cqw - 100%));
    }

  }

</style>