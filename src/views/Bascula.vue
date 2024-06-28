<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center min-vh-100 background-gradient"
  >
    <h2 class="font__bascula mb-3 animate__animated animate__pulse animate__slow animate__infinite"> Báscula Digital </h2>
    
    <div class="shadow-lg container-md display__bascula w-50 text-center py-5 mb-5"
      :style="{'color': this.progress >= 90 ? 'var(--danger-color)' : 'var(--secondary-color)'}">
      {{ formattedWeight }} {{ unit }}

      
    <div class="d-flex justify-content-center mt-5">
    <button @click="setUnit('Kg')" class="btn btn-primary mx-2 custom-button">Kg</button>
    <button @click="setUnit('g')" class="btn btn-primary mx-2 custom-button">g</button>
</div>
    </div>

    <div class="bar__progress w-50">
      <div class="progress" style="height: 3rem">
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

    <button class="btn btn-success mt-3 w-25" @click="toogleWebSocket">
      {{ isWebSocketConnected ? 'Apagar' : 'Encender' }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import WebSocketService from "@/api/ws-service";
export default {
  name: "Bascula",

  data () {
    return {
      isWebSocketConnected: false
    }
  },

  computed: {
    ...mapState('bascula', ['weight', 'unit', 'maxWeight', 'minWeight']),

    progress() {
      return ((this.weight / this.maxWeight) * 100).toFixed(2);
    },

    formattedWeight () {
      if (this.unit === 'g') {
        return (this.weight * 1000).toFixed(0);
      }

      return this.weight.toFixed(2);
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
    ...mapActions('bascula', ['initWebSocket', 'sendDataPic', 'disconnect']),
    ...mapMutations('bascula', ['setUnit']),

    async toogleWebSocket() {
      if (this.isWebSocketConnected) {
        await this.disconnect();
        this.isWebSocketConnected = false;
      } else {
        await this.initWebSocket();
        this.isWebSocketConnected = true;
      }
    }
  },

  // async mounted() {
  //   await this.initWebSocket();
  // },

  beforeUnmount() {
    WebSocketService.getInstance().closeWebSocket();
  }
};

</script>

<style scoped>
.display__bascula {
  background-color: #000000;
  border: 5px solid #252525;
  border-radius: 1rem;
  font-family: "Orbitron", "sans-serif";
  font-weight: bold;
  font-size: 80px;
  height: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
}

.font__bascula {
  font-family: 'Orbitron', 'sans-serif';
  font-size: 50px;
  font-weight: bold;
  color: var(--primary-color);
  text-transform: uppercase;
}

.custom-button {
  background-color: #373737;
  width: 100px;
  border: 2px solid #252525;
  font-weight: bold;
}

.logo_img {
  height: 200px;
}

.logos-container {
  width: 100%;
}

</style>
