<template>
  <div class="about-page">
    <section class="intro" ref="heroRef">
      <!-- Mesh Gradient with Orbs (Home Color Scheme) -->
      <div class="hero-background">
        <div class="mesh-gradient">
          <div class="mesh-orb orb-1"></div>
          <div class="mesh-orb orb-2"></div>
          <div class="mesh-orb orb-3"></div>
        </div>
        <div class="noise-overlay"></div>
      </div>

      <div class="intro-content">
        <div class="hero-layout">
          <div class="hero-text">
            <h1 ref="introTitle" class="intro-title">
              <span class="title-word highlight">About Me</span>
            </h1>
            <p class="intro-subtitle">
              I’m curious by nature and enjoy exploring ideas at my own pace. Small projects help me learn, reflect, and grow over time.
            </p>
          </div>
          
          <ProfileScene :tags="tags" :image="meEmoji" class="hero-visual" />
        </div>
      </div>
    </section>

    <!-- Stats Grid with Now Tag -->
    <section class="stats-section anim-section">
      <div class="stats-container">
        <div class="now-wrapper">
          <NowStatus />
        </div>
        <StatsGrid />
      </div>
    </section>
    <HackathonSocials class="anim-section" />
    <PhotographyFeed class="anim-section" />
    <BooksMusicSection class="anim-section" />

    <!--
    <section class="details-section education">
      <h2 class="anim-header">Education</h2>
      <div class="items-list">
        <ExperienceItem 
          v-for="(item, index) in educationList" 
          :key="index"
          v-bind="item"
          class="anim-item"
        />
      </div>
    </section>

    <section class="details-section experience">
      <h2 class="anim-header">Experience</h2>
      <div class="items-list">
        <ExperienceItem 
          v-for="(item, index) in experienceList" 
          :key="index"
          v-bind="item"
          class="anim-item"
        />
      </div>
    </section>
    -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import meEmoji from '@/assets/images/me-emoji.png';
import ProfileScene, { type Tag } from '@/components/AboutComponents/ProfileScene.vue';
import ExperienceItem from '@/components/AboutComponents/ExperienceItem.vue';
import NowStatus from '@/components/AboutComponents/NowStatus.vue';
import StatsGrid from '@/components/AboutComponents/StatsGrid.vue';
import HackathonSocials from '@/components/AboutComponents/HackathonSocials.vue';
import PhotographyFeed from '@/components/AboutComponents/PhotographyFeed.vue';
import BooksMusicSection from '@/components/AboutComponents/BooksMusicSection.vue';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const introTitle = ref<HTMLElement | null>(null);

const getAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const currentAge = getAge(new Date('2002-05-20'));

const tags: Tag[] = [
  { label: `Level ${currentAge}`, icon: 'gamepad', prefix: 'fa' },
  { label: 'Berlin Based', icon: 'map-pin', prefix: 'fa' },
  { label: 'Hardware Tinkerer', icon: 'microchip', prefix: 'fa' },
  { label: 'Visual Eye', icon: 'camera', prefix: 'fa' },
  { label: 'Continuous Lerner', icon: 'rocket', prefix: 'fa' },
  { label: 'Team Player', icon: 'users', prefix: 'fa' }
];

const educationList = [
  {
    icon: 'tu-berlin.jpg',
    where: 'TU Berlin',
    title: 'Master’s in Computer Science',
    time_start: '04/2025',
    time_end: 'Present',
    content: 'Pursuing a Master’s degree to deepen my theoretical understanding and practical skills in advanced computer science topics. My focus lies in distributed systems and software engineering, driven by an intrinsic passion for technology and a commitment to continuous personal and professional growth.'
  },
  {
    icon: 'hwr-berlin.jpg',
    where: 'HWR Berlin',
    title: 'Bachelor of Science Business Informatics',
    time_start: '09/2020',
    time_end: '09/2023',
    content: 'Completed a dual study program integrating computer science with business administration. Gained a solid foundation in software development, data analysis, and IT management while simultaneously applying these concepts in a professional environment. The curriculum emphasized both technical proficiency and the ability to solve business problems through technology.'
  }
];

