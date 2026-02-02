<template>
  <div class="books-music-section">
    <div class="split-layout">
      <!-- Bookshelf -->
      <div class="column bookshelf-column">
        <div class="header-group">
          <h2>Bookshelf</h2>
          <p class="subtext">A collection of books I've read in the past.</p>
        </div>

        <div class="shelf-container">
          <div class="books-row">
            <div 
              v-for="(book, index) in books" 
              :key="index"
              class="book-item"
              :style="{ 
                '--book-color': book.color,
                '--book-height': book.height + 'px'
              }"
              @pointerenter="handlePointerEnter(book, $event)"
              @pointerleave="handlePointerLeave"
              @click.stop="toggleTooltip(book, $event)"
            >
              <div class="book-spine">
                <span class="book-title">{{ book.title }}</span>
                <span class="book-author">{{ book.author }}</span>
              </div>
            </div>
          </div>
          <div class="shelf-base"></div>
        </div>
      </div>

      <!-- Music / Spotify -->
      <div class="column music">
        <div class="header-group">
          <h2>On Repeat</h2>
          <p class="subtext">The soundtrack to my coding sessions and daily life.</p>
        </div>
        
        <div class="playlist-card">
          <!-- Playlist Cover (1x1) -->
          <div class="playlist-cover">
            <img :src="playlistCover" alt="Coding Playlist" />
          </div>
          
          <!-- Footer: Name + Button -->
          <div class="playlist-footer">
            <div class="playlist-details">
              <h3 class="playlist-name">A F T E R L I F E</h3>
              <span class="playlist-sub">Spotify Playlist</span>
            </div>
            
            <a href="https://open.spotify.com/playlist/4VscFPLhpG2W88K7xDnvmr?si=13fe2227d4224e72" target="_blank" class="spotify-icon-btn" aria-label="Open in Spotify">
              <font-awesome-icon :icon="['fab', 'spotify']" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Teleported Fixed Tooltip -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="activeBook" 
          class="fixed-tooltip"
          :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }"
        >
          <span class="tooltip-title">{{ activeBook.title }}</span>
          <span class="tooltip-author">{{ activeBook.author }}</span>
          <!-- Arrow -->
          <div class="tooltip-arrow"></div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Using a generic placeholder or one of the abstract images as a placeholder for now
const playlistCover = new URL('@/assets/images/spotify-playlist-cover.jpg', import.meta.url).href;

interface Book {
  title: string;
  author: string;
  color: string;
  height: number;
}

const books = ref<Book[]>([
  { title: 'Humble Pi: A Comedy of Maths Errors', author: 'Matt Parker', color: '#b53737', height: 210 },
  { title: 'Software Engineering at Google', author: 'Titus Winters, Tom Manshreck', color: '#e69ac5', height: 230 },
  { title: 'The History of Graphic Design', author: 'Jens Müller', color: '#4467bf', height: 200 },
  { title: 'Die Welt als Zahl', author: 'Ian Stewart', color: '#1e1e1e', height: 250 },
  { title: 'Psychologie in 30 Sekunden', author: 'Christian Jarrett', color: '#985000', height: 190 }
]);

const activeBook = ref<Book | null>(null);
const tooltipX = ref(0);
const tooltipY = ref(0);

// Helper to calculate position
const updatePosition = (target: HTMLElement) => {
  const rect = target.getBoundingClientRect();
  tooltipX.value = rect.left + rect.width / 2;
  tooltipY.value = rect.top - 15; // 15px gap above
};

// Mouse Hover Handler
const handlePointerEnter = (book: Book, event: PointerEvent) => {
  if (event.pointerType === 'mouse') {
    activeBook.value = book;
    updatePosition(event.currentTarget as HTMLElement);
  }
};

const handlePointerLeave = (event: PointerEvent) => {
  if (event.pointerType === 'mouse') {
    activeBook.value = null;
  }
};

// Click/Touch Handler
const toggleTooltip = (book: Book, event: MouseEvent) => {
  // Prevent immediate closing from global listener
  // But we don't need stopPropagation if we check the target in the global listener carefully.
  // However, stopPropagation is safer for the "click outside" logic.
  
  if (activeBook.value === book) {
    activeBook.value = null;
  } else {
    activeBook.value = book;
    updatePosition(event.currentTarget as HTMLElement);
  }
};

