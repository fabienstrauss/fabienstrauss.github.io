<template>
    <div id="contact-popup">
        <div class="contact-content">
            <h3>Contact Me</h3>
            <p>You can reach me via...</p>
            <!-- Close button -->
            <button @click="$emit('close')">Close</button>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
    #contact-popup {
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 500px;
        background-color: #101010;
        color: #f1f1f1;
        padding: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        z-index: 20;
    }

    .contact-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .contact-content h3 {
        margin: 0;
    }

    .contact-content button {
        align-self: flex-end;
        padding: 5px 15px;
        border-radius: 5px;
        background: #f1f1f1;
        color: #101010;
        cursor: pointer;
        border: 1px solid #101010;
    }
</style>
