<template>
	<div id="app">
		<el-layout
			title="Maskify"
			subtitle="a holistic project">

			<maskify/>

		</el-layout>
	</div>
</template>

<script>
import { ElLayout } from '@holistic-web/el-layout';
import Maskify from './components/Maskify.vue';

export default {
	name: 'App',
	components: {
		ElLayout,
		Maskify
	}
};
</script>

<style lang="scss">
#app {
	font-family: 'Fira Code', monospace;
}
</style>
