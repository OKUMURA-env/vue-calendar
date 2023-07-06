import './bootstrap';
import router from './routes';
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import CalendarComponent from './components/Calendar.vue';

const app = createApp({})
app.use(router)
app.component('calendar', CalendarComponent);
app.mount('#app');