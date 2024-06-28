import { createStore } from 'vuex'
import basculaStore from '@/views/store/basculaStore'
import temperaturaStore from '@/views/store/temperaturaStore'
export default createStore({
  modules: {
    bascula: basculaStore,
    temperatura: temperaturaStore
  }
})
