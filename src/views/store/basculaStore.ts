import { Commit } from "vuex";
import WebSocketService from '@/api/ws-service';

interface BasculaState {
  weight: number;
  unit: string;
  maxWeight: number;
  minWeight: number;
}

const webSocketService = new WebSocketService();

const basculaStore = {
  namespaced: true,

  state: (): BasculaState => ({
    weight: 0,
    unit: 'Kg',
    maxWeight: 5,
    minWeight: 0,
  }),
  
  getters: {
    progress(state: BasculaState): number {
      const totalWeightRange = state.maxWeight - state.minWeight;
      return ((state.weight - state.minWeight) / totalWeightRange) * 100;
    }
  },
  
  mutations: {
    updateWeight(state: BasculaState, newWeight: number) {
      state.weight = newWeight;
    }
  },
  
  actions: {
    getWeight ({ commit }: { commit: Commit }) {
      const max = 5;
      const randomWeight = (Math.random() * max).toFixed(2);
      commit('updateWeight', parseFloat(randomWeight));
    },

    initWebSocket({ commit }: { commit: Commit }) {
      console.log('Iniciar websocket');
      webSocketService.connectWebSocket((data: any) => {
        console.log(`Datos recibidos del WebSocket: ${data}`);
        commit('updateWeight', parseFloat(data));
      });
    }

    
  },
}

export default basculaStore;