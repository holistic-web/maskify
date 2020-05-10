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
						v-model="maskSizing.leftOffset"
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
						v-model="maskSizing.topOffset"
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
						v-model="maskSizing.width"
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
						v-model="maskSizing.height"
						type="range"
						min="0"
						max="1"
						step="0.05"
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
			// type: String,
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
			maskSizing: {
				leftOffset: 0.3,
				topOffset: 0.4,
				width: 0.5,
				height: 0.2
			}
		};
	},
	methods: {
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
			this.context.drawImage(
				this.$refs[mask],
				this.imageSize * this.maskSizing.leftOffset,
				this.imageSize * this.maskSizing.topOffset,
				this.imageSize * this.maskSizing.width,
				this.imageSize * this.maskSizing.height
			);
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
