import Vue from 'vue';
import '@holistic-web/el-layout';
import '@holistic-web/el-layout/dist/el-layout.css';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount('#app');
