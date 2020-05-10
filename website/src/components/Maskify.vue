<template>
	<div class="Maskify">

		<p class="Maskify__summary">
			A key tool in our fight against the coronavirus...
		</p>

		<image-uploader
			v-if="!imageUrl"
			class="Maskify__uploader"
			@uploaded="onImageUpload"/>

		<img
			v-if="imageUrl"
			class="Maskify__original"
			:src="imageUrl"/>
	</div>
</template>

<script>
import ImageUploader from './ImageUploader.vue';

export default {
	components: {
		ImageUploader
	},
	data() {
		return {
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

	&__uploader {
		margin-bottom: 1rem;
	}

	&__original {
		width: 128px;
		height: 128px;
	}
}
</style>
