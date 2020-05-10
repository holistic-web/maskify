<template>
	<div class="ImageUploader">
		<h3 class="ImageUploader__title">Upload an image</h3>
		<image-uploader
			class="ImageUploader__uploader"
			:debug="1"
			:maxWidth="512"
			:maxHeight="512"
			:quality="0.9"
			:autoRotate=true
			outputFormat="verbose"
			:preview=true
			:capture="true"
			doNotResize="['gif', 'svg']"
			@onUpload="startImageResize"
			@onComplete="endImageResize"/>
	</div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize';

export default {
	components: {
		ImageUploader
	},
	methods: {

	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@holistic-web/el-layout/src/styles/theme';

.ImageUploader {
	display: flex;
	flex-direction: column;

	&__title {
		color: $primary;
		margin-bottom: 1rem;
	}

	&__uploader {

		.img-preview {
			margin-right: 1rem;
		}

	}
}

</style>
