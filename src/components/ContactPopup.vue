<template>
    <div>
      <div id="contact-popup" v-if="showContactPopup">
        <div class="contact-content">
          <h3>Contact Me</h3>
          <div>
            <p>You can reach me via...</p>
            <ul>
              <li>Email: <a href="mailto:fabien.strauss2002@gmail.com" target="_blank">fabien.strauss2002@gmail.com</a></li>
              <li><a href="https://www.linkedin.com/in/fabien-strau%C3%9F/" target="_blank">LinkedIn</a></li>
            </ul>
          </div>
          <!-- Close button -->
          <button class="close-btn" @click="closePopup">Close</button>
        </div>
      </div>
      <div v-if="showContactPopup" class="overlay" @click="closePopup"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const showContactPopup = ref(false);
  
  function closePopup() {
    showContactPopup.value = false;
    document.body.style.overflow = 'auto'; // Enable background scrolling
  }
  
  onMounted(() => {
    showContactPopup.value = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
  
  onUnmounted(() => {
    document.body.style.overflow = 'auto'; // Restore background scrolling when component unmounts
  });
  </script>
  
  <style scoped>
  #contact-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 500px;
    background-color: #101010;
    color: #f1f1f1;
    padding: 20px;
    border-radius: 10px;
    z-index: 20;
    border: 1px solid #f1f1f1;
  }
  
  .contact-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .contact-content h3 {
    margin: 0;
  }
  
  .contact-content a {
    color: #f1f1f1;
    text-decoration: underline !important;
  }
  
  .contact-content a:hover {
    text-decoration: underline;
  }
  
  .contact-content button {
    align-self: flex-end;
    background: none;
    border: none;
    color: #f1f1f1;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    box-shadow: none;
    padding: 0;
    font-size: 16px;
  }
  
  /* Reset button styles */
  .close-btn {
    all: unset;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-size: 16px;
    color: #f1f1f1;
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
  </style>
  