<template>
  <div>
    <div class="project-grid">

      <!-- Projekt 1 -->
      <div class="project-card personal-dashboard">
        <img :src="personalDashboardApp" alt="Personal Dashboard" class="project-image-big" />
        <h3 class="project-title">Personal Dashboard App</h3>
        <div class="project-info">
          <div class="project-tags">
            <span class="tag" v-for="tag in dashboardTags" :key="tag">{{ tag }}</span>
            <!-- <button class="popup-button" @click="showPopup('dashboard')">
              Read More
              <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
            </button> -->
            <a 
              v-if="dashboardButtonText && dashboardButtonLink"
              :href="dashboardButtonLink" 
              target="_blank" 
              rel="noopener noreferrer"
              class="popup-button"
            >
              {{ dashboardButtonText }}
              <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      <!-- Projekt 2 -->
      <div class="project-card portfolio">
        <img :src="threadGuessr" alt="ThreadGuessr" class="project-image-small" />
        <h3 class="project-title">ThreadGuessr Reddit Devvit</h3>
        <div class="project-info">
          <div class="project-tags">
            <span class="tag" v-for="tag in portfolioTags" :key="tag">{{ tag }}</span>
            <!-- <button class="popup-button" @click="showPopup('threadguessr')">
              Read More
              <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
            </button> -->
            <a 
              v-if="threadGuessrButtonText && threadGuessrButtonLink"
              :href="threadGuessrButtonLink" 
              target="_blank" 
              rel="noopener noreferrer"
              class="popup-button"
            >
              {{ threadGuessrButtonText }}
              <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      <!-- "Mehr anzeigen"-Karte -->
      <router-link to="/projects" class="project-card more-button">
        <div class="project-info">
          <div class="more-info full-card-button">
            See More Projects
            <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
          </div>
        </div>
      </router-link>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import threadGuessr from '@/assets/images/projects/thread-guessr-mockup.jpg';
import personalDashboardApp from '@/assets/images/projects/personal-dashboard-mockup-2.jpg';
import ProjectPopup from './ProjectPopup.vue';

const isPopupVisible = ref(false);
const popupProjectKey = ref<string | null>(null);

const dashboardTags = ['Node.js', 'ReactJS', 'Electron', 'PWA'];
const portfolioTags = ['Vue.js', 'TypeScript', 'GSAP', 'GitHub Pages & Actions'];

// Button Configuration
const dashboardButtonText = ref<string | undefined>(undefined);
const dashboardButtonLink = ref<string | undefined>(undefined);

const threadGuessrButtonText = ref('View on Reddit');
const threadGuessrButtonLink = ref('https://www.reddit.com/r/ThreadGuessr/');

function showPopup(key: string) {
  popupProjectKey.value = key;
  isPopupVisible.value = true;
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  isPopupVisible.value = false;
  document.body.style.overflow = 'auto';
}

