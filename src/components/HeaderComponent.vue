<template>
    <header :class="{'hidden-navbar': !showNavbar}">
        <div id="navbar">
            <div id="router-link-div">
                <router-link to="/" class="router-link">Home</router-link>
                <router-link to="/work" class="router-link">Work</router-link>
                <router-link to="/about" class="router-link">About</router-link>
                <router-link to="/contact" class="router-link">Contact</router-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

    import logoUrl from '@/assets/temp_logo.svg';
   
    defineProps({
        showNavbar: Boolean
    });

</script>

<style scoped> 

    .logo {
        height: 50px;
        width: auto;
    }

    .router-link-active {
        color: #f1f1f1 !important;
    }

    .router-link {
        color: #c8c8c8;
        display: inline-block; 
        transition: transform 0.3s ease;
        margin: 0 10px;
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