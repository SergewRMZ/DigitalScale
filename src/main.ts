import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/css/styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'animate.css';

createApp(App).use(store).use(router).mount('#app')
