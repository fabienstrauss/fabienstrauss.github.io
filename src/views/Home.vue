<template>
  <div class="home">
    <HomeHero/>
    <div class="about" id="about" ref="aboutSection">
      <h2>Education & Experience</h2>
      <div v-if="!isMobile" class="timeline">
        <div class="left">
          <TimelineSection
              icon="stromnetz-berlin-logo.jpg"
              time_start="09/2020"
              time_end="09/2023"
              where="Stromnetz Berlin GmbH"
              title="Dual Student in Business Informatics"
              content="During my studies I actively applied learned concepts and skills in projects with my practical Partner, Stromnetz Berlin GmbH."
              :indicatorPosition="isMobile ? 'left' : 'right'"
          />
          <TimelineSection
              icon="stromnetz-berlin-logo.jpg"
              time_start="10/2023"
              time_end="Present"
              where="Stromnetz Berlin GmbH"
              title="Application Support Engineer"
              content="Responsible for maintaining and optimizing IT applications - deploying and managing applications on Kubernetes, configuring Azure API Management, and developing automation scripts and CI/CD pipelines."
              :indicatorPosition="isMobile ? 'left' : 'right'"
          />
        </div>
        <div class="right">
          <TimelineSection
              icon="hwr-berlin-logo.jpg"
              time_start="09/2020"
              time_end="09/2023"
              where="HWR Berlin"
              title="Bachelor of Science Business Informatics"
              content="Dual Student at HWR Berlin, gaining knowledge in computer science and business administration."
              :indicatorPosition="isMobile ? 'left' : 'left'"
          />
          <TimelineSection
              icon="tu-berlin-logo.jpg"
              time_start="10/2025"
              time_end="Present"
              where="TU Berlin"
              title="Master’s in Computer Science"
              content="Pursuing advanced studies at TU Berlin out of intrinsic passion for technology and continuous personal growth."
              :indicatorPosition="isMobile ? 'left' : 'left'"
          />
        </div>
      </div>
      <div v-if="isMobile" class="timeline">
        <div class="left">
          <TimelineSection
              icon="hwr-berlin-logo.jpg"
              time_start="09/2020"
              time_end="09/2023"
              where="HWR Berlin"
              title="Bachelor of Science Business Informatics"
              content="Dual Student at HWR Berlin, gaining knowledge in computer science and business administration."
              :indicatorPosition="isMobile ? 'left' : 'left'"
          />
          <TimelineSection
              icon="stromnetz-berlin-logo.jpg"
              time_start="09/2020"
              time_end="09/2023"
              where="Stromnetz Berlin GmbH"
              title="Dual Student in Business Informatics"
              content="During my studies I actively applied learned concepts and skills in projects with my practical Partner, Stromnetz Berlin GmbH."
              :indicatorPosition="isMobile ? 'left' : 'right'"
          />

        </div>
        <div class="right">
          <TimelineSection
              icon="stromnetz-berlin-logo.jpg"
              time_start="10/2023"
              time_end="Present"
              where="Stromnetz Berlin GmbH"
              title="Application Support Engineer"
              content="Responsible for maintaining and optimizing IT applications - deploying and managing applications on Kubernetes, configuring Azure API Management, and developing automation scripts and CI/CD pipelines."
              :indicatorPosition="isMobile ? 'left' : 'right'"
          />
          <TimelineSection
              icon="tu-berlin-logo.jpg"
              time_start="10/2025"
              time_end="Present"
              where="TU Berlin"
              title="Master’s in Computer Science"
              content="Pursuing advanced studies at TU Berlin out of intrinsic passion for technology and continuous personal growth."
              :indicatorPosition="isMobile ? 'left' : 'left'"
          />
        </div>
      </div>
    </div>
    <div class="skills" ref="skillsSection">
      <div class="skills-header">
        <h2>Skills</h2>
        <button
            type="button"
            class="toggle-view"
            @click="showSkillsAsList = !showSkillsAsList"
            :aria-pressed="showSkillsAsList.toString()"
        >
          <span v-if="!showSkillsAsList">Show as list</span>
          <span v-else>Show as marquee</span>
          <font-awesome-icon :icon="['fas','table-list']" class="tv-icon" />
        </button>
      </div>

      <Transition mode="out-in" :css="false" @enter="sectionEnter" @leave="sectionLeave">

        <div v-if="!showSkillsAsList" key="marquee-view">
          <h3>Frameworks & Programming-Languages</h3>
          <Marquee :skills="programmingLanguages" direction="forwards" />

          <h3>Technologies</h3>
          <Marquee :skills="technologies" direction="reverse" />
        </div>

        <div v-else key="list-view">
          <h3>Frameworks & Programming-Languages</h3>
          <ul class="skill-list">
            <li v-for="(s,i) in programmingLanguages" :key="s.name">
              <font-awesome-icon :icon="[s.prefix || 'fab', s.icon]" class="skill-icon" />
              <span>{{ s.name }}</span>
            </li>
          </ul>

          <h3>Technologies</h3>
          <ul class="skill-list">
            <li v-for="(s,i) in technologies" :key="s.name">
              <font-awesome-icon :icon="[s.prefix || 'fab', s.icon]" class="skill-icon" />
              <span>{{ s.name }}</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <div class="work" id="work" ref="workSection">
      <h2>Work</h2>
      <p>I am committed to continual learning and growth in technology. As I engage with new projects and broaden my expertise, I will update this section to reflect the most recent work and achievements.</p>
      <ProjectGrid />
    </div>
  </div>
