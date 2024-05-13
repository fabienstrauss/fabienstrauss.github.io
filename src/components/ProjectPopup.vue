<template>
    <div class="project-popup">
        <div class="popup-content">
            <button class="close-btn" @click="$emit('close')">&times;</button>
            <h2>{{ project.name }}</h2>
            <p v-html="project.description"></p>
            <div class="project-tags">
                <span class="tag" v-for="(tag, index) in project.tags" :key="index">{{ tag }}</span>
            </div>
            <div class="project-images">
                <img v-for="(image, index) in project.images" :key="index" :src="image" :class="getImageClass(index)" alt="Additional project image" class="additional-images">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProjectPopup',
        props: {
            project: {
                type: Object,
                required: true
            }
        },
        methods: {
            getImageClass(index) {
                const numImages = this.project.images.length;

                if (numImages === 1) {
                    return 'full-width';
                }

                if (numImages === 2 || (numImages > 2 && numImages % 2 === 0)) {
                    return 'half-width';
                }

                if (numImages > 2 && numImages % 2 !== 0) {
                    return index === numImages - 1 ? 'full-width' : 'half-width';
                }

                return 'default-layout';
            }
        }
    }
</script>

<style scoped>
    .project-popup {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 90vh;
        background: #101010;
        color: #f1f1f1;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        overflow-y: auto;
        border-radius: 20px 20px 0 0;
        z-index: 20;
        transition: transform 0.3s ease-in-out;
    }

    .popup-content {
        padding: 20px 20%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .popup-content h2 {
        margin-bottom: 0;
    }

    .popup-content p {
        margin: 0;
        font-size: 14px;
        line-height: 18px;
    }

    a {
        color: lightblue !important;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 10px 0;
    }

    .tag {
        color: #f1f1f1;
        border: 1px solid #f1f1f1;
        font-size: 12px;
        padding: 5px 15px;
        border-radius: 500px;
    }

    .close-btn {
        align-self: flex-end;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 24px;
        color: #f1f1f1;
    }

    .project-popup-enter-active, .project-popup-leave-active {
        transition: transform 0.3s ease;
    }

    .project-popup-enter-from, .project-popup-leave-to {
        transform: translateY(100%);
    }

    .project-images {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2, 1fr); 
    }

    .full-width {
        grid-column: span 2; 
        width: 100%;
    }

    .half-width {
        width: 100%;
    }

    .additional-images {
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    @media (max-width: 1100px) {
        .popup-content {
            padding-left: 10%;
            padding-right: 10%;
        }
    }

    @media (max-width: 850px) {
        .popup-content {
            padding-left: 20px;
            padding-right: 20px;
        }

        .project-images {
            gap: 0px;
            row-gap: 10px;
            grid-template-columns: repeat(1, 1fr); 
        }
    }

</style>
