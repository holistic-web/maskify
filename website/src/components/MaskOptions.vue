<template>
	<div class="MaskOptions">

		<div class="MaskOptions__mask MaskOptions__input">
			<b-form-group
				label="Select a mask"
				label-for="mask-selector">
				<b-form-radio-group
					id="mask-selector"
					v-model="newMask.ref"
					@input="onValueChange">
					<b-form-radio value="mask1">
						<img
							class="MaskOptions__preview"
							src="../assets/mask1.png"/>
					</b-form-radio>
					<b-form-radio value="mask2">
						<img
							class="MaskOptions__preview"
							src="../assets/mask2.png"/>
					</b-form-radio>
				</b-form-radio-group>
			</b-form-group>

			<b-form-group
				label="Appearance"
				label-for="mask-appearance">
				<b-form-radio-group
					id="mask-appearance"
					v-model="newMask.flip"
					size="sm"
					buttons
					@input="onValueChange">
					<b-form-radio :value="false">Normal</b-form-radio>
					<b-form-radio :value="true">Flipped</b-form-radio>
				</b-form-radio-group>
			</b-form-group>
		</div>


		<input-slider
			class="MaskOptions__input"
			:label="xLabel"
			v-model="newMask.leftOffset"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			class="MaskOptions__input"
			:label="yLabel"
			v-model="newMask.topOffset"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			class="MaskOptions__input"
			:label="widthLabel"
			v-model="newMask.width"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			class="MaskOptions__input"
			:label="heightLabel"
			v-model="newMask.height"
			min="0"
			max="1"
			:step="stepSize"
			@input="onValueChange"/>

		<input-slider
			class="MaskOptions__input"
			:label="rotationLabel"
			v-model="newMask.rotationDeg"
			min="0"
			max="360"
			step="1"
			@input="onValueChange"/>

		<b-btn
			size="sm"
			variant="danger"
			v-text="'Remove mask'"
			@click="$emit('delete')"/>
	</div>
</template>

<script>
import InputSlider from './InputSlider.vue';

/**
 * MaskOptions is a component to control the positioning of a mask.
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
				ref: 'mask1',
				flip: false,
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

<style lang="scss">

.MaskOptions {

	&__preview {
		width: 75px;
	}

	&__input {
		margin-bottom: 0.5rem !important;
	}

	&__mask {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
}
</style>
