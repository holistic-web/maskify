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
		},
		data: {
			type: String, // TODO: switch type to object and use facial recognition data to add mask
			requied: true
		}
	}
};

// TODO use mask images in 'src/assets' folder to overlay mask on image
// TODO allow user to adjust mask positioning
// TODO default positioning to values in 'data' prop
// TODO allow user to save the image
// TODO host the image and allow user to share the image to get us more clicks
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
