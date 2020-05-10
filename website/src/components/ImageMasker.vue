<template>
	<div class="ImageMasker">
		<h3 class="ImageMasker__title">Final Adjustments:</h3>

		<canvas
			ref="canvas"
			:width="imageSize"
			:height="imageSize"/>

		<!-- The following elements are not visible to the user -->
		<img
			ref="original"
			class="ImageMasker__hidden"
			:src="url"/>

		<img
			ref="mask1"
			class="ImageMasker__hidden"
			src="../assets/mask1.png"/>

	</div>
</template>

<script>
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

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
	},
	data() {
		return {
			context: null,
			originalDrawn: false
		};
	},
	methods: {
		setupOriginal() {
			this.$refs.original.onload = () => {
				this.context.drawImage(
					this.$refs.original,
					0,
					0,
					this.imageSize,
					this.imageSize
				);
				this.originalDrawn = true;
			};
		},
		addMask(mask) {
			const defaults = {
				leftOffsetScale: 0.3,
				topOffsetScale: 0.4,
				widthScale: 0.5,
				heightScale: 0.2
			};
			mask.onload = async () => {
				// try every half second for 10 seconds, until image is loaded
				const retries = 20;
				const pollTime = 500;
				for (let i = 0; i < retries; i++) {
					await sleep(pollTime); // eslint-disable-line no-await-in-loop
					if (this.originalDrawn) {
						this.context.drawImage(
							mask,
							this.imageSize * defaults.leftOffsetScale,
							this.imageSize * defaults.topOffsetScale,
							this.imageSize * defaults.widthScale,
							this.imageSize * defaults.heightScale
						);
						break;
					}
				}
				throw new Error('Error adding mask to original, original was not drawn.');
			};
		}
	},
	mounted() {
		this.context = this.$refs.canvas.getContext('2d');
		this.setupOriginal();
		this.addMask(this.$refs.mask1);
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

	&__hidden {
		display: none;
	}

}
</style>
