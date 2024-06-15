import { createStore } from 'vuex'
import basculaStore from '@/views/store/basculaStore'
export default createStore({
  modules: {
    bascula: basculaStore,
  }
})
