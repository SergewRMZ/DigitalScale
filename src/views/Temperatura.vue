<template>
  <div class="temperature-view">
    <div class="background-overlay"></div>
    <h2 class="font__temperatura mb-3 animate__animated animate__pulse animate__slow animate__infinite">
      Sensor de Temperatura
    </h2>
    
    <div class="thermometer shadow">
      <div class="thermometer-inner">
        <div class="mercury" :style="{ height: mercuryHeight + '%', backgroundColor: mercuryColor }"></div>

        <div class="indicator-line" style="bottom: 10%;"></div>
        <div class="indicator-line" style="bottom: 20%;"></div>
        <div class="indicator-line" style="bottom: 30%;"></div>
        <div class="indicator-line" style="bottom: 40%;"></div>
        <div class="indicator-line" style="bottom: 50%;"></div>
        <div class="indicator-line" style="bottom: 60%;"></div>
        <div class="indicator-line" style="bottom: 70%;"></div>
        <div class="indicator-line" style="bottom: 80%;"></div>
        <div class="indicator-line" style="bottom: 90%;"></div>
      </div>
      
    </div>

    <div class="temperature-value">
      {{ temperature }} °C
    </div>

    <button class="btn btn-success mt-3 w-25 z-1" @click="toogleWebSocket">
      {{ isWebSocketConnected ? 'Apagar' : 'Encender' }}
    </button>
  </div>
</template>

<script lang="ts">
import WebSocketService from '@/api/ws-service';
import { mapActions, mapState } from 'vuex';


export default {

  data () {
    return {
      isWebSocketConnected: false
    }
  },

  computed: {
    ...mapState('temperatura', ['temperature']),


    mercuryHeight() {
      return (this.temperature / 100) * 100;
    },

    mercuryColor () {
      if (this.temperature >= 80) {
        return 'var(--danger-color)';
      }

      else if (this.temperature >= 50) {
        return 'var(--orange-color)';
      }

      else {
        return `var(--secondary-color)`;
      }
    }
  },

  methods: {
    ...mapActions('temperatura', ['initWebSocket', 'sendDataPic', 'disconnect']),

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

  // Componente montado
  // async mounted() {
  //   await this.initWebSocket();
  // },

  // Desmontar componente
  beforeUnmount() {
    WebSocketService.getInstance().closeWebSocket();
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.temperature-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/Nubes.png');
  background-size: cover;
  height: 100vh;
  position: relative;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); /* Fondo semi-transparente */
  z-index: 0;
}

.font__temperatura {
  font-family: 'Roboto', 'sans-serif';
  font-size: 40px;
  color: var(--white-color);
  text-transform: uppercase;
  z-index: 1;
}

.thermometer {
  position: relative;
  width: 60px;
  height: 300px;
  border-radius: 30px;
  background-color: #ffffff;
  margin-top: 20px;
  border: 3px solid black;
}

.thermometer-inner {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
}

.mercury {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgb(0, 136, 255);
  transition: height 0.5s ease-in-out;
}

.indicator-line {
  position: absolute;
  left: rugh;
  width: 50%;
  height: 2px;
  background-color: #000;
}

.temperature-value {
  color: white;
  font-size: 30px;
  font-weight: bold;
  z-index: 1;
}
</style>
