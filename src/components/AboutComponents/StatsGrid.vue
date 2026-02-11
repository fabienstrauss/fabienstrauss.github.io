<template>
  <div class="stats-grid">
    <!-- Left Column: Travel Globe -->
    <div class="globe-column">
      <div class="stat-card globe-card">
        <div class="card-header">
          <h3>Travel Log</h3>
        </div>
        <div class="placeholder-content">
          <div ref="globeContainerEl" class="globe-mount"></div>
        </div>
      </div>
    </div>

    <!-- Right Column: 2x2 Stats -->
    <div class="stats-column">
      <!-- LeetCode -->
      <div class="stat-card">
        <div class="card-header">
          <h3>LeetCode</h3>
        </div>
        <div class="stat-content">
          <div class="big-number">220+</div>
          <p class="stat-label">Questions Solved</p>
        </div>
      </div>

      <!-- Hackathons -->
      <div class="stat-card">
        <div class="card-header">
          <h3>Hackathons</h3>
        </div>
        <div class="stat-content">
          <div class="big-number">6</div>
          <p class="stat-label">Participated</p>
        </div>
      </div>

      <!-- GitHub Activity -->
      <div class="stat-card">
        <div class="card-header">
          <h3>GitHub Activity</h3>
        </div>
        <div class="stat-content">
          <div class="big-number" ref="githubStatEl">1</div>
          <p class="stat-label">Contributions (Last Year)</p>
        </div>
      </div>

      <!-- Books Read -->
      <div class="stat-card">
        <div class="card-header">
          <h3>Books Read</h3>
        </div>
        <div class="stat-content">
          <div class="big-number">1</div>
          <p class="stat-label">This Year</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { createGlobe } from 'travel3dglobe';
import { useGitHubStats } from '@/composables/useGitHubStats';

const { totalContributions, fetchGitHubContributions } = useGitHubStats();
const githubStatEl = ref<HTMLElement | null>(null);
const globeContainerEl = ref<HTMLElement | null>(null);
let globeInstance: { destroy?: () => void } | null = null;

onMounted(async () => {
  if (globeContainerEl.value) {
    let loadedConfig: Record<string, unknown> = {};
    try {
      const configUrl = `${import.meta.env.BASE_URL}globe-config.json`;
      const response = await fetch(configUrl);
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.status}`);
      }
      loadedConfig = await response.json();
    } catch (error) {
      console.error('Could not load globe-config.json, using default config.', error);
    }

    globeInstance = await createGlobe({
      container: globeContainerEl.value,
      enableDebugPanel: false,
      config: loadedConfig
    });
  }

  // Ensure data is fetched
  await fetchGitHubContributions();

  if (githubStatEl.value && totalContributions.value > 0) {
    gsap.fromTo(githubStatEl.value, 
      { textContent: 0 },
      {
        textContent: totalContributions.value,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        // Append '+' if needed in a separate element or handling, 
        // but for now simple number count up is fine.
        // If we want "500+", we can do an onUpdate or format, but simple number is cleaner for now.
      }
    );
  }
});

onUnmounted(() => {
  globeInstance?.destroy?.();
  globeInstance = null;
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 20px;
  width: 100%;
}

.globe-column {
  display: flex;
  flex-direction: column;
}

.globe-card {
  flex-grow: 1; /* Fill the entire left column height */
  min-height: 300px;
}

.stats-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, border-color 0.3s ease;
  min-height: 140px;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.3);
}

.card-header {
  margin-bottom: auto; /* Push content down */
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-content {
  margin-top: 1rem;
}

.big-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f1f1f1;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.placeholder-content {
  position: relative;
  flex-grow: 1;
  min-height: 220px;
}

.globe-mount {
  position: absolute;
  inset: 0;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .globe-card {
    min-height: 250px;
  }

  .stats-column {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .stats-column {
    grid-template-columns: 1fr;
  }
}
</style>