</template>

<script setup lang="ts">

    import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    import HomeHero from "@/components/HomeComponents/HomeHero.vue";
    import TimelineSection from '@/components/HomeComponents/TimelineSection.vue'
    import ProjectGrid from '@/components/HomeComponents/ProjectGrid.vue';
    import Marquee from "@/components/HomeComponents/SkillMarquee.vue";
    import GitHubIcon from '@/components/icons/GitHubIcon.vue'
    import LinkedInIcon from '@/components/icons/LinkedInIcon.vue'

    const isMobile = ref(window.innerWidth <= 850);
    const showSkillsAsList = ref(false);

    // Refs for animations
    const aboutSection = ref<HTMLElement | null>(null);
    const skillsSection = ref<HTMLElement | null>(null);
    const workSection = ref<HTMLElement | null>(null);

    const programmingLanguages = ref([
      { name: 'JavaScript',icon: 'js-square', prefix: 'fab', position: 1},
      { name: 'Java',      icon: 'java',      prefix: 'fab', position: 2},
      { name: 'HTML5',     icon: 'html5',     prefix: 'fab', position: 3},
      { name: 'CSS3',      icon: 'css3-alt',  prefix: 'fab', position: 4},
      { name: 'Vue.js',    icon: 'vuejs',     prefix: 'fab', position: 5},
      { name: 'Python',    icon: 'python',    prefix: 'fab', position: 6},
      { name: 'ReactJS',   icon: 'react',     prefix: 'fab', position: 7},
      { name: 'SQL',       icon: 'database',  prefix: 'fas', position: 8}
    ])

    const technologies = ref([
      { name: 'Docker/K8s',       icon: 'docker',     prefix: 'fab', position: 1},
      { name: 'Spring Boot',      icon: 'leaf',       prefix: 'fas', position: 2},
      { name: 'WP/Elementor',     icon: 'wordpress',  prefix: 'fab', position: 3},
      { name: 'Azure',            icon: 'cloud',      prefix: 'fas', position: 4},
      { name: 'MS PowerPlatform', icon: 'windows',    prefix: 'fab', position: 5},
      { name: 'threeJS',          icon: '3',          prefix: 'fas', position: 6},
    ])

    function onResize() {
      isMobile.value = window.innerWidth <= 850;
      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh();
    }

    const RESPECT_RM = false;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
    const rm = RESPECT_RM && prefersReduced;

    const DUR_FADE = rm ? 0 : 0.25;
    const DUR_ITEM = rm ? 0 : 0.25;
    const STAGGER = rm ? 0 : 0.1;
    const DIST = rm ? 0 : 22;

    const sectionEnter = (el: Element, done: () => void) => {
      gsap.fromTo(el, {autoAlpha: 0}, {autoAlpha: 1, duration: DUR_FADE, ease: "power1.out"});

      const items = el.querySelectorAll<HTMLLIElement>('.skill-list li');

      if (!items.length) {
        gsap.delayedCall(DUR_FADE, done);
        return
      }

      gsap.set(items, { autoAlpha: 0, y: DIST, filter: 'blur(3px)', willChange: 'transform,opacity,filter '});
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: DUR_ITEM,
        ease: 'power3.out',
        stagger: STAGGER,
        onComplete: done
      });
    };

    const sectionLeave = (el: Element, done: () => void) => {
      gsap.to(el, { autoAlpha: 0, duration: rm ? 0 : 0.2, ease: 'power1.in', onComplete: done });
    };

    // Hero entrance animation (one-time only)
    function setupHeroAnimation() {
      const heroElements = document.querySelectorAll('.home-hero .hero-text .row');

      if (heroElements.length > 0) {
        gsap.fromTo(heroElements,
          {
            y: 50,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.3
          }
        );
      }
    }

    // Clean ScrollTrigger implementation with custom scroller
    function setupScrollAnimations() {
      // Clear any existing ScrollTriggers
      ScrollTrigger.killAll();

      // Get the custom scroll container
      const scroller = document.getElementById('content');
      if (!scroller) {
        console.error('Custom scroller #content not found');
        return;
      }

      console.log('🎯 Setting up ScrollTrigger with custom scroller:', scroller);

      // 1. Section headers - simple fade up
      gsap.utils.toArray('.about h2, .skills h2, .work h2').forEach((header) => {
        gsap.fromTo(header,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
              scroller: scroller
            }
          }
        );
      });

      // 2. Timeline items - slide up from bottom (excluding indicators)
      gsap.utils.toArray('.timeline-details').forEach((item, index) => {
        gsap.fromTo(item,
          {
            y: 60,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
              scroller: scroller
            }
          }
        );
      });

      // 3. Skills section content
      const skillsContent = document.querySelector('.skills > div:not(.skills-header)');
      if (skillsContent) {
        gsap.fromTo(skillsContent,
          {
            y: 40,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsContent,
              start: "top 85%",
              toggleActions: "play none none reverse",
              scroller: scroller
            }
          }
        );
      }

      // 3.1. Skills header (including the toggle button)
      const skillsHeader = document.querySelector('.skills-header');
      if (skillsHeader) {
        gsap.fromTo(skillsHeader,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsHeader,
              start: "top 85%",
              toggleActions: "play none none reverse",
              scroller: scroller
            }
          }
        );
      }

      // 4. Work section paragraph
      const workP = document.querySelector('.work p');
      if (workP) {
        gsap.fromTo(workP,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: workP,
              start: "top 85%",
              toggleActions: "play none none reverse",
              scroller: scroller
            }
          }
        );
      }

      // 5. Project cards - slide up with stagger
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
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
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
              scroller: scroller
            }
          }
        );
      });

      console.log('✅ ScrollTrigger animations configured with custom scroller');
    }

    onMounted(() => {
      window.addEventListener('resize', onResize);

      // Hero animation (immediate)
      setupHeroAnimation();

      // ScrollTrigger animations (wait for custom scroller to be ready)
      setTimeout(() => {
        setupScrollAnimations();
      }, 500);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.killAll();
    });

