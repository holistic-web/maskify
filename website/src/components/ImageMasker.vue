<template>
	<div class="ImageMasker">
		<h3 class="ImageMasker__title">Final Adjustments:</h3>

		<img :src="url"/>
	</div>
</template>

<script>
export default {
	props: {
		imageSize: {
			type: Number,
			required: true
		},
		url: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="scss">
@import '@holistic-web/el-layout/src/styles/theme';

$spacing: 2rem;

.ImageMasker {

	&__title {
		color: $primary;
		margin-bottom: $spacing;
	}

}
</style>
