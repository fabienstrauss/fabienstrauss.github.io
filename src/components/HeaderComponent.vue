<template>
    <header :class="{'hidden-navbar': !showNavbar}">
        <div id="navbar">
            <div id="router-link-div">

                <router-link to="/" class="router-link">Home</router-link>
                <router-link to="/about" class="router-link">About</router-link>
                <router-link to="/projects" class="router-link">Projects</router-link>
                <!--<router-link to="/contact" class="router-link">Contact</router-link>-->


              <!--
                <a 
                    :class="{'active-link': activeSection === 'landing-page'}"
                    class="router-link" 
                    @click.prevent="scrollToSection('landing-page')"
                >Home</a>
                <a 
                    :class="{'active-link': activeSection === 'about'}"
                    class="router-link" 
                    @click.prevent="scrollToSection('about')"
                >About</a>
                <a 
                    :class="{'active-link': activeSection === 'work'}"
                    class="router-link" 
                    @click.prevent="scrollToSection('work')"
                >Work</a>
                <a 
                    :class="{'active-link': activeSection === 'contact-popup'}"
                    class="router-link" 
                    @click.prevent="toggleContactPopup"
                >Contact</a>
            -->
            </div>

            <!-- Conditionally display the contact popup -->
            <ContactPopup v-if="showContactPopup" @close="toggleContactPopup" />
        </div>
    </header>
</template>

<script setup lang="ts">
   
    import { ref, onMounted, onUnmounted } from 'vue';
    import ContactPopup from './ContactPopup.vue';

    const showContactPopup = ref(false);
    const activeSection = ref('landing-page');

    function toggleContactPopup() {
        showContactPopup.value = !showContactPopup.value;
        activeSection.value = 'contact-popup';
    }

    function scrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function updateActiveSection() {
        const sections = [
            { id: 'landing-page', name: 'landing-page' },
            { id: 'timeline', name: 'timeline' },
            { id: 'work', name: 'work' }
        ];

        for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    activeSection.value = section.name;
                    break;
                }
            }
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', updateActiveSection);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', updateActiveSection);
    });

    defineProps({
        showNavbar: Boolean
    });

</script>

<style scoped> 

    .router-link-active {
        color: #f1f1f1 !important;
    }

    .router-link {
        color: #f1f1f1;
        display: inline-block; 
        transition: transform 0.3s ease;
        margin: 0 10px;
        cursor: pointer;
    }

    .router-link:hover {
        transform: scale(1.1); 
    }

    .hidden-navbar #navbar {
        transform: translateY(-100%);
    }

    #navbar {
        position: fixed;
        top: 0;
        z-index: 10;
        height: 75px;
        min-height: 75px;
        width: calc(100vw - 10%);
        padding-left: 5%;
        padding-right: 5%;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .2s linear;
	        -webkit-transition: all .2s linear;
	        -moz-transition: all .2s linear;
    }

    #logo-div, #contact-div {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 20%; 
        display: flex;
        justify-content: start;
    }

    #contact-div {
        justify-content: flex-end !important; 
    }

    #router-link-div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 1px #f1f1f1;
        border-radius: 1000px;
        padding: 10px 20px;
        background-color: #101010;
    }

</style>