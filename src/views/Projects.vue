<template>
  <div class="projects-page">
    <section class="intro">
      <!-- Animated Mesh Gradient Background -->
      <div class="hero-background">
        <div class="mesh-gradient">
          <div class="mesh-orb orb-1"></div>
          <div class="mesh-orb orb-2"></div>
          <div class="mesh-orb orb-3"></div>
        </div>
        <div class="noise-overlay"></div>
      </div>

      <div class="intro-content">
        <div class="intro-header">
          <h1 ref="introTitle" class="intro-title">
            <span class="title-word highlight">Projects</span>
          </h1>

          <!-- Integrated Project Stats -->
          <div class="intro-stats">
            <div class="stat-bubble">
              <span class="stat-number" ref="projectCount">{{ projects.length }}</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat-bubble">
              <span class="stat-number" ref="techCount">{{ getTotalTechnologies() }}</span>
              <span class="stat-label">Technologies</span>
            </div>
          </div>
        </div>

        <p class="intro-subtitle">Out of curiosity, I like to turn ideas that come to mind into small, complete projects. It helps me learn and grow from one project to the next.</p>
      </div>
    </section>

    <section class="projects" ref="sectionEl">
      <!-- Desktop Layout (original) -->
      <div class="desktop-layout">
        <div class="grid">
          <div class="left" ref="leftCol">
            <article
                v-for="(p, i) in projects"
                :key="p.id"
                class="panel"
                :data-index="i"
            >
              <div class="carousel-wrap">
                <ImageCarousel
                    :images="p.images"
                    :alt="p.title"
                    :show-nav="p.images.length > 1"
                />
              </div>
            </article>
          </div>

          <aside class="details">
            <div class="details-inner" ref="detailsEl">
              <h2 ref="titleEl">{{ projects[activeIndex].title }}</h2>
              <p ref="descEl">{{ projects[activeIndex].desc }}</p>
              <div class="project-tags" ref="tagsEl">
                <span v-for="t in projects[activeIndex].tags" :key="t" class="tag">{{ t }}</span>
                <!-- <button class="popup-button" @click="openPopup(projects[activeIndex].id)">
                  Read More
                  <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
                </button> -->
                <a 
                  v-if="projects[activeIndex].buttonText && projects[activeIndex].buttonLink"
                  :href="projects[activeIndex].buttonLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="popup-button"
                >
                  {{ projects[activeIndex].buttonText }}
                  <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <!-- Mobile Layout (simple sections) -->
      <div class="mobile-layout">
        <div class="project-list">
          <article
              v-for="(project, index) in projects"
              :key="`mobile-${project.id}`"
              class="project-section"
              :data-index="index"
          >
            <div class="project-image">
              <ImageCarousel
                  :images="project.images"
                  :alt="project.title"
                  :show-nav="project.images.length > 1"
              />
            </div>
            <div class="project-details">
              <h2>{{ project.title }}</h2>
              <p>{{ project.desc }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                <!-- <button class="popup-button" @click="openPopup(project.id)">
                  Read More
                  <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
                </button> -->
                <a 
                  v-if="project.buttonText && project.buttonLink"
                  :href="project.buttonLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="popup-button"
                >
                  {{ project.buttonText }}
                  <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="outro">
      <div class="outro-content">
        <div class="github-section">
          <!-- Header Row -->
          <div class="github-header">
            <h3>GitHub Activity</h3>
            <div class="github-button">
              <a href="https://github.com/fabienstrauss" class="link-wrapper" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'github']" class="github-icon" />
                <p>View Projects on GitHub</p>
              </a>
            </div>
          </div>

          <!-- Chart and Stats Row -->
          <div class="github-content">
            <div class="contribution-chart">
              <div class="chart-container">
                <CalendarHeatmap
                  :values="heatmapData"
                  :end-date="endDate"
                  :range-color="['transparent', 'transparent', '#065f46', '#047857', '#059669', '#10b981']"
                  :tooltip-unit="'contributions'"
                  :no-data-text="'No contributions'"
                  :max="10"
                  :tooltip="true"
                  :round="2"
                />
              </div>
            </div>
            <div class="github-stats">
              <div class="stat-item">
                <span class="stat-number" ref="totalContributionsEl">0</span>
                <span class="stat-label">Contributions this year</span>
              </div>
              <div class="stat-item">
                <span class="stat-number" ref="currentStreakEl">0</span>
                <span class="stat-label">Current streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Overlay -->
  <div v-if="isPopupVisible" class="overlay" @click="closePopup"></div>

  <!-- Popup -->
  <transition name="project-popup">
    <ProjectPopup
        v-if="isPopupVisible"
        :project="getProjectData(popupProjectKey)"
        @close="closePopup"
    />
  </transition>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { CalendarHeatmap } from 'vue3-calendar-heatmap';
  import ImageCarousel from "@/components/ProjectsComponents/ImageCarousel.vue";
  import ProjectPopup from "@/components/HomeComponents/ProjectPopup.vue";
  import { useGitHubStats } from '@/composables/useGitHubStats';

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Use Composable
  const { heatmapData, totalContributions, currentStreak, fetchGitHubContributions } = useGitHubStats();

  type PanelEl = { el: HTMLElement; top: number; bottom: number }
  type Project = {
    id: string; 
    title: string; 
    desc: string; 
    images: string[]; 
    tags?: string[];
    buttonText?: string;
    buttonLink?: string;
  }

  const projects : Project[] = [
    {
      id: 'arbio',
      title: 'Arbio AI Onboarding Assistant',
      desc: 'A multimodal tool using the Gemini Live API for real-time voice and video site inspections, automating floorplan generation through spatial prompting.',
      images: [new URL('@/assets/images/projects/propertea-mockup.jpg', import.meta.url).toString()],
      tags: ['Next.js', 'TypeScript', 'Python', 'Gemini Live API', 'Postgres', 'Hackathon'],
      buttonText: 'GitHub Repo',
      buttonLink: 'https://github.com/jorgejarne/propertea-backend'
    },
    {
      id: 'gaime',
      title: 'AI-Generated Point-and-Click Adventure',
      desc: 'A dynamic game engine that uses Generative AI to synthesize unique narratives, puzzles, and environments on-the-fly.',
      images: [new URL('@/assets/images/projects/gaime-mockup.jpg', import.meta.url).toString()],
      tags: ['Next.js', 'TypeScript', 'Nanobanana', 'Gemini', 'Hackathon'],
      buttonText: 'GitHub Repo',
      buttonLink: 'https://github.com/fabienstrauss/gaime-gemini-hack-2025'
    },
    {
      id: 'reddit-hackathon',
      title: 'ThreadGuessr Reddit Devvit',
      desc: 'An interactive social game for the Reddit ecosystem featuring persistent state management and global leaderboards via Redis-backed storage.',
      images: [new URL('@/assets/images/projects/thread-guessr-mockup.jpg', import.meta.url).toString()],
      tags: ['Devvit', 'React', 'Redis', 'Hackathon'],
      buttonText: 'View on Reddit',
      buttonLink: 'https://www.reddit.com/r/ThreadGuessr/'
    },
    {
      id: 'personal-dashboard',
      title: 'Personal Dashboard App',
      desc: 'A comprehensive productivity suite built with Electron that centralizes various modules into a single interface.',
      images: [new URL('@/assets/images/projects/personal-dashboard-mockup.jpg', import.meta.url).toString()],
      tags: ['Electron', 'React', 'JavaScript']
    },
    {
      id: 'three-globe',
      title: 'Interactive Three.js Globe',
      desc: 'A high-performance WebGL component that allows users to visualize and showcase their global travel history on an interactive 3D globe.',
      images: [new URL('@/assets/images/projects/threejs-globe-mockup.jpg', import.meta.url).toString()],
      tags: ['Three.js', 'WebGL', 'JavaScript']
    },
    {
      id: 'afterlife-website',
      title: 'Wordpress Website',
      desc: 'A high-end design showcase built with WordPress and GSAP, featuring advanced animations and modern aesthetic principles for a creative studio.',
      images: [new URL('@/assets/images/projects/afterlife-website-mockup.jpg', import.meta.url).toString()],
      tags: ['WordPress', 'GSAP', 'JavaScript', 'Custom Html & JS']
    }
  ]

  const activeIndex = ref(0)
  const sectionEl = ref<HTMLElement|null>(null)
  const leftCol    = ref<HTMLElement|null>(null)
  const detailsEl  = ref<HTMLElement|null>(null)
  const titleEl = ref<HTMLElement|null>(null)
  const descEl = ref<HTMLElement|null>(null)
  const tagsEl = ref<HTMLElement|null>(null)
  const totalContributionsEl = ref<HTMLElement|null>(null)
  const currentStreakEl = ref<HTMLElement|null>(null)
  const projectCount = ref<HTMLElement|null>(null)
  const techCount = ref<HTMLElement|null>(null)

  const endDate = ref(new Date().toISOString().split('T')[0])

  function getTotalTechnologies(): number {
    const allTags = projects.flatMap(p => p.tags || [])
    return new Set(allTags).size
  }

  let scroller: HTMLElement | null = null
  let measured: PanelEl[] = []
  let sectionTop = 0
  let sectionBottom = 0
  let ticking = false
  let ro: ResizeObserver | null = null


  const isPopupVisible = ref(false)
  const popupProjectKey = ref<string | null>(null)

  function lockScroll(lock: boolean) {
    const sc = scroller || (document.querySelector('#content') as HTMLElement | null)
    if (lock) {
      if (sc) {
        ;(sc as any).__prevOverflow = sc.style.overflow
        sc.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (sc && (sc as any).__prevOverflow !== undefined) {
        sc.style.overflow = (sc as any).__prevOverflow || ''
        delete (sc as any).__prevOverflow
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }

  function openPopup(id: string) {
    popupProjectKey.value = id
    isPopupVisible.value = true
    lockScroll(true)
  }

  function closePopup() {
    isPopupVisible.value = false
    lockScroll(false)
  }

  function getProjectData(key: string | null) {
    const p = projects.find(x => x.id === key)
    if (!p) return null
    return {
      name: p.title,
      description: p.desc,
      images: p.images
    }
  }


  function absTopInScroller(el: HTMLElement): number {
    const sRect = scroller!.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    return scroller!.scrollTop + (eRect.top - sRect.top)
  }

  function setVhVar() {
    if (!sectionEl.value || !scroller) return
    sectionEl.value.style.setProperty('--vh', `${scroller.clientHeight}px`)
  }

  function setDetailsHeightVar() {
    if (!sectionEl.value || !detailsEl.value) return
    sectionEl.value.style.setProperty('--details-h', `${detailsEl.value.offsetHeight}px`)
  }

  function measure() {
    if (!scroller || !leftCol.value || !sectionEl.value) return

    setVhVar()

    sectionTop    = absTopInScroller(sectionEl.value)
    sectionBottom = sectionTop + sectionEl.value.offsetHeight

    const els = Array.from(leftCol.value.querySelectorAll<HTMLElement>('.panel'))
    measured = els.map(el => {
      const top = absTopInScroller(el)
      return { el, top, bottom: top + el.offsetHeight }
    })

    setDetailsHeightVar()
  }

  function updateActive() {
    if (!scroller || measured.length === 0) return

    const anchorY = scroller.scrollTop + scroller.clientHeight / 2

    if (anchorY < sectionTop) { activeIndex.value = 0; return }
    if (anchorY > sectionBottom) { activeIndex.value = measured.length - 1; return }

    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < measured.length; i++) {
      const { top, bottom } = measured[i]
      let dist = 0
      if (anchorY < top) dist = top - anchorY
      else if (anchorY > bottom) dist = anchorY - bottom
      else dist = 0
      if (dist < bestDist) { bestDist = dist; best = i }
      if (dist === 0) { best = i; break }
    }
    if (best !== activeIndex.value) activeIndex.value = best
  }

  function animateTextEntrance() {
    const elements = [titleEl.value, descEl.value, tagsEl.value].filter(Boolean)
    if (elements.length === 0) return

    gsap.fromTo(elements,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    )
  }


  function createGradientText() {
    // Remove GSAP gradient - use CSS instead
  }

  // Setup entrance animations for Projects page
  function setupProjectsEntranceAnimations() {
    // Get the custom scroll container
    const scroller = document.getElementById('content');
    if (!scroller) {
      console.error('Custom scroller #content not found');
      return;
    }

    console.log('🎬 Setting up Projects page entrance animations...');

    // 1. Enhanced intro section animations
    const introStats = document.querySelector('.intro-stats');
    const introTitle = document.querySelector('.intro-title');
    const introSubtitle = document.querySelector('.intro-subtitle');

    // Simple fade-in animations
    const allElements = [introStats, introTitle, introSubtitle].filter(Boolean);

    allElements.forEach((element, index) => {
      gsap.fromTo(element,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.2
        }
      );
    });


    // 2. Mobile project sections (only for mobile layout)
    const isMobile = window.innerWidth <= 850;
    if (isMobile) {
      gsap.utils.toArray('.project-section').forEach((section, index) => {
        const projectImage = section.querySelector('.project-image');
        const projectDetails = section.querySelector('.project-details');

        // Animate project image
        if (projectImage) {
          gsap.fromTo(projectImage,
            {
              y: 80,
              opacity: 0,
              scale: 0.95
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: projectImage,
                start: "top 90%",
                toggleActions: "play none none reverse",
                scroller: scroller
              }
            }
          );
        }

        // Animate project details with stagger
        if (projectDetails) {
          const detailElements = projectDetails.querySelectorAll('h2, p, .project-tags');
          gsap.fromTo(detailElements,
            {
              y: 60,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: projectDetails,
                start: "top 85%",
                toggleActions: "play none none reverse",
                scroller: scroller
              }
            }
          );
        }
      });
    }

    // 3. GitHub section animations
    const githubHeader = document.querySelector('.github-header');
    const chartContainer = document.querySelector('.chart-container');
    const githubStats = document.querySelector('.github-stats');

    if (githubHeader) {
      gsap.fromTo(githubHeader,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: githubHeader,
            start: "top 85%",
            toggleActions: "play none none reverse",
            scroller: scroller
          }
        }
      );
    }

    if (chartContainer) {
      gsap.fromTo(chartContainer,
        {
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chartContainer,
            start: "top 85%",
            toggleActions: "play none none reverse",
            scroller: scroller
          }
        }
      );
    }

    if (githubStats) {
      const statItems = githubStats.querySelectorAll('.stat-item');
      gsap.fromTo(statItems,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: githubStats,
            start: "top 85%",
            toggleActions: "play none none reverse",
            scroller: scroller
          }
        }
      );
    }

    console.log('✅ Projects page entrance animations configured');
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isPopupVisible.value) closePopup()
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      updateActive()
    })
  }


  onMounted(async () => {
    scroller = document.querySelector('#content') as HTMLElement | null
    if (!scroller) return

    measure()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { measure(); updateActive() }, { passive: true })

    ro = new ResizeObserver(() => { measure(); updateActive() })
    ro.observe(sectionEl.value!)
    ro.observe(leftCol.value!)

    updateActive()
    setDetailsHeightVar()
    createGradientText()
    
    // Fetch GitHub Data via Composable
    await fetchGitHubContributions()

    // Animate stats numbers if elements exist
    if (totalContributionsEl.value) {
      gsap.fromTo(totalContributionsEl.value,
        { textContent: 0 },
        {
          textContent: totalContributions.value,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 }
        }
      )
    }

    if (currentStreakEl.value) {
      gsap.fromTo(currentStreakEl.value,
        { textContent: 0 },
        {
          textContent: currentStreak.value,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 }
        }
      )
    }

    window.addEventListener('keydown', onKeydown)

    // Setup entrance animations after a short delay to ensure DOM is ready
    setTimeout(() => {
      setupProjectsEntranceAnimations()
    }, 300)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    scroller?.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', measure as any)
    ro?.disconnect()
    if (isPopupVisible.value) lockScroll(false)
    // Clean up ScrollTrigger animations
    ScrollTrigger.killAll()
  })

  watch(activeIndex, async () => {
    await nextTick()
    setDetailsHeightVar()
    animateTextEntrance()
  })
