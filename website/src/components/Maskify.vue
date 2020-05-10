<template>
	<div class="Maskify">

		<p class="Maskify__summary">
			A key tool in our fight against the coronavirus. Check us out on <a href="https://github.com/holistic-web/maskify">Github</a>!
		</p>

		<image-uploader
			v-if="!imageUrl"
			:imageSize="imageSize"
			@uploaded="onImageUpload"/>

		<image-masker
			v-if="imageUrl"
			:imageSize="imageSize"
			:url="imageUrl"/>
	</div>
</template>

<script>
import ImageUploader from './ImageUploader.vue';
import ImageMasker from './ImageMasker.vue';

const IMAGE_SIZE = 128;

export default {
	components: {
		ImageUploader,
		ImageMasker
	},
	data() {
		return {
			imageSize: IMAGE_SIZE,
			imageUrl: null
		};
	},
	methods: {
		onImageUpload(url) {
			this.imageUrl = url;
		}
	}
};
</script>

<style lang="scss">

.Maskify {
	width: 85%;
	margin: 2rem 7.5%;

	&__summary {
		margin-bottom: 2rem;
	}

}
</style>
