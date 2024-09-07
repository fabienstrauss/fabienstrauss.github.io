<template>
    <div class="skill-item">
        <div class="skill-name">
            <div class="skill-icon">
                <font-awesome-icon :icon="iconArray" />
            </div>    
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
        },
        computed: {
            iconType() {
                const brandIcons = ['js-square', 'html5', 'css3-alt', 'python', 'wordpress', 'windows', 'java', 'vuejs', 'react', 'docker'];
                return brandIcons.includes(this.icon) ? 'fab' : 'fas';
            },
            iconArray() {
                return [this.iconType, this.icon];
            }
        }
    }
</script>
  
<style scoped>
    .skill-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .skill-name {
        display: flex;
        min-width: 30%;
        gap: 10px 10px;
        align-items: center;
    }

    .skill-icon {
        width: 25px;
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

    @media (max-width: 1100px) {
        
    }

    @media (max-width: 850px) {
        .skill-name span {
            font-size: 12px;
        }

        .skill-name {
            min-width: 50%;
        }
    }

</style>