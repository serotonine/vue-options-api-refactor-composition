import './assets/style.css'
import TheHeader from './components/TheHeader.vue';


import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App);
app.component('the-header', TheHeader);
app.mount('#app');
