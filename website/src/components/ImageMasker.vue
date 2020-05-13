<template>
	<div class="ImageMasker">
		<h3 class="ImageMasker__title">Final Adjustments:</h3>

		<section class="ImageMasker__content">

			<artbox
				ref="artbox"
				class="ImageMasker__canvas"
				:imageSize="imageSize"
				:masks="masks"
				:url="url"/>

			<section class="ImageMasker__controls">

				<mask-options
					v-model="masks[0]"
					:imageSize="imageSize"
					@input="onValueChange"/>

			</section>

		</section>

	</div>
</template>

<script>
import Artbox from './Artbox.vue';
import MaskOptions from './MaskOptions.vue';

export default {
	components: {
		Artbox,
		MaskOptions
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
			masks: [
				{
					ref: 'mask1',
					leftOffset: 0.5,
					topOffset: 0.5,
					width: 0.5,
					height: 0.3,
					rotationDeg: 0
				}
			]
		};
	},
	methods: {
		onValueChange() {
			this.$refs.artbox.render();
		}
	},
	async mounted() {
		this.$refs.artbox.render();
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

}
</style>
