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

				<b-form-group
					label="Left Offset"
					label-for="leftOffset">
					<b-form-input
						id="leftOffset"
						v-model="mask.leftOffset"
						type="range"
						min="0"
						max="1"
						step="0.05"
						@input="onValueChange"/>
				</b-form-group>

				<b-form-group
					label="Top Offset"
					label-for="topOffset">
					<b-form-input
						id="topOffset"
						v-model="mask.topOffset"
						type="range"
						min="0"
						max="1"
						step="0.05"
						@input="onValueChange"/>
				</b-form-group>

				<b-form-group
					label="Width"
					label-for="width">
					<b-form-input
						id="width"
						v-model="mask.width"
						type="range"
						min="0"
						max="1"
						step="0.05"
						@input="onValueChange"/>
				</b-form-group>

				<b-form-group
					label="Height"
					label-for="height">
					<b-form-input
						id="height"
						v-model="mask.height"
						type="range"
						min="0"
						max="1"
						step="0.05"
						@input="onValueChange"/>
				</b-form-group>

				<b-form-group
					label="Rotation"
					label-for="rotation">
					<b-form-input
						id="rotation"
						v-model="mask.rotationDeg"
						type="range"
						min="0"
						max="360"
						step="1"
						@input="onValueChange"/>
				</b-form-group>

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
			originalDrawn: false,
			mask: {
				leftOffset: 0.3,
				topOffset: 0.4,
				width: 0.5,
				height: 0.2,
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
			this.context.drawImage(
				this.$refs[mask],
				this.imageSize * this.mask.leftOffset,
				this.imageSize * this.mask.topOffset,
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