</script>

<style>
  /* Import vue3-calendar-heatmap styles */
  @import 'vue3-calendar-heatmap/dist/style.css';
</style>

<style scoped>
  .projects-page {
    background: #101010;
    color: #fff;
    --details-top-margin: 80px;
    --panel-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    --info-gap: 0.5rem;

    --tag-gap: 0.5rem;
    --tag-padding-vertical: 8px;
    --tag-padding-horizontal: 16px;
    --tag-border-radius: 50px;
    --tag-bg: #f1f1f1;
    --tag-color: #101010;
    --tag-font-size: 0.75rem;
  }

  /* Hero Background - Mesh Gradient */
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    /* Fade out at the bottom */
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
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
    opacity: 0.6;
    animation: moveOrb 20s infinite ease-in-out alternate;
  }

  .orb-1 {
    width: 60vw;
    height: 60vw;
    background: #ffffff;
    top: -5%; /* Shifted from -10% */
    left: -5%; /* Shifted from -10% */
    animation-delay: 0s;
    opacity: 0.1;
  }

  .orb-2 {
    width: 50vw;
    height: 50vw;
    background: #5c5c5c;
    top: 25%; /* Shifted from 20% */
    right: -5%; /* Shifted from -10% */
    animation-delay: -5s;
    opacity: 0.2;
  }

  .orb-3 {
    width: 40vw;
    height: 40vw;
    background: #2e2e2e;
    bottom: -5%; /* Shifted from -10% */
    left: 35%; /* Shifted from 30% */
    animation-delay: -10s;
    opacity: 0.3;
  }

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
    opacity: 0.15; /* Increased opacity for visibility with finer grain */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.26' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    pointer-events: none;
    filter: contrast(120%) brightness(120%);
  }

  section {
    width: 100%;
    box-sizing: border-box;
  }

  .intro {
    position: relative;
    padding-top: 120px;
    padding-bottom: 120px;
    width: 100%;
    min-height: 400px;
    overflow: visible;
    background: #101010;
  }

  /* Floating 3D Models Background removed, referencing classes kept for safety or legacy if needed, but styling updated for new Hero */

  /* Animated Stats - Integrated */
  .intro-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 10px;
  }

  .intro-stats {
    display: flex;
    gap: 1rem;
    flex-shrink: 0;
    margin-top: 1rem;
    opacity: 0; /* Hidden initially for animation */
  }

  .stat-bubble {
    background: rgba(255, 255, 255, 0.05); /* Lighter/White based */
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    padding: 0.6rem 1.2rem;
    text-align: center;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .stat-bubble .stat-number {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff; /* White number */
    line-height: 1;
  }

  .stat-bubble .stat-label {
    display: block;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 0; /* No margin top since inline */
    font-family: "Space Mono", monospace;
  }

  .outro {
    padding-top: 80px;
    padding-bottom: 80px;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .outro-content {
    max-width: var(--container-max-width, 1200px);
    margin: 0 auto;
    padding-left: var(--container-padding, 4em);
    padding-right: var(--container-padding, 4em);
    box-sizing: border-box;
  }

  .github-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .github-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
  }

  .github-header h3 {
    color: #f1f1f1;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .github-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .chart-container {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    overflow-x: auto;
  }

  /* Override heatmap component styles */
  .chart-container :deep(*) {
    font-family: "Space Mono", monospace !important;
  }

  /* Hide legend completely */
  .chart-container :deep(.heatmap-legend),
  .chart-container :deep(.vch__legend),
  .chart-container :deep(.legend) {
    display: none !important;
  }

  /* Month and day labels */
  .chart-container :deep(text) {
    font-family: "Space Mono", monospace !important;
    font-size: 0.7rem !important;
    fill: rgba(255, 255, 255, 0.6) !important;
  }

  /* Contribution squares - GitHub style borders */
  .chart-container :deep(rect) {
    stroke: rgba(255, 255, 255, 0.15) !important;
    stroke-width: 1px !important;
  }

  /* Green squares should have no borders */
  .chart-container :deep(rect[fill="#065f46"]),
  .chart-container :deep(rect[fill="#047857"]),
  .chart-container :deep(rect[fill="#059669"]),
  .chart-container :deep(rect[fill="#10b981"]) {
    stroke: none !important;
  }

  /* Tooltip styling */
  .chart-container :deep(.tippy-box) {
    background: rgba(0, 0, 0, 0.9) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 6px !important;
    font-family: "Space Mono", monospace !important;
    font-size: 0.7rem !important;
    color: #f1f1f1 !important;
  }

  .chart-container :deep(.tippy-content) {
    font-family: "Space Mono", monospace !important;
    font-size: 0.7rem !important;
    padding: 0.4rem 0.6rem !important;
  }

  .chart-container :deep(.tippy-arrow) {
    color: rgba(0, 0, 0, 0.9) !important;
  }

  .github-stats {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .github-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 3px 20px;
    border: 1px solid #f1f1f1;
    border-radius: 100px;
    cursor: pointer;
    gap: 10px;
  }

  .github-button:hover {
    background-color: #f1f1f1;
    color: #101010;
    transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -moz-transition: all .2s linear;
  }

  .github-button:hover .github-icon {
    color: #101010;
  }

  .github-icon {
    height: 20px;
    width: auto;
    transition: color 0.3s;
    color: #f1f1f1;
  }

  .github-button p {
    font-size: 0.75rem;
    margin: 0 0 0 10px;
    color: inherit;
  }

  .link-wrapper {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #4ade80;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
  }

  .intro-content {
    position: relative;
    max-width: var(--container-max-width, 1200px);
    margin: 0 auto;
    padding-left: var(--container-padding, 4em);
    padding-right: var(--container-padding, 4em);
    box-sizing: border-box;
    z-index: 2;
  }

  .intro-title {
    font-size: 50px;
    font-weight: 700;
    margin: 0;
    line-height: 60px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    perspective: 1000px;
    flex: 1;
    opacity: 0; /* Hidden initially for animation */
  }

  .title-word {
    display: block;
    transform-style: preserve-3d;
  }

  .title-word:first-child {
    background: linear-gradient(135deg, #f1f1f1 0%, #e9ecef 50%, #d6d8db 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #f1f1f1;
  }

  .title-word.highlight {
    background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #ffffff;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  }

  .intro-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 20px;
    font-weight: 400;
    max-width: 650px;
    opacity: 0; /* Hidden initially for animation */
  }

  .projects {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    box-sizing: border-box;
    padding: 80px 4em 24px 4em;
    --details-top-margin: 80px;
    --panel-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    --info-gap: 0.5rem;

    --tag-gap: 0.5rem;
    --tag-padding-vertical: 8px;
    --tag-padding-horizontal: 16px;
    --tag-border-radius: 50px;
    --tag-bg: #f1f1f1;
    --tag-color: #101010;
    --tag-font-size: 0.75rem;
  }

  /* Desktop Layout */
  .desktop-layout {
    display: block;
  }

  .mobile-layout {
    display: none;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  .left {
    display: grid;
    gap: 16px;
  }
  .panel {
    display: grid;
    place-items: stretch;
    height: var(--panel-height);
    border-radius: 12px;
    overflow: hidden;
  }

  .carousel-wrap {
    width: 100%;
    height: 100%;
    display: grid;
  }

  .carousel-wrap :deep(img),
  .carousel-wrap :deep(picture),
  .carousel-wrap :deep(video),
  .carousel-wrap :deep(canvas) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .carousel-wrap :deep(.carousel-stage),
  .carousel-wrap :deep(.slides),
  .carousel-wrap :deep(.swiper),
  .carousel-wrap :deep(.keen-slider) {
    width: 100%;
    height: 100%;
  }

  .details {
    position: relative;
    align-self: stretch;
  }

  .details-inner {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    margin-top: calc(var(--panel-height) / 2);
    margin-bottom: clamp(0px, calc(((var(--panel-height) - var(--details-h, 0px)) / 2) - (var(--details-h)) / 2), 9999px);
  }

  .details h2 {
    margin: 0 0 8px;
    font-size: 2rem;
  }
  .details p  {
    opacity: .9;
  }

  /* Mobile Layout Styles */
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 80px;
  }

  .project-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    min-height: 500px;
  }

  .project-section:nth-child(even) {
    grid-template-columns: 1fr 1fr;
  }

  .project-section:nth-child(even) .project-image {
    order: 2;
  }

  .project-section:nth-child(even) .project-details {
    order: 1;
  }

  .project-image {
    width: 100%;
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
  }

  .project-image :deep(img),
  .project-image :deep(picture),
  .project-image :deep(video),
  .project-image :deep(canvas) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .project-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .project-details h2 {
    margin: 0;
    font-size: 2rem;
    line-height: 1.2;
  }

  .project-details p {
    margin: 0;
    opacity: 0.9;
    line-height: 1.6;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tag-gap);
    width: 100%;
  }

  .tag,
  .popup-button {
    display: inline-flex;
    align-items: center;
    font-size: var(--tag-font-size);
    padding: var(--tag-padding-vertical) var(--tag-padding-horizontal);
    border-radius: var(--tag-border-radius);
  }

  .tag {
    background: var(--tag-bg);
    color: var(--tag-color);
  }

  .popup-button {
    cursor: pointer;
    border: 1px solid var(--tag-bg);
    background: var(--tag-color);
    color: var(--tag-bg);
    font-family: "Space Mono", monospace;
    font-weight: 400;
    font-style: normal;
  }

  .popup-button .fa-arrow-right {
    margin-left: 8px;
    transition: transform 0.2s ease;
  }

  .popup-button:hover .fa-arrow-right {
    transform: translateX(4px);
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.7);
    z-index: 10;
    cursor: pointer;
  }

  .project-popup-enter-active,
  .project-popup-leave-active { transition: opacity .2s ease; }
  .project-popup-enter-from,
  .project-popup-leave-to { opacity: 0; }

  @media (max-width: 850px) {

    .intro {
      padding-top: 100px;
      padding-bottom: 60px;
    }

    .intro-header {
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .intro-stats {
      order: -1;
      justify-content: flex-start;
      margin-top: 0;
    }

    .intro-title {
      font-size: 2.5rem;
      margin-bottom: 0;
    }

    .intro-subtitle {
      font-size: 0.95rem;
    }

    .stat-bubble {
      padding: 0.6rem 1rem;
    }

    .stat-bubble .stat-number {
      font-size: 1.25rem;
    }

    .stat-bubble .stat-label {
      font-size: 0.7rem;
    }

    .projects {
      padding: 24px 0;
    }

    .mobile-layout {
      max-width: var(--container-max-width, 1200px);
      margin: 0 auto;
      padding-left: var(--container-padding, 2em);
      padding-right: var(--container-padding, 2em);
      box-sizing: border-box;
    }

    /* Switch layouts on mobile */
    .desktop-layout {
      display: none;
    }

    .mobile-layout {
      display: block;
    }

    .project-list {
      gap: 60px;
    }

    .project-section {
      grid-template-columns: 1fr;
      gap: 24px;
      min-height: auto;
    }

    .project-section:nth-child(even) {
      grid-template-columns: 1fr;
    }

    .project-section:nth-child(even) .project-image,
    .project-section:nth-child(even) .project-details {
      order: unset;
    }

    .project-image {
      height: 350px;
    }

    .project-details h2 {
      font-size: 1.5rem;
    }

    .github-header {
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .github-header h3 {
      flex: 1;
      min-width: 200px;
    }

    .github-button {
      flex-shrink: 0;
    }

    /* Only stack vertically on very small screens */
    @media (max-width: 480px) {
      .github-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .github-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .github-stats {
      flex-direction: row;
      gap: 2rem;
      justify-content: flex-start;
    }

    .github-button {
      padding: 3px 16px;
      gap: 8px;
      align-self: flex-start;
    }

    .github-button p {
      font-size: 0.75rem;
      margin: 0 0 0 8px;
    }

    .github-icon {
      height: 20px;
    }

    .stat-number {
      font-size: 1.5rem;
    }

    .chart-container {
      padding: 1rem;
    }
  }
</style>
