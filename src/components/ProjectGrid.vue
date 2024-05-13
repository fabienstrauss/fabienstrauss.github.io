<template>
    <div>
        <div class="project-grid">
            <div class="project-card" v-for="project in projects" :key="project.id">
                <img :src="project.image" alt="Project image" class="project-image">
                <div class="project-info">
                    <h3>{{ project.name }}</h3>
                    <div class="project-tags">
                        <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                        <button class="more-info" @click="showPopup(project)">
                            Read More
                            <font-awesome-icon icon="arrow-right" class="fa-arrow-right" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Overlay -->
        <div v-if="isPopupVisible" class="overlay" @click="closePopup"></div>

        <!-- Project Popup -->
        <transition name="project-popup">
            <ProjectPopup v-if="isPopupVisible" :project="selectedProject" @close="closePopup" />
        </transition>
    </div>
</template>

<script>
    import gyc from '@/assets/images/getyourcoach-website-mockup.jpg';
    import wuestenhagenBauausfuehrung from '@/assets/images/wuestenhagen-website-mockup.jpg';
    import afterlife from '@/assets/images/afterlife-website-mockup.jpg';
    import thisPortfolio from '@/assets/images/portfolio-website-mockup.jpg';

    import gyc_1 from '@/assets/images/getyourcoach-screenshot-1.jpg';
    import gyc_2 from '@/assets/images/getyourcoach-screenshot-2.jpg';
    import gyc_3 from '@/assets/images/getyourcoach-screenshot-3.jpg';

    import afterlife_1 from '@/assets/images/afterlife-screenshot-1.jpg';
    import afterlife_2 from '@/assets/images/afterlife-screenshot-2.jpg';
    import afterlife_3 from '@/assets/images/afterlife-screenshot-3.jpg';
    import afterlife_4 from '@/assets/images/afterlife-screenshot-4.jpg';

    import wuestenhagen_1 from '@/assets/images/wuestenhagen-screenshot-1.jpg';
    import wuestenhagen_2 from '@/assets/images/wuestenhagen-screenshot-2.jpg';
    import wuestenhagen_3 from '@/assets/images/wuestenhagen-screenshot-3.jpg';
    import wuestenhagen_4 from '@/assets/images/wuestenhagen-screenshot-4.jpg';
    import wuestenhagen_5 from '@/assets/images/wuestenhagen-screenshot-5.jpg';

    import ProjectPopup from './ProjectPopup.vue';

    export default {
        components: {
            ProjectPopup
        },
        data() {
            return {
                projects: [
                    {
                        id: 1,
                        name: 'This Portfolio',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                        images: [thisPortfolio],
                        tags: ['Vue.js', 'Typescript', 'GitHub Pages & Actions'],
                        image: thisPortfolio
                    },
                    {
                        id: 2,
                        name: 'Get Your Coach',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                        images: [gyc_1, gyc_2, gyc_3],
                        tags: ['Wordpress', 'Elementor', 'Custom Html/CSS', 'Graphic Design', 'Google Analytics'],
                        image: gyc
                    },
                    {
                        id: 3,
                        name: 'Afterlife Studios',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                        images: [afterlife_1, afterlife_2, afterlife_3, afterlife_4],
                        tags: ['Wordpress', 'Elementor', 'GSAP', 'Custom Html/CSS/JS', 'Graphic Design', 'Webdesign', 'Google Analytics'],
                        image: afterlife
                    },
                    {
                        id: 4,
                        name: 'Wüstenhagen Bauausführung',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                        images: [wuestenhagen_1, wuestenhagen_2, wuestenhagen_3, wuestenhagen_4, wuestenhagen_5],
                        tags: ['Wordpress', 'Elementor', 'Custom Html/CSS'],
                        image: wuestenhagenBauausfuehrung
                    }
                ],
                isPopupVisible: false,
                selectedProject: null
            };
        },
        methods: {
            showPopup(project) {
                this.selectedProject = project;
                this.isPopupVisible = true;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            },
            closePopup() {
                this.isPopupVisible = false;
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        }
    }
</script>

<style scoped>
    .project-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 25px;
    }

    .project-card {
        background: #f1f1f1;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .project-info {
        padding: 15px;
    }

    .project-info h3 {
        color: #101010;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 10px 0;
    }

    .tag {
        background-color: #101010;
        color: #f1f1f1;
        font-size: 12px;
        padding: 5px 15px;
        border-radius: 500px;
    }

    .more-info {
        display: flex;
        align-items: center;
        background: #f1f1f1;
        color: #101010;
        font-size: 12px;
        border: 1px solid #101010;
        padding: 5px 15px;
        border-radius: 500px;
        cursor: pointer;
        position: relative;
        font-family: "Space Mono", monospace;
    }

    .more-info .fa-arrow-right {
        margin-left: 8px;
        transition: transform 0.3s ease;
    }

    .more-info:hover .fa-arrow-right {
        transform: translateX(5px);
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

    @media (max-width: 1100px) {
        
 
    }

    @media (max-width: 850px) {
        
        .project-image {
            height: 200px;
        }
 
        .project-grid {
            gap: 10px;
        }

        .project-info h3 {
            font-size: 16px;
        }

        .project-info {
            padding: 10px;
        }

        .project-grid {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
