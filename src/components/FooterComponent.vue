<template>
  <div class="footer-background">
    <div class="footer">
      <div class="socials">
        <a href="https://github.com/fabienstrauss" target="_blank"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/fabien-strau%C3%9F/" target="_blank"><LinkedInIcon/></a>
      </div>
      <div class="footer-banner">
        <img :src="NameBanner" alt="Fabien Strauß Banner" />
      </div>
      <div class="footer-bottom">
        <p class="copy">© Copyright 2026 by Fabien Strauß</p>
        <button class="to-top" type="button" @click="scrollTop">
          <span>Back to top</span>
          <font-awesome-icon :icon="['fas','arrow-up']" class="to-top-icon"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import GitHubIcon from "@/components/icons/GitHubIcon.vue";
  import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
  import NameBanner from "@/assets/svg/fabienstrauss.svg";

  const getScrollableParents = (start?: Element | null) => {
    const parents: (Element | Document)[] = [];
    let node: Element | null = start || document.body;

    while (node && node !== document.body) {
      const style = getComputedStyle(node);
      const canScrollY = /(auto|scroll)/i.test(style.overflowY);
      if (canScrollY) parents.push(node);
      node = node.parentElement;
    }

    parents.push(document.scrollingElement || document.documentElement);
    return parents;
  };

  const scrollTop = () => {
    const content = document.getElementById('content');

    const targets = new Set([
      ...getScrollableParents(content || undefined),
      window
    ]);

    targets.forEach((t: any) => {
      try {
        t.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        t.scrollTop = 0;
      }
    });
  };

</script>

<style scoped>
  .footer-background {
    background: linear-gradient(to bottom, rgba(16,16,16,0) 0%, #101010 20%);
    margin-bottom: 0;
    padding: 50px 0;
  }

  .footer {
    width: 100%;
    max-width: var(--container-max-width, 1200px);
    margin: 0 auto;
    padding-left: var(--container-padding, 4em);
    padding-right: var(--container-padding, 4em);
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .socials {
    display: flex;
    gap: 12px;
    align-self: flex-start;
  }

  .socials svg {
    cursor: pointer;
  }

  .footer-banner {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .footer-banner img {
    width: 100%;
    max-width: 100%;
    height: auto;
    filter: brightness(0) saturate(100%) invert(1);
  }

  .footer-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .copy {
    margin: 0;
    font-size: 12px;
  }

  .to-top {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0;

    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #f1f1f1;
    cursor: pointer;
    text-decoration: none;

    font-family: "Space Mono", monospace;
    font-weight: 400;
    font-style: normal;
  }
  .to-top:hover { text-decoration: underline; }

  .to-top-icon {
    height: 1em;
    width: 1em;
  }

</style>