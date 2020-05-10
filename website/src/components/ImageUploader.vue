<template>
	<div class="ImageUploader">
		<h3 class="ImageUploader__title">Select an image:</h3>

		<el-error
			v-if="error"
			class="ImageUploader__error"
			:message="error"/>

		<section class="ImageUploader__inputs">
			<image-uploader
				class="ImageUploader__uploader"
				:maxWidth="imageSize"
				:maxHeight="imageSize"
				:quality="0.9"
				:autoRotate=true
				:preview=false
				:capture="true"
				@input="onInput"/>

			<div v-if="!localImage" class="ImageUploader__url">
				<b-form-input
					v-model="url"
					placeholder="or enter an image url"/>
				<b-btn
					v-text="'Next'"
					:disabled="!url"
					@click="$emit('uploaded', url)"/>
			</div>
		</section>


	</div>
</template>

<script>
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import { ElError } from '@holistic-web/el-layout';
import ImageUploader from 'vue-image-upload-resize';

export default {
	components: {
		ElError,
		ImageUploader
	},
	props: {
		imageSize: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			error: null,
			localImage: false,
			url: ''
		};
	},
	methods: {
		async onInput(image) {
			try {
				this.localImage = true;
				const id = `${uuid()}`;
				const imageRef = firebase.storage().ref().child(id);
				await imageRef.putString(image, 'data_url');
				const url = await imageRef.getDownloadURL();
				this.$emit('uploaded', url);
			} catch (err) {
				this.localImage = false;
				this.error = err.message;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@holistic-web/el-layout/src/styles/theme';

$spacing: 2rem;

.ImageUploader {
	display: flex;
	flex-direction: column;

	&__title {
		color: $primary;
		margin-bottom: $spacing;
	}

	&__error {
		margin-bottom: $spacing;
	}

	&__inputs {
		margin-bottom: $spacing;
		display: flex;
		flex-direction: row;
	}

	&__uploader {

		.img-preview {
			margin-right: 1rem;
		}

	}

	&__url {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
}

</style>
