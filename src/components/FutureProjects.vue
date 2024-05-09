<template>
    <div class="upcoming-grid">
        <div class="upcoming-card" v-for="project in futureProjects" :key="project.id">
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
        </div>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                futureProjects: [
                { id: 1, name: "Stock Price Predictor", description: "A project to enhance my machine learning skills, analyzing historical data to predict future stock prices and refine investment strategies." },
                { id: 2, name: "Blockchain Based Voting Platform", description: "An initiative to deepen my understanding of blockchain, developing a secure, transparent voting platform while exploring decentralized technologies." }
                ]
            };
         }
    }
</script>
  
<style scoped>
  
    .upcoming-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 25px;
    }
  
    .upcoming-card {
        background: transparent;
        border: 1px solid #f1f1f1;
        border-radius: 10px;
        padding: 10px 15px;
    }
  
    .upcoming-card h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #f1f1f1;
    }
  
    .upcoming-card p {
        margin: 0;
        font-size: 14px;
        color: #f1f1f1;
    }

    @media (max-width: 1100px) {
        
 
    }

    @media (max-width: 850px) {
   
        .upcoming-card h3 {
            font-size: 16px;
        }
    
        .upcoming-card p {
            font-size: 14px;
        }
    }
  </style>