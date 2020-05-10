<template>
	<div class="ImageUploader">
		<h3 class="ImageUploader__title">Upload an image</h3>

		<el-error
			v-if="error"
			class="ImageUploader__error"
			:message="error"/>

		<image-uploader
			class="ImageUploader__uploader"
			:maxWidth="512"
			:maxHeight="512"
			:quality="0.9"
			:autoRotate=true
			:preview=true
			:capture="true"
			@input="onInput"/>
	</div>
</template>

<script>
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import ImageUploader from 'vue-image-upload-resize';
import { ElError } from '@holistic-web/el-layout';

export default {
	components: {
		ImageUploader,
		ElError
	},
	data() {
		return {
			error: null
		};
	},
	methods: {
		async onInput(image) {
			try {
				const id = uuid();
				const imageRef = firebase.storage().ref().child(id);
				await imageRef.putString(image);
				this.$emit('uploaded', id);
			} catch (err) {
				this.error = err.message;
			}
		}
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

	&__error {
		margin-bottom: 1rem;
	}

	&__uploader {

		.img-preview {
			margin-right: 1rem;
		}

	}
}

</style>
