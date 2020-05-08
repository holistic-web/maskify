<template>
	<div id="app">
		<el-layout>
			<img alt="Vue logo" src="./assets/logo.png">
			<HelloWorld msg="Welcome to Your Vue.js App"/>
		</el-layout>
	</div>
</template>

<script>
import { ElLayout } from '@holistic-web/el-layout';
import HelloWorld from './components/HelloWorld.vue';

export default {
	name: 'App',
	components: {
		ElLayout,
		HelloWorld
	}
};
</script>

<style lang="scss">
#app {
	font-family: 'Fira Code', monospace;
}
</style>
