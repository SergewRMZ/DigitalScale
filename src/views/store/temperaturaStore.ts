import { Commit } from "vuex";
import WebSocketService from '@/api/ws-service';

interface TemperaturaState {
  temperature: number;
}

const temperaturaStore = {
  namespaced: true,

  state: (): TemperaturaState => ({
    temperature: 0,
  }),
  
  
  mutations: {
    updateTemperature(state: TemperaturaState, newTemperature: number) {
      state.temperature = newTemperature;
    },
  },
  
  actions: {
    async initWebSocket({ commit }: { commit: Commit }) {
      console.log('Iniciar websocket');
      await WebSocketService.getInstance().connectWebSocket((data: any) => {
        console.log(`Datos recibidos del WebSocket: ${data}`);
        commit('updateTemperature', parseFloat(data));
        WebSocketService.getInstance().sendDataToServer('3');
      });
    },

    async disconnect({ commit }: {commit: Commit}) {
      await WebSocketService.getInstance().closeWebSocket();
    }
  },
}

export default temperaturaStore;