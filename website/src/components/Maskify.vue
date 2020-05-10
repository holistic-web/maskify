<template>
	<div class="Maskify">

		<p class="Maskify__summary">
			A key tool in our fight against the coronavirus...
		</p>

		<image-uploader/>
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
			progress: {
				imageAdded: false
			}
		};
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
