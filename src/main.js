import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import './index.css';

Vue.config.errorHandler = function (err, vm, info) {
	// handle error
	// `info` is a Vue-specific error info, e.g. which lifecycle hook
	// the error was found in. Only available in 2.2.0+
};

createApp(App).use(router).use(store).mount('#app');
