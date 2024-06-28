import { Commit } from "vuex";
import WebSocketService from '@/api/ws-service';

interface BasculaState {
  weight: number;
  unit: string;
  maxWeight: number;
  minWeight: number;
}

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
    },

    setUnit(state: BasculaState, unit: string) {
      state.unit = unit;
    }
  },
  
  actions: {
    async initWebSocket({ commit }: { commit: Commit }) {
      console.log('Iniciar websocket');
      await WebSocketService.getInstance().connectWebSocket((data: any) => {
        console.log(`Datos recibidos del WebSocket: ${data}`);
        commit('updateWeight', parseFloat(data));
        WebSocketService.getInstance().sendDataToServer('1');
      });
    },

    async disconnect({ commit }: {commit: Commit}) {
      await WebSocketService.getInstance().closeWebSocket();
    }
  },
}

export default basculaStore;