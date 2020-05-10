<template>
	<div class="Maskify">

		<p class="Maskify__summary">
			A key tool in our fight against the coronavirus...
		</p>

		<image-uploader
			class="Maskify__uploader"
			@uploaded="onImageUpload"/>

		<p v-if="imageId">
			Image ID is: "{{imageId}}".
		</p>
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
			imageId: null
		};
	},
	methods: {
		onImageUpload(id) {
			console.log('id: ', id);
			this.imageId = id;
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
}
</style>
