<template>
  <div class="home-hero" ref="heroRef">
    <!-- Gradient-Background -->
    <div class="hero-bg" ref="landingRef"/>
    <!-- Hero Content -->
    <div class="hero-inner">
      <!-- Hero-Text -->
      <div class="hero-text" ref="containerRef">
        <div class="row">
          <img :src="meUrl" id="me-image" alt="Me-Image">
        </div>
        <div class="row">
          <h1 class="h1 splt-words">Hi, I am Fabien!</h1>
        </div>
        <div class="row">
          <p class="me-description p splt-words">I'm deeply passionate about technology and design, driven by a constant curiosity to explore new things. I love learning and am always eager to push the boundaries of what’s possible.</p>
        </div>
        <div class="row socials">
          <div>
            <a href="https://github.com/fabienstrauss" target="_blank" class="link-wrapper">
              <GitHubIcon/>
              <p>GitHub</p>
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/fabien-strau%C3%9F/" target="_blank" class="link-wrapper">
              <LinkedInIcon/>
              <p>LinkedIn</p>
            </a>
          </div>
        </div>
      </div>
      <!-- ASCII-Renderer -->
      <!--
      <div class="ascii-container">
        <ThreeJsModel/>
      </div>
      -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import Splitting from "splitting";
  import { animate, stagger } from 'motion-v';
  import ThreeJsModel from "@/components/HomeComponents/ThreeJsModel.vue";
  import meUrl from "@/assets/images/me.jpg";
  import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
  import GitHubIcon from "@/components/icons/GitHubIcon.vue";

  const containerRef = ref<HTMLDivElement | null>(null)
  const heroRef = ref<HTMLElement | null>(null);
  const landingRef = ref<HTMLElement | null>(null);

  const moveGradient = (event: MouseEvent) => {
    if (!heroRef.value) return;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const mouseX = Math.round((event.pageX / winWidth) * 100);
    const mouseY = Math.round((event.pageY / winHeight) * 100);

    if (landingRef.value) {
      landingRef.value.style.setProperty('--mouse-x', `${mouseX}%`);
      landingRef.value.style.setProperty('--mouse-y', `${mouseY}%`);
    }
  };

  onMounted(() => {
    document.addEventListener("mousemove", moveGradient);

    document.fonts.ready.then(() => {
      if (!containerRef.value) return;

      Splitting({
        target: containerRef.value.querySelector(".splt-words")!,
        by: "words"
      });

      const words = Array.from(
          containerRef.value.querySelectorAll<HTMLElement>(".word")
      )

      containerRef.value.style.visibility = "visible"

      animate(
          words,
          {
            opacity: [0, 1],                           // Fade-In: 0→1
            transform: ["translateY(50px)", "translateY(0)"] // Slide-Up: 50px unten → 0px
          },
          {
            delay: stagger(0.15),                   // Wort 2 startet 0.15 s nach Wort 1, Wort 3 nach weiteren 0.15 s usw.
            opacity: { duration: 0.3 },              // Fade-In dauert 0.3 s
            transform: { duration: 1.0, ease: "easeOut" } // Slide-Up dauert 1.0 s
          }
      )
    });
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', moveGradient);
  });
</script>

<style scoped>
  .home-hero {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #1f1f1f;
    z-index: 0;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    display: flex;
    flex-direction: row;
    --mouse-x: 50%;
    --mouse-y: 50%;
    filter: contrast(160%) brightness(300%);
    background: linear-gradient(
        to bottom right,
        rgba(34,34,35,1),
        rgba(59,59,59,0.55)
    ),
    radial-gradient(
        at var(--mouse-x) var(--mouse-y),
        rgba(255,255,255,0.5),
        rgba(0,0,0,0.5)
    ),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.26' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    width: 100vw;
    height: 100vh;
  }

  .hero-inner {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    width: 100%;
    height: calc(100% - 75px);
    margin-left: auto;
    margin-right: auto;
    margin-top: 75px;
  }

  .hero-text {
    flex: 0 0 100%; /* 70% width when using ascii container */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
  }

  .ascii-container {
    flex: 0 0 30%;
    width: 30%;
    height: 70%;
    position: relative;
    box-sizing: border-box;
    padding: 1em;
  }

  .socials {
    gap: 0px 10px;
  }

  .socials div {
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

  .socials div:hover {
    background-color: #f1f1f1;
    color: #101010;
    transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -moz-transition: all .2s linear;
  }

  .socials div:hover .socials-icon {
    fill: #101010;
  }

  .socials p {
    font-size: 16px;
    margin: 0 0 0 10px;
  }

  .socials-icon {
    height: 25px;
    width: auto;
    transition: fill 0.3s;
  }

  .row {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 0px;
  }

  .row h1 {
    font-size: 50px;
    line-height: 60px;
    margin: 0px 0px 10px 0px;
    word-spacing: -15px;
  }

  .me-description {
    font-size: 16px;
    line-height: 20px;
    margin: 0px 0px 20px 0px;
  }

  #me-image {
    width: 90px;
    border-radius: 100px;
    margin-bottom: 20px;
    border: 1px solid #f1f1f1;
  }

  .link-wrapper {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

</style>
