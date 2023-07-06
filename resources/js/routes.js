import ExampleComponent from './components/Example.vue';
import CalendarComponent from './components/Calendar.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        component: ExampleComponent,
        name:'home',
    },
    {
        path: "/calendar",
        component: CalendarComponent,
        name:'calendar',
    },
];

const router = createRouter({
    routes, // short for `routes: routes`
    history: createWebHistory(),
  })

export default router;