// Handle outside clicks to close tooltip on mobile/desktop
const handleOutsideClick = (event: Event) => {
  if (activeBook.value) {
    const target = event.target as HTMLElement;
    // Close if click is NOT on a book item
    if (!target.closest('.book-item')) {
      activeBook.value = null;
    }
  }
};

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  window.addEventListener('touchstart', handleOutsideClick); // Capture touch as well
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('touchstart', handleOutsideClick);
});
</script>

<style scoped>
.books-music-section {
  width: 100%;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 4rem var(--container-padding, 4em);
  box-sizing: border-box;
}

.split-layout {
  display: flex; /* Changed from grid to flex for equal height columns */
  gap: 6rem;
  align-items: stretch; /* Stretch columns to equal height */
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Critical for flex child scrolling! */
}

.bookshelf-column {
  flex: 1.5; /* Keeping original weight ratio */
}

.header-group {
  margin-bottom: 2.5rem;
}

h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.subtext {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
}

/* Bookshelf Styling */
.shelf-container {
  position: relative;
  padding-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align shelf to bottom */
}

.books-row {
  display: flex;
  align-items: flex-end;
  gap: 10px; 
  padding-left: 10px;
  height: 250px; 
  overflow-x: auto; 
  overflow-y: hidden;
  padding-bottom: 5px; 
  
  /* Ensure scrolling works */
  width: 100%; 
  max-width: 100%;
  
  /* Scrollbar Styling */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.books-row::-webkit-scrollbar { height: 4px; }
.books-row::-webkit-scrollbar-track { background: transparent; }
.books-row::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

.book-item {
  width: 55px; 
  height: var(--book-height);
  background-color: var(--book-color);
  border-radius: 4px 4px 2px 2px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: inset -4px 0 8px rgba(0,0,0,0.3), 2px 0 5px rgba(0,0,0,0.3);
  flex-shrink: 0;
}

.book-item:hover {
  transform: translateY(-10px) rotate(-2deg);
  box-shadow: inset -4px 0 8px rgba(0,0,0,0.3), 5px 10px 15px rgba(0,0,0,0.4);
  z-index: 10; /* Higher z-index for tooltip visibility */
}

/* Spine Text - Parallel Lines */
.book-spine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px 4px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: row-reverse; 
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.book-title, .book-author {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg); 
  white-space: nowrap;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%; 
  /* 'text-align: right' combined with rotate(180) makes it start at the TOP of the book */
  text-align: left;
}

.book-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.05em;
  width: 50%;
}

.book-author {
  font-size: 0.55rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  width: 40%;
}

.shelf-base {
  width: 100%;
  height: 14px;
  background: #2a2a2a;
  border-bottom: 4px solid #1a1a1a;
  margin-top: -2px;
  border-radius: 2px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

/* Playlist Card Styling */
.playlist-card {
  width: 100%;
  max-width: 350px;
  flex-grow: 1; /* Grow to fill space */
  display: flex;
  flex-direction: column;
}

.playlist-cover {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  background: #222;
  flex-grow: 1; /* Let cover shrink/grow to match column height */
  display: flex;
}

.playlist-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.playlist-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px; /* Align with shelf base visually */
}

.playlist-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.playlist-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.playlist-sub {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.spotify-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1db954;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  transition: transform 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
}

.spotify-icon-btn:hover {
  background: #1ed760;
  transform: scale(1.1);
}

@media (max-width: 1000px) {
  .split-layout {
    flex-direction: column;
    gap: 4rem;
  }
  
  .playlist-card {
    max-width: 100%;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
  }
  
  .playlist-cover {
    width: 120px;
    height: 120px;
    aspect-ratio: 1/1;
    margin-bottom: 0;
    flex-shrink: 0;
    flex-grow: 0;
  }
  
  .playlist-footer {
    flex-grow: 1;
    margin-bottom: 0;
  }
}

@media (max-width: 600px) {
  .playlist-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .playlist-cover {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    margin-bottom: 1rem;
  }
}
</style>

<style>
/* Global styles for fixed tooltip */
.fixed-tooltip {
  position: fixed;
  transform: translate(-50%, -100%);
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 8px;
  width: 200px;
  z-index: 9999;
  pointer-events: none;
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fixed-tooltip .tooltip-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.fixed-tooltip .tooltip-author {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

.fixed-tooltip .tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(0, 0, 0, 0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -90%);
}
</style>