const experienceList = [
  {
    icon: 'stromnetz-berlin.jpg',
    where: 'Stromnetz Berlin GmbH',
    title: 'Application Support Engineer',
    time_start: '10/2023',
    time_end: 'Present',
    content: 'Currently responsible for the maintenance, optimization, and stability of critical IT applications. My role involves deploying and managing containerized applications on Kubernetes clusters, configuring and securing endpoints via Azure API Management, and developing comprehensive automation scripts. I actively design and maintain CI/CD pipelines to ensure reliable and efficient software delivery. Additionally, I coordinate with cross-functional teams to troubleshoot complex incidents, perform root cause analysis, and implement preventative measures. I am also deeply involved in documenting system architectures and operational procedures to ensure knowledge sharing and team scalability. The dynamic nature of this role requires constant learning and adaptation to new technologies, ensuring that our infrastructure remains robust, scalable, and secure against emerging threats.'
  },
  {
    icon: 'stromnetz-berlin.jpg',
    where: 'Stromnetz Berlin GmbH',
    title: 'Dual Student in Business Informatics',
    time_start: '09/2020',
    time_end: '09/2023',
    content: 'During my three-year dual study program, I rotated through various departments, gaining hands-on experience in different facets of enterprise IT. I actively participated in agile project teams, contributed to software development tasks, and applied academic concepts directly to real-world scenarios, bridging the gap between theory and practice.'
  }
];

const setupScrollAnimations = () => {
  const scroller = document.getElementById('content');
  if (!scroller) {
    console.warn("Scroller #content not found!");
    return;
  }

  // Animate Education & Experience Headers
  gsap.utils.toArray('.anim-header').forEach((header: any) => {
    gsap.fromTo(header,
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          scroller: scroller,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // Animate List Items
  gsap.utils.toArray('.anim-item').forEach((item: any) => {
    gsap.fromTo(item,
      { y: 50, autoAlpha: 0, scale: 0.98 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          scroller: scroller,
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // Animate New Sections (Stats, Hackathon, Photo, Books)
  gsap.utils.toArray('.anim-section').forEach((section: any) => {
    gsap.fromTo(section,
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          scroller: scroller,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });
};

onMounted(() => {
  // Immediately set initial state to avoid flash
  gsap.set('.anim-header, .anim-item, .anim-section', { autoAlpha: 0, y: 30 });

  // Hero Entrance
  const titleWords = introTitle.value?.querySelectorAll('.title-word');
  const subtitle = document.querySelector('.intro-subtitle');
  const visual = document.querySelector('.hero-visual');

  if (titleWords) {
    gsap.fromTo(titleWords,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }

  if (subtitle) {
    gsap.fromTo(subtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );
  }

  if (visual) {
    gsap.fromTo(visual,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }

  // Setup ScrollTrigger after a slight delay
  setTimeout(() => {
    setupScrollAnimations();
    ScrollTrigger.refresh();
  }, 500);
});

onBeforeUnmount(() => {
  ScrollTrigger.killAll();
});
</script>

<style scoped>
.about-page {
  background: #101010;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

section {
  width: 100%;
  box-sizing: border-box;
}

.intro {
  position: relative;
  min-height: 80vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  background: transparent;
}

/* Hero Background - Mesh Gradient with Orbs */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}

.mesh-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #101010;
  filter: blur(80px);
}

.mesh-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
  animation: moveOrb 20s infinite ease-in-out alternate;
}

.orb-1 { width: 60vw; height: 60vw; background: #ffffff; top: -10%; left: -10%; animation-delay: 0s; opacity: 0.1; }
.orb-2 { width: 50vw; height: 50vw; background: #5c5c5c; top: 20%; right: -10%; animation-delay: -5s; opacity: 0.2; }
.orb-3 { width: 40vw; height: 40vw; background: #2e2e2e; bottom: -10%; left: 30%; animation-delay: -10s; opacity: 0.3; }

@keyframes moveOrb {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, 50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.26' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
  filter: contrast(120%) brightness(120%);
}

.intro-content {
  position: relative;
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  padding: 0 var(--container-padding, 4em);
  margin: 0 auto;
  z-index: 2;
  box-sizing: border-box;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.intro-title {
  font-size: 50px;
  font-weight: 700;
  margin: 0 0 10px 0;
  line-height: 60px;
  word-spacing: -15px;
  display: flex;
  flex-direction: column;
}

.title-word { display: block; }

.intro-subtitle {
  font-size: 16px;
  color: #f1f1f1;
  margin: 0;
  line-height: 20px;
  font-weight: 400;
  max-width: 600px;
}

/* Details Section Styles */
.details-section {
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 4em);
  padding-bottom: 4em;
  box-sizing: border-box;
}

.details-section h2 {
  font-size: 30px;
  margin-bottom: 2rem;
}

.stats-section {
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 2rem var(--container-padding, 4em);
  box-sizing: border-box;
}

.stats-container {
  position: relative;
}

.now-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 30px; 
}

@media (max-width: 850px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: left; /* Ensure text align is left */
  }
  
  .intro { padding-top: 100px; }

  .hero-text { 
    align-items: flex-start; /* Align flex items to start (left) */
  }
  
  .intro-title { font-size: 3rem; }

  /* Scale down profile scene to fit mobile without overflow */
  .hero-visual {
    transform: scale(0.7);
    margin-top: -50px; /* Pull it up a bit since scale reduces space */
    margin-bottom: -50px;
  }
}
</style>