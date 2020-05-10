import firebase from 'firebase';
import Vue from 'vue';
import '@holistic-web/el-layout';
import '@holistic-web/el-layout/dist/el-layout.css';
import App from './App.vue';

firebase.initializeApp({
	apiKey: 'AIzaSyAWrKFB2SzR0uOR9bwVLoIBZ_C4wDjRliE',
	authDomain: 'maskify-f6f41.firebaseapp.com',
	databaseURL: 'https://maskify-f6f41.firebaseio.com',
	projectId: 'maskify-f6f41',
	storageBucket: 'maskify-f6f41.appspot.com',
	messagingSenderId: '107696207454',
	appId: '1:107696207454:web:0903fafd22cfe95ca0e6cf',
	measurementId: 'G-VLWLXBWVKQ'
});

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount('#app');
