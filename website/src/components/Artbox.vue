<template>
	<div class="Artbox">

		<canvas
			class="Artbox__canvas"
			ref="canvas"
			:width="width"
			:height="height"/>

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

// thanks Stack Overflow! https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
function rotatePoint(cx, cy, x, y, angle) {
	const radians = (Math.PI / 180) * angle;
	const cos = Math.cos(radians);
	const sin = Math.sin(radians);
	const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
	const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
	return [nx, ny];
}

export default {
	props: {
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
			loadedMask1: false,
			width: 0,
			height: 0
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
		async render() {
			if (!this.ready) return;
			await this.$nextTick();
			this.drawOriginal();
			this.masks.forEach(mask => {
				this.drawMask(mask);
			});
		},
		rotateContext(angleDegrees) {
			this.context.translate(this.width / 2, this.height / 2);
			this.context.rotate(angleDegrees * Math.PI / 180);
			this.context.translate(-this.width / 2, -this.height / 2);
		},
		yFlipContext() {
			this.context.scale(-1, 1);
		},
		drawOriginal() {
			this.context.drawImage(
				this.$refs.original,
				0,
				0,
				this.width,
				this.height
			);
		},
		drawMask(mask) {
			const { height } = mask;
			let { leftOffset, topOffset, width } = mask;
			this.context.save();
			if (mask.rotationDeg) {
				[leftOffset, topOffset] = rotatePoint(this.width / 2, this.height / 2, leftOffset, topOffset, mask.rotationDeg);
				this.rotateContext(mask.rotationDeg);
			}
			if (mask.flip) {
				this.context.scale(-1, 1);
				width *= -1;
				leftOffset *= -1;
			}
			leftOffset -= width / 2;
			topOffset -= height / 2;
			this.context.drawImage(
				this.$refs[mask.ref],
				leftOffset,
				topOffset,
				width,
				height
			);
			this.context.restore();
		}
	},
	mounted() {
		this.context = this.$refs.canvas.getContext('2d');
		this.$refs.original.onload = () => {
			this.width = this.$refs.original.width;
			this.height = this.$refs.original.height;
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
