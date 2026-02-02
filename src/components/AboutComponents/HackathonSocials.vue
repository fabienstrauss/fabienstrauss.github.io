<template>
  <div class="hackathon-section">
    <h2>Hackathons</h2>
    
    <div class="hackathon-grid">
      <div 
        v-for="(hackathon, index) in hackathons" 
        :key="index"
        class="hackathon-card"
      >
        <!-- Place Badge (Top Right) -->
        <div v-if="hackathon.place" class="place-badge">
          {{ hackathon.place }}
        </div>

        <!-- Background Image -->
        <img :src="hackathon.image" :alt="hackathon.projectName" class="card-bg-image" />
        
        <!-- Frosty Overlay Content -->
        <div class="card-overlay">
          <div class="overlay-content">
            <h3 class="project-title">{{ hackathon.projectName }}</h3>
            <span class="event-name">{{ hackathon.eventName }}</span>
            
            <button class="read-more-btn" @click="openPopup(hackathon)">
              Read More
              <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Teleported Popup & Overlay -->
    <Teleport to="body">
      <div v-if="selectedHackathon" class="overlay" @click="closePopup"></div>
      <transition name="project-popup">
        <ProjectPopup
          v-if="selectedHackathon"
          :project="selectedHackathon"
          @close="closePopup"
        />
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import ProjectPopup from '@/components/HomeComponents/ProjectPopup.vue';

// Image imports
const berlinAiHackImg = new URL('@/assets/images/berlin-ai-hack.jpg', import.meta.url).href;
const geminiHackImg = new URL('@/assets/images/gemini-hack.jpg', import.meta.url).href;
const energyHackImg = new URL('@/assets/images/energy-hack.jpg', import.meta.url).href;
const energyHackImg2 = new URL('@/assets/images/energy-hack-2.jpg', import.meta.url).href;

interface HackathonData {
  eventName: string;
  projectName: string;
  image: string;
  place?: string; // Optional place property
  // Popup Props
  name: string;
  description: string;
  tags: string[];
  images: string[];
}

const hackathons = ref<HackathonData[]>([
  {
    eventName: 'Berlin AI Hackathon 2026',
    projectName: 'Arbio AI Onboarding Assistant',
    image: berlinAiHackImg,
    name: 'Arbio AI Onboarding Assistant',
    description: 'Built a multimodal onboarding system that uses the Gemini Live API for real-time voice-guided property inspections. The tool automatically identifies amenities, generates floor plans from photos, and integrates 3D LiDAR scans to instantly populate property listings.',
    tags: ['Gemini Live API', 'Next.js', 'Python', 'Lovable', 'Postgres'],
    images: [berlinAiHackImg]
  },
  {
    eventName: 'Google Gemini Hackathon',
    projectName: 'AI-Generated Point-and-Click Adventure',
    image: geminiHackImg,
    place: '2nd 🏆',
    name: 'AI-Generated Point-and-Click Adventure',
    description: 'Awarded 2nd place for a dynamic point-and-click adventure where Gemini generates personalized escape rooms and puzzles on the fly. Features seamless AI-synthesized video transitions powered by Google Veo for an immersive, cinematic experience.',
    tags: ['Gemini API', 'Google Veo', 'React', 'Node.js', 'Generative AI'],
    images: [geminiHackImg]
  },
  {
    eventName: 'Berlin Energy Hackathon',
    projectName: 'Smart PV Energy Platform',
    image: energyHackImg2,
    place: '3rd 🏆',
    name: 'Smart PV Platform',
    description: 'Clinched 3rd place by developing a solution to make solar energy accessible for apartment buildings. The platform simplifies billing and legal hurdles between landlords and tenants, turning urban rooftops into shared green powerhouses.',
    tags: ['React', 'Next.js', 'API Integration', 'Prisma'],
    images: [energyHackImg2, energyHackImg]
  }
]);

const selectedHackathon = ref<HackathonData | null>(null);

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

function openPopup(hackathon: HackathonData) {
  selectedHackathon.value = hackathon;
  lockScroll(true);
}

function closePopup() {
  selectedHackathon.value = null;
  lockScroll(false);
}

onBeforeUnmount(() => {
  if (selectedHackathon.value) {
    lockScroll(false);
  }
});
</script>

<style scoped>
.hackathon-section {
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 4rem var(--container-padding, 4em);
  box-sizing: border-box;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #fff;
}

.hackathon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.hackathon-card {
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #101010;
  /* Removed hover transform animation */
}

/* Background Image */
.card-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Place Badge */
.place-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(16, 16, 16, 0.8);
  border: 1px solid #fbbf24; /* Amber/Gold color for trophy feel */
  color: #fbbf24;
  padding: 6px 12px;
  border-radius: 50px;
  font-family: "Space Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 5;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.trophy-icon {
  font-size: 0.8rem;
}

/* Frosty Overlay */
.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75%; /* Increased height to cover text */
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  box-sizing: border-box;
  
  background: rgba(16, 16, 16, 0.7);
  
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  /* Progressive Mask */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
  
  border-top: none;
}

.overlay-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.event-name {
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  color: #4ade80;
  margin-bottom: 1rem;
}

.read-more-btn {
  align-self: flex-start;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Space Mono", monospace;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.read-more-btn:hover {
  background: #fff;
  color: #101010;
}

/* Overlay for Popup */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 10; /* Lower than ProjectPopup's 20 */
  cursor: pointer;
  backdrop-filter: blur(4px);
}

/* Responsive */
@media (max-width: 900px) {
  .hackathon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hackathon-grid {
    grid-template-columns: 1fr;
  }
  
  .hackathon-card {
    height: 350px;
  }
}
</style>