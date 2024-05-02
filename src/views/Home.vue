<template>
    <div class="home">
        <div class="landing-page">
            <div class="row">
                <img :src="meUrl" id="me-image" alt="Me-Image">
            </div>
            <div class="row">
                <h1>Hi, I am Fabien!</h1>
            </div>
            <div class="row">
                <p class="me-description">I'm deeply passionate about technology and design, driven by a constant curiosity to explore new things. I love learning and am always eager to push the boundaries of what’s possible.</p>
            </div>
            <div class="row socials">
                <div>
                    <a href="https://github.com/fabienstrauss" target="_blank" class="link-wrapper">
                        <GitHubIcon/>
                        <p>GitHub</p>
                    </a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/fabien-strau%C3%9F/" target="_blank" class="link-wrapper">
                        <LinkedInIcon/>
                        <p>LinkedIn</p>
                    </a>
                </div>
            </div>
        </div>

        <div class="about">
            <h2>My Timeline</h2>
            <div class="timeline-start"></div>
            <div class="timeline">
                <div class="left">
                    <TimelineSection 
                        :icon="TimelineWorkIcon"
                        time_start="09/2020" 
                        time_end="09/2023" 
                        title="Dual Student in Business Informatics" 
                        content="During my studies I actively applied learned concepts and skills in projects with my practical Partner, Stromnetz Berlin GmbH."
                        indicatorPosition="right"
                    />
                    <TimelineSection 
                        :icon="TimelineWorkIcon"
                        time_start="01/2023" 
                        time_end="03/2024" 
                        title="CEO of Afterlife Studios UG" 
                        content="Founder and leader of Afterlife Studios, specializing in web design and digital services. Although the company eventually folded, I regard the experience and skills gained as highly valuable."
                        indicatorPosition="right"
                    />
                    <TimelineSection 
                        :icon="TimelineWorkIcon"
                        time_start="10/2023" 
                        time_end="Present" 
                        title="IT-Application-Consultant at Stromnetz Berlin GmbH" 
                        content="Responsible for maintaining and optimizing IT applications, regularly undertaking additional tasks beyond my formal job description, including programming, to further enhance system efficiency."
                        indicatorPosition="right"
                    />
                </div>

                <div class="right">
                    <TimelineSection 
                        :icon="TimelineStudyIcon"
                        time_start="09/2020" 
                        time_end="09/2023" 
                        title="Bachelor of Science Business Informatics" 
                        content="Dual Student at HWR Berlin, gaining knowledge in computer science and business adiministration."
                        indicatorPosition="left"
                    />
                    <TimelineSection 
                        :icon="TimelineStudyIcon"
                        time_start="04/2024" 
                        time_end="Present" 
                        title="Additional Studies for a Master's in Computer Science" 
                        content="Currently enrolled as a student, accumulating credits for a Master's degree in Computer Science."
                        indicatorPosition="left"
                    />
                    <TimelineSection 
                        :icon="TimelineStudyIcon"
                        time_start="2025" 
                        time_end="?" 
                        title="Master's in Computer Science" 
                        content="Actively gathering necessary credits for my Master’s in Computer Science, aiming to deepen expertise and specialize."
                        indicatorPosition="left"
                    />
                </div>
            </div>
            <div class="timeline-end"></div>
        </div>
        <div class="skills">
            <h2>Skills / Technologies*</h2>
            <div class="technology">
                <SkillsList />
            </div>
            <p class="skills-note">* Ratings based on personal expertise; 100% indicates peak proficiency.</p>
        </div>
        <div class="work">
            <h2>Work</h2>
            <p>I am committed to continual learning and growth in technology. As I engage with new projects and broaden my expertise, I will update this section to reflect the most recent work and achievements.</p>


        </div>
    </div>
</template>

<script setup lang="ts">

    import meUrl from '@/assets/me.jpg'

    import TimelineSection from '@/components/TimelineSection.vue'
    import SkillsList from '@/components/SkillList.vue';

    import GitHubIcon from '@/components/GitHubIcon.vue'
    import LinkedInIcon from '@/components/LinkedInIcon.vue'
    import TimelineWorkIcon from '@/components/TimelineWorkIcon.vue'
    import TimelineStudyIcon from '@/components/TimelineStudyIcon.vue'

</script>

<style scoped>

    .landing-page {
        min-height: calc(100vh - 75px);
        margin-top: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 20%;
    }

    .socials {
        gap: 0px 10px;
    }

    .socials div {
        display: flex;
        flex-direction: row;
        align-items: center; 
        justify-content: center; 
        height: 30px;
        padding: 3px 20px;
        border: 1px solid #f1f1f1;
        border-radius: 100px;
        cursor: pointer;
        gap: 10px;
    }

    .socials div:hover {
        background-color: #f1f1f1;
        color: #101010;
        transition: all .2s linear;
	        -webkit-transition: all .2s linear;
	        -moz-transition: all .2s linear;
    }

    .socials div:hover .socials-icon {
        fill: #101010;
    }

    .socials p {
        font-size: 16px;
        margin: 0 0 0 10px;
    }

    .socials-icon {
        height: 25px;
        width: auto;
        transition: fill 0.3s;
    }

    .row {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;      
        width: 100%;
        margin-bottom: 0px;
    }

    .row h1 {
        font-size: 50px;
        line-height: 60px;
        margin: 0px 0px 10px 0px;
    }

    .me-description {
        font-size: 16px;
        line-height: 20px;
        margin: 0px 0px 20px 0px;
    }

    #me-image {
        width: 75px;
        border-radius: 100px;
        margin-bottom: 20px;
        border: 1px solid #f1f1f1;
    }

    .flex-end {
        display: flex;
        align-items: flex-end;
        margin-block-end: 0px !important;
    }

    .about {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: left;
        padding: 0 20%;
    }

    .about .timeline {
        display: flex;
        justify-content: center;
    }

    .about .timeline .left, .about .timeline .right {
        flex: 1; 
    }

    .about .timeline .left {
        flex: 1 1 50%;
        border-right: 0.5px solid #f1f1f1;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 50%;
    }

    .about .timeline .right {
        border-left: 0.5px solid #f1f1f1;
        flex: 1 1 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 50%;
    }

    .about h2, .skills h2  {
        margin: 25px 0 50px 0;
    }

    .work h2 {
        margin: 25px 0 0 0;
    }

    .timeline-start, .timeline-end {
        width: 100%;
        position: relative;
        height: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .timeline-start::before {
        content: '';
        width: 5px; 
        height: 5px;
        background-color: #f1f1f1;
        border-radius: 50%;
        display: block;
    }

    .timeline-end::after {
        content: '';
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid #f1f1f1;
        display: block;
    }

    .skills {
        margin-top: 100px;
        padding: 0 20%;
    }

    .skills-note {
        font-size: 12px;
        margin-top: 25px;
    }

    .work {
        margin-top: 100px;
        padding: 0 20%;
    }

    .link-wrapper {
        text-decoration: none; 
        color: inherit; 
        display: flex;
        flex-direction: row;
        align-items: center; 
        justify-content: center; 
    }

</style>