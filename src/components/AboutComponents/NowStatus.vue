<template>
  <div class="now-tag">
    <span class="pulsing-dot"></span>
    <span class="activity-text">Studying Machine Learning</span>
  </div>
</template>

<style scoped>
.now-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid #4ade80;
  padding: 8px 16px;
  border-radius: 100px;
  backdrop-filter: blur(10px);
}

.pulsing-dot {
  width: 8px;
  height: 8px;
  background-color: #4ade80;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.activity-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #4ade80;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}
</style>