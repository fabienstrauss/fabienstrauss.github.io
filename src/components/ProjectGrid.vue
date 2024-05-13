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
                        description: 'This portfolio represents my very own project, showcasing my initial foray into coding a website from scratch. As my first experience in completely hardcoding a website, it is an evolving work in progress, meant to be updated and refined over time. This ongoing development not only allows me to continuously enhance my programming skills but also ensures that the portfolio remains up-to-date, particularly with my timeline and projects.<br><br><strong>Future enhancements include:</strong><ul><li>Adding different views/pages for "work" and "about", since due to time constraints I decided to make that in a later step.</li><li>Adding various animations, such as entrance animations or hover effects.</li><li>Fixing a bug in the mobile view of the header.</li><li>Experimenting with different sections or adding new ones where I can be creative.</li></ul>',
                        images: [thisPortfolio],
                        tags: ['Vue.js', 'Typescript', 'GitHub Pages & Actions'],
                        image: thisPortfolio
                    },
                    {
                        id: 2,
                        name: 'Get Your Coach',
                        description: 'The "Get Your Coach" website was a project I developed for a friend’s app. This project marked the first undertaking for my agency, Afterlife Studios. Throughout the development process, I gained substantial experience and learned a great deal about web design and development. While the website may not be perfect and there are aspects I would approach differently now with more experience, it represents a significant milestone in my career. I might revisit and refine the site in the future to apply my improved skills. You can visit the website <a href="https://getyourcoach-app.com" target="_blank">here</a>.',
                        images: [gyc_1, gyc_2, gyc_3],
                        tags: ['Wordpress', 'Elementor', 'Custom Html/CSS', 'Graphic Design', 'Google Analytics'],
                        image: gyc
                    },
                    {
                        id: 3,
                        name: 'Afterlife Studios',
                        description: 'The Afterlife Studios website is a project that holds a special place for me, as it represents the pinnacle of my design skills. Unfortunately, the startup is no longer active, but I began this project towards the end of its operations and didn’t get the chance to finish it. Despite being incomplete, I consider it a great showcase of what I can achieve with WordPress and Elementor. You can visit the unfinished site <a href="https://afterlife-studios.de" target="_blank">here</a>. The texts are placeholders, and only the home page is complete. This project demonstrates my growth in design, especially when compared to the "Get Your Coach" project. <br><br><strong>Missing elements include:</strong><ul><li>Complete text content and placeholder replacements.</li><li>Design and implementation of additional pages (About, Services, Contact, etc.).</li><li>Responsive design adjustments.</li><li>Finalizing all interactive elements and animations.</li><li>Optimizing loading times.</li><li>And more...</li></ul>',
                        images: [afterlife_1, afterlife_2, afterlife_3, afterlife_4],
                        tags: ['Wordpress', 'Elementor', 'GSAP', 'Custom Html/CSS/JS', 'Graphic Design', 'Webdesign', 'Google Analytics'],
                        image: afterlife
                    },
                    {
                        id: 4,
                        name: 'Wüstenhagen Bauausführung',
                        description: 'The Wüstenhagen Bauausführung website was a significant milestone for me as it was the first project delivered to a real customer outside of my personal network. The client needed a fresh, modern website for his construction business, and we successfully delivered it. Unfortunately, the client has since decided to close his business, so the website will eventually be shut down. Despite this, I am proud to showcase this project due to the positive feedback it received from the client and his network. The included screenshots below highlight various parts of the website.',
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
