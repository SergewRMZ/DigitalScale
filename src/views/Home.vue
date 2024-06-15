<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center min-vh-100"
    style="background-color: #fff"
  >
    <h2 class="font__bascula mt-5 mb-5 animate__animated animate__pulse animate__slow"> Báscula Digital </h2>
    
    <div class="shadow-lg container-md display__bascula w-50 text-center py-5"
      :style="{'color': this.progress >= 90 ? 'var(--danger-color)' : 'var(--secondary-color)'}">
      {{ weight }} {{ unit }}
    </div>

    <div class="bar__progress my-3 w-50">
      <div class="progress" style="height: 2rem">
        <div
          class="progress-bar"
          role="progressbar"
          :style="progressBarStyle"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ progress }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Bascula",

  computed: {
    ...mapState('bascula', ['weight', 'unit', 'maxWeight', 'minWeight']),

    progress() {
      return ((this.weight / this.maxWeight) * 100).toFixed(2);
    },

    progressBarStyle () {
      let color;
      if (this.progress >= 90) {
        color = 'var(--danger-color)';
      }

      else {
        color = `var(--secondary-color)`;
      }

      return {
        width: this.progress + '%',
        'font-size': '20px',
        'font-weight': 'bold',
        'background-color': color
      };
    }
  },

  methods: {
    ...mapActions('bascula', ['getWeight', 'initWebSocket']),

    toggleRandomValues() {
      console.log('Generar valores');
      setInterval(() => {
        this.getWeight();
      }, 1000);
    },
    
  },

  created() {
    this.initWebSocket();
  }
};

</script>

<style scoped>
.display__bascula {
  background-color: #000000;
  border: 5px solid #565656;
  border-radius: 1rem;
  font-family: "Orbitron", "sans-serif";
  font-weight: bold;
  font-size: 80px;
}

.font__bascula {
  font-family: 'Roboto', 'sans-serif';
  font-size: 60px;
  font-weight: bold;
  color: var(--primary-color);
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  letter-spacing: 3.5px;
}
</style>
