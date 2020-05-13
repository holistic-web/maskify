<template>
	<b-form-group
		:label="label"
		:label-for="id">
		<b-form-input
			:id="id"
			:value="value"
			type="range"
			:min="min"
			:max="max"
			:step="step"
			@input="onInput"/>
	</b-form-group>
</template>

<script>
export default {
	props: {
		label: {
			type: String || Number,
			required: true
		},
		value: {
			type: String || Number,
			required: true
		},
		min: {
			type: String || Number,
			required: true
		},
		max: {
			type: String || Number,
			required: true
		},
		step: {
			type: String || Number,
			required: true
		}
	},
	computed: {
		id() {
			return `InputSlider__${this.label}`;
		}
	},
	methods: {
		onInput(newValue) {
			this.$emit('input', newValue);
		}
	}
};
</script>