</script>

<style scoped>

    h2 {
      font-size: 30px;
    }

    .about .timeline {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .about .timeline .left, .about .timeline .right {
      flex: 1;
    }

    .about .timeline .left {
      flex: 1 1 50%;
      border-right: 1px solid #4ade80;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 50%;
      padding-right: 30px;
      padding-top: 75px;
    }

    .about .timeline .right {
      border-left: 1px solid #4ade80;
      flex: 1 1 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 50%;
      padding-left: 30px;
    }

    .about .timeline .left::before {
      content: '';
      position: absolute;
      top: 0; right: 50%;
      width: 1px;
      height: 100%;
      background-color: #4ade80;
      box-shadow: 0 0 8px #4ade80;
      z-index: 0;
    }

    .about .timeline .right::before {
      content: '';
      position: absolute;
      top: 0; left: 50%;
      width: 1px;
      height: 100%;
      background-color: #4ade80;
      box-shadow: 0 0 8px #4ade80;
      z-index: 0;
    }

    /* Timeline arrow at the end */
    .about .timeline::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 12px solid #4ade80;
      filter: drop-shadow(0 0 4px #4ade80);
      z-index: 1;
    }

    .about h2 {
      margin: 25px 0 50px 0;
    }

    .skills-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .toggle-view {
      appearance: none;
      border: 1px solid #f1f1f1;
      background-color: transparent;
      color: #f1f1f1;
      font-size: 12px;
      padding: 8px 16px;
      border-radius: 50px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: "Space Mono", monospace;
      font-weight: 400;

      transition:
          background-color .25s ease,
          color .25s ease,
          transform .25s ease,
          box-shadow .25s ease,
          border-color .25s ease;
      will-change: transform;
    }

    .toggle-view:hover {
      background-color: #f1f1f1;
      color: #101010;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 24px rgba(0,0,0,.25);
      border-color: transparent;
    }

    .toggle-view:active {
      transform: translateY(0) scale(.98);
      box-shadow: 0 6px 16px rgba(0,0,0,.2);
    }

    .toggle-view:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px #4ade80, 0 0 0 6px rgba(47, 214, 55, 0.25);
    }

    :deep(.tv-icon) {
      transition: transform .25s ease, opacity .25s ease;
    }
    .toggle-view:hover :deep(.tv-icon) {
      transform: translateX(2px);
      opacity: .9;
    }

    .skill-list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 10px 12px;
      margin: 10px 0 24px 0;
      padding: 0;
      list-style: none;
    }

    .skill-list li {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border: 1px solid #f1f1f1;
      border-radius: 50px;
      background: #101010;

      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;

      will-change: transform, opacity, filter;
    }
    .skill-icon { font-size: 1.1rem; flex: 0 0 auto; }
    .skill-list li span { min-width: 0; }

    .skills {
      margin-top: 100px;
      width: 100%;
    }

    .work {
      margin-top: 75px;
      padding-top: 25px;
    }

    .about {
      margin-top: 25px;
    }

    .home {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Initial animation states - removed opacity: 0 to let ScrollTrigger handle states */

    :deep(.hero-inner), .about, .skills, .work, .footer {
      max-width: var(--container-max-width, 1200px);
      padding-left: var(--container-padding, 4em);
      padding-right: var(--container-padding, 4em);
      box-sizing: border-box;
    }

    @media (prefers-reduced-motion: reduce) {
      .toggle-view, :deep(.tv-icon) {
        transition: none;
      }
    }

    @media (max-width: 850px) {

      .row h1 {
          font-size: 30px;
          line-height: 30px;
      }

      .row p, .work p {
          font-size: 14px;
      }

      .about .timeline {
        display: block;
        padding-bottom: 50px;
      }

      .about .timeline::after {
        height: 200px !important;
      }

      .about .timeline .left,
      .about .timeline .right {
        width: 100%;
        max-width: none;
        border-left: 2px solid #4ade80;
        border-right: none;
        display: block;
        padding: 0 20px 0 30px;
        box-sizing: border-box;
      }


      .about .timeline .left::before {
        top: 0; right: calc(100% - 2px);
      }

      .about .timeline .right::before {
        top: 0; left: 0px;
      }

      /* Mobile timeline arrow */
      .about .timeline::after {
        top: 100%;
        left: 1px;
        bottom: auto;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid #4ade80;
        filter: drop-shadow(0 0 4px #4ade80);
      }

    }


</style>