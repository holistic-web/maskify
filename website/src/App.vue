<template>
	<div id="app">
		<el-layout
			title="Maskify"
			subtitle="a holistic project">
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
		HelloWorld,
	}
};
</script>

<style lang="scss">
#app {
	font-family: 'Fira Code', monospace;
}
</style>
