<template>
	<div class="MaskPosition">
		<input-slider
			:label="xLabel"
			v-model="newMask.leftOffset"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			:label="yLabel"
			v-model="newMask.topOffset"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			:label="widthLabel"
			v-model="newMask.width"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			:label="heightLabel"
			v-model="newMask.height"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			:label="rotationLabel"
			v-model="newMask.rotationDeg"
			min="0"
			max="360"
			step="1"
			@input="onValueChange"/>
	</div>
</template>

<script>
import InputSlider from './InputSlider.vue';

/**
 * MaskPosition is a component to control the positioning of a mask.
 *
 * The value object should look like:
 * {
 * 	leftOffset: 0 - 1,
* 	topOffset: 0 - 1,
* 	width: 0 - 1,
* 	height: 0 - 1,
* 	rotationDeg: 0 - 360,
 * }
 */

export default {
	components: {
		InputSlider
	},
	props: {
		value: {
			type: Object,
			required: true
		},
		imageSize: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			newMask: null,
			stepSize: '0.01'
		};
	},
	computed: {
		xLabel() {
			const xPos = this.newMask.leftOffset * this.imageSize;
			return `X Position: ${xPos}`;
		},
		yLabel() {
			const yPos = this.newMask.topOffset * this.imageSize;
			return `Y Position: ${yPos}`;
		},
		widthLabel() {
			const width = this.newMask.width * this.imageSize;
			return `Width: ${width}`;
		},
		heightLabel() {
			const height = this.newMask.height * this.imageSize;
			return `Height: ${height}`;
		},
		rotationLabel() {
			return `Rotation (degrees): ${this.newMask.rotationDeg}`;
		}
	},
	methods: {
		copyMask() {
			this.newMask = {
				leftOffset: `${this.value.leftOffset}`,
				topOffset: `${this.value.topOffset}`,
				width: `${this.value.width}`,
				height: `${this.value.height}`,
				rotationDeg: `${this.value.rotationDeg}`
			};
		},
		onValueChange() {
			this.$emit('input', this.newMask);
		}
	},
	watch: {
		mask: {
			deep: true,
			immediate: true,
			handler: 'copyMask'
		}
	}
};
</script>
