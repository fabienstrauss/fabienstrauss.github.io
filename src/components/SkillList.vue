<template>
    <div>
        <transition-group name="skill-transition" tag="div">
            <div v-for="skill in visibleSkills" :key="skill.name">
                <SkillItem :name="skill.name" :icon="skill.icon" :progress="skill.progress" />
            </div>
         </transition-group>
        <div class="toggle-div">
            <span>{{ isFolded ? 'Show More' : 'Show Less' }}</span>
            <button v-if="skills.length > threshold" @click="toggleFold" class="toggle-button">
                <font-awesome-icon :icon="isFolded ? 'chevron-down' : 'chevron-up'" />
            </button>
        </div>
    </div>
</template>
  
<script>
    import SkillItem from './SkillItem.vue';
  
    export default {
        components: {
        SkillItem
        },
        data() {
        return {
            skills: [
                { name: 'HTML5', icon: 'html5', progress: 85 }, 
                { name: 'CSS', icon: 'css3-alt', progress: 80 },
                { name: 'WP/Elementor', icon: 'wordpress', progress: 75 },   
                { name: 'Java', icon: 'java', progress: 70 }, 
                { name: 'MS PowerPlatform', icon: 'windows', progress: 70 },
                { name: 'Vue.js', icon: 'vuejs', progress: 60 },
                { name: 'SQL', icon: 'database', progress: 60 },
                { name: 'ReactJS', icon: 'react', progress: 55 },
                { name: 'Spring Boot', icon: 'leaf', progress: 55 },
                { name: 'JavaScript', icon: 'js-square', progress: 45 },
                { name: 'Python', icon: 'python', progress: 40 },
                { name: 'Docker/K8s', icon: 'docker', progress: 30 }
            ],
            isFolded: true,
            threshold: 5
        };
        },
        computed: {
        visibleSkills() {
            return this.isFolded ? this.skills.slice(0, this.threshold) : this.skills;
        }
        },
        methods: {
        toggleFold() {
            this.isFolded = !this.isFolded;
        }
        }
    }
</script>

<style scoped>
    .toggle-div {
        width: 100%;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
    }

    .toggle-div * {
        margin: 0;
    }

    .toggle-button {
        background: none;
        border: none;
        cursor: pointer;
    }

    svg {
        color: white!important;
    }

    .skill-transition-enter-active, .skill-transition-leave-active {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .skill-transition-enter-from {
        opacity: 0;
        transform: translateY(-20px); 
    }

    .skill-transition-enter-to {
        opacity: 1;
        transform: translateY(0);  
    }

    .skill-transition-leave-from {
        opacity: 1;
        transform: translateY(0);  
    }

    .skill-transition-leave-to {
        opacity: 0;
        transform: translateY(-20px);  
    }

    @media (max-width: 1100px) {
        
 
    }

    @media (max-width: 850px) {
   
        .toggle-div span {
            font-size: 12px;
        }
    }

</style>