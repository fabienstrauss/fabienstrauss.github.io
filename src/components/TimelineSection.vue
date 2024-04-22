<template>
    <div class="timeline-section" :class="sectionClasses">
        <div class="timeline-icon-indicator-wrapper">
            <component :is="icon" v-if="icon" class="icon" />
            <div class="timeline-indicator"></div>
        </div>
        <div class="timeline-details">
            <div class="timeline-time">{{ time_start }} - {{ time_end }}</div>
            <h3 class="timeline-title">{{ title }}</h3>
            <p class="timeline-content">{{ content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TimelineSection',
    props: {
        time_start: String,
        time_end: String,
        title: String,
        content: String,
        indicatorPosition: {
            type: String,
            default: 'left'
        },
        icon: String
    },
    computed: {
      sectionClasses() {
        return {
          'left-indicator': this.indicatorPosition === 'left',
          'right-indicator': this.indicatorPosition === 'right',
          'reverse-row': this.indicatorPosition === 'left',
        };
      }
    }
  };
  </script>
  
  <style scoped>

    .timeline-section {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 0 20px 0;
    }

    .timeline-section {
        display: flex;
        align-items: flex-start;
        margin: 0 0 20px 0;
    }
    

    .right-indicator .timeline-icon-indicator-wrapper {
        order: 1;
    }

    .timeline-indicator {
        width: 8px;
        height: 8px;
        background-color: #f1f1f1;
        top: 0;
        transform: translateY(-50%) rotate(45deg);
        position: absolute;
        margin-top: 20px;
    }
    
    .left-indicator .timeline-indicator {
        left: 0;
        transform: translateX(calc((-50%) - 0.5px)) rotate(45deg);
    }
    
    .right-indicator .timeline-indicator {
        right: 0;
        transform: translateX(calc((50%) + 0.5px)) rotate(45deg);
    }
    
    .timeline-details {
        flex-grow: 1;
        text-align: left;
        padding: 10px 0px;
    }

    .timeline-details * {
        word-wrap: break-word;
        hyphens: auto;
    }
    
    .timeline-time, .timeline-title, .timeline-content {
        margin: 0;
    }

    .timeline-time {
        color: #f1f1f1a7
    }

    .timeline-content {
        font-size: 14px;
        line-height: 18px;
        margin-top: 10px;
    }
    
    .icon {
        width: 25px;
        height: 25px;
        fill: #f1f1f1;
        top: 0;
        transform: translateY(-50%);
    }
    
    .left-indicator .icon {
        margin: 25px 10px 0px 10px;
    }
    
    .right-indicator .icon {
        margin: 25px 10px 0px 10px;
        order: 2;
    }
    
    .reverse-row .timeline-details {
        order: 1;
    }

  </style>