<template>
    <div class="skill-item">
        <div class="skill-name">
            <font-awesome-icon :icon="['fab', icon]" />
            <span>{{ name }}</span>
        </div>
        <div class="progress-bar">
            <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
</template>
  
<script>
    export default {
        props: {
        name: String,
        icon: String,
        progress: Number
        }
    }
</script>
  
<style scoped>
    .skill-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .skill-name span {
        margin-left: 10px;
    }

    .skill-name {
        min-width: 30%;
        gap: 10px 10px;
    }
    
    .progress-bar {
        flex-grow: 1;
        height: 15px;
        background-color: transparent;
        border: 1px solid #f1f1f1;
    }
    
    .progress {
        height: 100%;
        background-color: #f1f1f1;
        border: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(-1px) translateY(-1px)
    }
</style>