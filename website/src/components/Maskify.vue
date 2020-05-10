<template>
	<div class="Maskify">

		<p class="Maskify__summary">
			A key tool in our fight against the coronavirus. Check us out on <a href="https://github.com/holistic-web/maskify">Github</a>!
		</p>

		<image-uploader
			v-if="!imageUrl"
			:imageSize="imageSize"
			@uploaded="onImageUpload"/>

		<span v-if="imageUrl && !imageData">
			Processing...
		</span>

		<image-masker
			v-if="imageData"
			:imageSize="imageSize"
			:url="imageUrl"
			:data="imageData"/>
	</div>
</template>

<script>
import firebase from 'firebase';
import ImageUploader from './ImageUploader.vue';
import ImageMasker from './ImageMasker.vue';

const IMAGE_SIZE = 512;

export default {
	components: {
		ImageUploader,
		ImageMasker
	},
	data() {
		return {
			imageSize: IMAGE_SIZE,
			imageUrl: null,
			imageData: null
		};
	},
	methods: {
		async onImageUpload(url) {
			this.imageUrl = url;
			const getFacialRecognitionData = firebase.functions().httpsCallable('getFacialRecognitionData');
			const { data } = await getFacialRecognitionData(url);
			this.imageData = data;
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
