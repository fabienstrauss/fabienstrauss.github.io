<template>
    <div>
        <div v-for="skill in visibleSkills" :key="skill.name">
            <SkillItem :name="skill.name" :icon="skill.icon" :progress="skill.progress" />
        </div>
        <button v-if="skills.length > threshold" @click="toggleFold">
        {{ isFolded ? 'Show More' : 'Show Less' }}
        </button>
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
            { name: 'JavaScript', icon: 'js-square', progress: 90 },
            { name: 'HTML5', icon: 'html5', progress: 95 },
            { name: 'HTML5', icon: 'html5', progress: 95 },
            { name: 'HTML5', icon: 'html5', progress: 55 },
            { name: 'HTML5', icon: 'html5', progress: 35 },
            { name: 'HTML5', icon: 'html5', progress: 55 },
            { name: 'HTML5', icon: 'html5', progress: 0 },
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