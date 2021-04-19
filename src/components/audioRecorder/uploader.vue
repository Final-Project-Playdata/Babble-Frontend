<style lang="scss">
@import './icons';
</style>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="50"
		height="50"
		viewBox="0 0 24 24"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="ar-icon ar-icon__xs ar-icon--no-border"
		@click="upload"
	>
		<path d="M0 0h24v24H0z" fill="none" />
		<path
			d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
		/>
	</svg>
</template>
z

<script>
import UploaderPropsMixin from './uploader-props.js';
import { saveAudio } from '../../api/babbleSteam.js';
import { checkAudio } from '../../api/babbleFlask.js';
import { insertBabble } from '../../api/babble.js';
import IconButton from './icon-button.vue';
import store from '../../store/index.js';
export default {
	mixins: [UploaderPropsMixin],
	props: {
		record: { type: Object },
	},
	components: {
		IconButton,
	},
	setup(props, { emit }) {
		const getImageName = () => {
			let date = new Date();
			let name = `${store.state.user.username}.${date.getFullYear()}-${
				date.getMonth() + 1
			}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.wav`;
			return name;
		};

		const upload = async () => {
			if (!props.record.url) {
				return;
			}

			props.record.blob = new File([props.record.blob], getImageName(), {
				type: props.record.blob.type,
				lastModified: props.record.blob.lastModified,
			});

			const data = new FormData();
			data.append('audio', props.record.blob);

			saveAudio(data);

			const babble = {
				fileUrl: props.record.blob.name,
				tags: ['test1', 'test2', 'test3'],
			};
			// let newBabble = await insertBabble(babble);
			// newBabble.data.user.avatar = `http://localhost:88/image/${newBabble.data.user.avatar}`;
			console.log(1);
			let check = await checkAudio(data);
			console.log(check);
			console.log(2);
			// emit('insert-babble', newBabble.data);
			// emit('close-modal');
		};

		return { upload, getImageName };
	},
};
</script>