function getProjectData(key: string | null) {
  switch (key) {
    case 'dashboard':
      return {
        name: 'Personal Dashboard App',
        description: 'The Personal Dashboard App is a project I built to streamline my day-to-day activities and improve productivity by bringing together key features in one place. I wanted an all-in-one solution to manage everything from stock monitoring to daily tasks, notes, and bookmarks. By building this app, I aim to centralize important information and offer easy access to the features I use most often, while keeping the interface clean and modern.<br><br><strong>The app includes several tabs and pages:</strong><ul><li><strong>Stocks:</strong> Track stock prices, market insights, and dividend data.</li><li><strong>Notes:</strong> Create and manage notes for quick reference.</li><li><strong>Bookmarks:</strong> Save and organize important links.</li><li><strong>Weather:</strong> Check weather forecasts for multiple locations.</li><li><strong>To-Do:</strong> Manage tasks and prioritize daily activities.</li><li><strong>Quote of the Day (QOTD):</strong> Display motivational or inspirational quotes.</li><li><strong>Moodboards:</strong> Curate visual inspiration for creative projects.</li><li><strong>Dividend Calendar:</strong> Track upcoming dividend payments.</li><li><strong>Stock News:</strong> Stay informed about the latest financial market news.</li><li><strong>Market Heatmap:</strong> Visualize stock market performance in a heatmap view.</li><li><strong>Currency Converter:</strong> Convert between different currencies with real-time exchange rates.</li><li><strong>Settings:</strong> Customize the app to personal preferences.</li><li><strong>Calendar:</strong> View upcoming events and manage appointments.</li><li><strong>TestPage:</strong> A sandbox for testing new features before full integration.</li></ul><br><strong>Future enhancements include:</strong><ul><li><strong>Mobile Synchronization:</strong> Implement an endpoint for mobile authentication, allowing users to view and edit data on the go.</li></ul>',
        images: [personalDashboardApp]
      };
    case 'threadguessr':
      return {
        name: 'ThreadGuessr',
        description: 'This portfolio represents my very own project, showcasing my initial foray into coding a website from scratch. As my first experience in completely hardcoding a website, it is an evolving work in progress, meant to be updated and refined over time. This ongoing development not only allows me to continuously enhance my programming skills but also ensures that the portfolio remains up-to-date, particularly with my timeline and projects.<br><br><strong>Future enhancements include:</strong><ul><li>Adding different views/pages for "work" and "about", since due to time constraints I decided to make that in a later step.</li><li>Adding various animations, such as entrance animations or hover effects.</li><li>Fixing a bug in the mobile view of the header.</li><li>Experimenting with different sections or adding new ones where I can be creative.</li></ul>',
        images: [threadGuessr]
      }
    default:
      return null;
  }
}
</script>



<style scoped>

.project-grid {
  --card-row-height: 200px;
  --card-bg: #f1f1f1;
  --card-border-radius: 10px;

  --info-gap: 0.5rem;

  --tag-gap: 0.5rem;
  --tag-padding-vertical: 8px;
  --tag-padding-horizontal: 16px;
  --tag-border-radius: 50px;
  --tag-bg: #101010;
  --tag-color: #f1f1f1;
  --tag-font-size: 0.75rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 100px;
}

.project-card {
  background: var(--card-bg);
  border-radius: var(--card-border-radius);
  overflow: visible;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 15px;
}

.project-card h3 {
  margin: 0;
  padding: 0;
}

.project-title {
  position: sticky;
  bottom: 0;
  z-index: 2;
  padding: 10px 12px 12px;
  margin-top: auto;
  color: #101010;
}

.project-image-small, .project-image-big {
  display: block;
  border-radius: 10px;
  width: 100%;
  object-fit: contain;
}

.project-image-small {
  height: 300px;
}

.project-image-big {
  height: 500px;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: var(--info-gap);
  padding: 0;
  margin-top: 10px;
  width: 100%;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--tag-gap);
  width: 100%;
}

.tag,
.more-info,
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

.more-info {
  background: var(--tag-color);
  color: var(--tag-bg);
  cursor: pointer;
}

.popup-button {
  cursor: pointer;
  border: 1px solid #101010;
  font-family: "Space Mono", monospace;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  color: #101010;
}

.popup-button .fa-arrow-right {
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.full-card-button {
  background-color: transparent;
}
.more-button .fa-arrow-right {
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.more-button:hover .fa-arrow-right, .popup-button:hover .fa-arrow-right {
  transform: translateX(4px);
}

.full-card-button {
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
}

.project-card.more-button {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.project-card.more-button .project-info {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 100%;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  cursor: pointer;
}

@media (max-width: 850px) {
  .project-image-big {
    height: 300px;
  }
}

@media (min-width: 850px) {
  .project-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }

  .project-grid > .project-card:first-child {
    grid-column: 1 / -1;
  }

  .project-grid > .project-card:nth-child(2) {
    grid-column: span 7;
  }

  .project-grid > .project-card:nth-child(3) {
    grid-column: span 3;
  }

  .project-grid {
    grid-template-columns: repeat(10, 1fr);
  }
}
</style>

