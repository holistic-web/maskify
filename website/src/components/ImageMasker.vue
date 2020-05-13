<template>
	<div class="ImageMasker">
		<h3 class="ImageMasker__title">Final Adjustments:</h3>

		<section class="ImageMasker__content">

			<canvas
				class="ImageMasker__canvas"
				ref="canvas"
				:width="imageSize"
				:height="imageSize"/>

			<section class="ImageMasker__controls">

				<mask-position
					v-model="mask"
					:imageSize="imageSize"
					@input="onValueChange"/>

			</section>

		</section>

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
import MaskPosition from './MaskPosition.vue';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
	components: {
		MaskPosition
	},
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
			type: Object,
			requied: true
		}
	},
	data() {
		return {
			context: null,
			originalDrawn: false,
			mask: {
				leftOffset: 0.5,
				topOffset: 0.5,
				width: 0.5,
				height: 0.3,
				rotationDeg: 0
			}
		};
	},
	methods: {
		rotateContext(angleDegrees) {
			this.context.translate(this.imageSize / 2, this.imageSize / 2);
			this.context.rotate(+angleDegrees * Math.PI / 180);
			this.context.translate(-this.imageSize / 2, -this.imageSize / 2);
		},
		drawOriginal() {
			this.context.drawImage(
				this.$refs.original,
				0,
				0,
				this.imageSize,
				this.imageSize
			);
		},
		drawMask(mask) {
			if (this.mask.rotationDeg) this.rotateContext(-this.mask.rotationDeg);
			const leftOffset = this.imageSize * (this.mask.leftOffset - 0.5 * this.mask.width);
			const topOffset = this.imageSize * (this.mask.topOffset - 0.5 * this.mask.height);
			this.context.drawImage(
				this.$refs[mask],
				leftOffset,
				topOffset,
				this.imageSize * this.mask.width,
				this.imageSize * this.mask.height
			);
			if (this.mask.rotationDeg) this.rotateContext(this.mask.rotationDeg);
		},
		onValueChange() {
			this.context.clearRect(0, 0, this.imageSize, this.imageSize);
			this.drawOriginal();
			this.drawMask('mask1');
		}
	},
	async mounted() {
		this.context = this.$refs.canvas.getContext('2d');
		this.$refs.original.onload = () => {
			this.drawOriginal();
			this.originalDrawn = true;
		};
		// try every half second for 10 seconds, until image is loaded
		const retries = 20;
		const pollTime = 500;
		for (let i = 0; i < retries; i++) {
			await sleep(pollTime); // eslint-disable-line no-await-in-loop
			if (this.originalDrawn) {
				return this.drawMask('mask1');
			}
		}
		throw new Error('Error adding mask to original, original was not drawn.');
	}
};

</script>

<style lang="scss">
@import '@holistic-web/el-layout/src/styles/theme';

$spacing: 2rem;

.ImageMasker {

	&__title {
		color: $primary;
		margin-bottom: $spacing;
	}

	&__content {
		display: flex;
		flex-direction: row;
	}

	&__canvas {
		width: 50%;
	}

	&__controls {
		display: flex;
		flex-direction: column;
		width: 50%;
		padding: 1rem;
	}

	&__hidden {
		display: none;
	}

}
</style>
