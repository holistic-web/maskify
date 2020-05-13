<template>
	<div class="Artbox">

		<canvas
			class="Artbox__canvas"
			ref="canvas"
			:width="imageSize"
			:height="imageSize"/>

		<!-- The following elements are not visible to the user -->
		<img
			ref="original"
			class="Artbox__hidden"
			:src="url"/>
		<img
			ref="mask1"
			class="Artbox__hidden"
			src="../assets/mask1.png"/>
		<img
			ref="mask2"
			class="Artbox__hidden"
			src="../assets/mask2.png"/>

	</div>
</template>

<script>
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
		masks: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			context: null,
			loadedOriginal: false,
			loadedMask1: false
		};
	},
	computed: {
		ready() {
			if (!this.loadedOriginal) return false;
			if (!this.loadedMask1) return false;
			return true;
		}
	},
	methods: {
		render() {
			if (!this.ready) return;
			this.drawOriginal();
			this.masks.forEach(mask => {
				this.drawMask(mask);
			});
		},
		rotateContext(angleDegrees) {
			this.context.translate(this.imageSize / 2, this.imageSize / 2);
			this.context.rotate(+angleDegrees * Math.PI / 180);
			this.context.translate(-this.imageSize / 2, -this.imageSize / 2);
		},
		yFlipContext() {
			this.context.translate(this.imageSize, 0);
			this.context.scale(-1, 1);
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
			if (mask.rotationDeg) this.rotateContext(-mask.rotationDeg);
			if (mask.flip) this.yFlipContext();
			const leftOffset = this.imageSize * (mask.leftOffset - 0.5 * mask.width);
			const topOffset = this.imageSize * (mask.topOffset - 0.5 * mask.height);
			this.context.drawImage(
				this.$refs[mask.ref],
				leftOffset,
				topOffset,
				this.imageSize * mask.width,
				this.imageSize * mask.height
			);
			if (mask.rotationDeg) this.rotateContext(mask.rotationDeg);
			if (mask.flip) this.yFlipContext();
		}
	},
	mounted() {
		this.context = this.$refs.canvas.getContext('2d');
		this.$refs.original.onload = () => {
			this.loadedOriginal = true;
		};
		this.$refs.mask1.onload = () => {
			this.loadedMask1 = true;
		};
	},
	watch: {
		ready: 'render'
	}
};
</script>

<style lang="scss">

.Artbox {

	&__canvas {
		width: 100%;
	}

	&__hidden {
		display: none;
	}
}

</style>
