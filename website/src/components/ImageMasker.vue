<template>
	<div class="ImageMasker">
		<h3 class="ImageMasker__title">Adjustments:</h3>

		<section class="ImageMasker__content">

			<artbox
				ref="artbox"
				class="ImageMasker__canvas"
				:imageSize="imageSize"
				:masks="masks"
				:url="url"/>

			<b-tabs class="ImageMasker__controls" v-model="tabIndex">
				<b-tab title="Add Mask" class="ImageMasker__controls__tab">
					<b-btn size="lg" v-text="'Add'" @click="addMask"/>
				</b-tab>
				<b-tab
					class="ImageMasker__controls__tab"
					v-for="(mask, i) in masks"
					:key="i"
					:title="`Mask ${i+1}`">

					<mask-options
						v-model="masks[i]"
						:imageSize="imageSize"
						@input="onValueChange"
						@delete="onMaskDelete(i)"/>

				</b-tab>
			</b-tabs>

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
			masks: [],
			tabIndex: 0
		};
	},
	methods: {
		addMask() {
			this.masks.push({
				ref: 'mask1',
				flip: false,
				leftOffset: 0.5,
				topOffset: 0.5,
				width: 0.5,
				height: 0.3,
				rotationDeg: 0
			});
			this.$refs.artbox.render();
		},
		async onMaskDelete(i) {
			this.masks = this.masks.splice(i, -1);
			await this.$nextTick();
			this.$refs.artbox.render();
		},
		onValueChange() {
			this.$refs.artbox.render();
		}
	},
	async mounted() {
		this.$refs.artbox.render();
		this.data.faceAnnotations.forEach(face => {
			const rightOfRightEyebrow = face.landmarks.find(landmark => landmark.type === 'RIGHT_OF_RIGHT_EYEBROW').position;
			const leftOfLeftEyebrow = face.landmarks.find(landmark => landmark.type === 'LEFT_OF_LEFT_EYEBROW').position;
			const chinGnathion = face.landmarks.find(landmark => landmark.type === 'CHIN_GNATHION').position;
			const noseTip = face.landmarks.find(landmark => landmark.type === 'NOSE_TIP').position;
			const mouthCenter = face.landmarks.find(landmark => landmark.type === 'MOUTH_CENTER').position;

			const width = (((rightOfRightEyebrow.x - leftOfLeftEyebrow.x) ^ 2 + (rightOfRightEyebrow.y - leftOfLeftEyebrow.y) ^ 2) ^ 0.5) * 1.5 / this.imageSize;
			const height = (((chinGnathion.x - noseTip.x) ^ 2 + (chinGnathion.y - noseTip.y) ^ 2) ^ 0.5) * 1.5 / this.imageSize;
			const leftOffset = mouthCenter.x / this.imageSize;
			const topOffset = mouthCenter.y / this.imageSize;
			const rotationDeg = -face.rollAngle;
			this.masks.push({
				ref: 'mask1',
				flip: false,
				width,
				height,
				leftOffset,
				topOffset,
				rotationDeg
			});
		});
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
		height: 100%;
		padding: 1rem;

		&__tab {
			display: flex;
			padding: 0.5rem;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
		}
	}

}
</style>
