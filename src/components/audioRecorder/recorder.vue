<style lang="scss">
.parent {
	display: flex;
	margin-bottom: 10px;
}
.child {
	flex: 1;
}
.ar {
	// 배경 네모박스
	width: 100%;
	height: 100%;
	font-family: 'Roboto', sans-serif;
	border-radius: 16px;
	background-color: #fafafa;
	box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);
	position: relative;
	box-sizing: content-box;

	&-content {
		//버튼 위치
		padding: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}

	&-records {
		//녹음 후 해시태그 받을
		height: 0px;
		padding-top: 1px;
		overflow-y: auto;
		margin-bottom: 20px;

		&__record {
			width: 350px;
			height: 190px;
			padding: 0 10px;
			margin: 0 auto;
			line-height: 45px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #e8e8e8;
			position: relative;

			&--selected {
				border: 1px solid #e8e8e8;
				border-radius: 24px;
				background-color: #ffffff;
				margin-top: -1px;
				padding: 0 34px;
			}
		}
	}

	&-recorder {
		margin-top: 10px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		&__duration {
			color: #aeaeae;
			font-size: 32px;
			font-weight: 500;
			margin-top: 10px;
			margin-bottom: 10px;
		}

		&__stop {
			//스탑 버튼
			position: absolute;
			top: 10px;
			right: -120px;
		}

		&__time-limit {
			position: absolute;
			color: #aeaeae;
			font-size: 12px;
			top: 128px;
		}

		&__records-limit {
			position: absolute;
			color: #aeaeae;
			font-size: 13px;
			top: 78px;
		}
	}

	&-spinner {
		display: flex;
		height: 30px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 144px;
		z-index: 10;

		&__dot {
			display: block;
			margin: 0 8px;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			background: #0d5932;
			animation-name: blink;
			animation-duration: 1.4s;
			animation-iteration-count: infinite;
			animation-fill-mode: both;

			@keyframes blink {
				0% {
					opacity: 0.2;
				}
				20% {
					opacity: 1;
				}
				100% {
					opacity: 0.2;
				}
			}
		}
	}

	&__text {
		color: rgba(84, 84, 84, 0.5);
		font-size: 16px;
	}

	&__blur {
		filter: blur(2px);
		opacity: 0.7;
	}

	&__overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	&__upload-status {
		text-align: center;
		font-size: 10px;
		padding: 2px;
		letter-spacing: 1px;
		position: absolute;
		bottom: 0;

		&--success {
			color: rgba(9, 92, 9, 0.678);
		}

		&--fail {
			color: red;
		}
	}

	&__rm {
		cursor: pointer;
		position: absolute;
		width: 6px;
		height: 6px;
		padding: 6px;
		line-height: 6px;
		margin: auto;
		left: 10px;
		bottom: 0;
		top: 0;
		color: rgb(244, 120, 90);
	}

	&__uploader {
		color: #095c09ad;
		right: 0px;
		left: 50px;
	}

	&__cl {
		color: rgba(9, 92, 9, 0.678);
		right: 0px;
		left: 50px;
	}
}

@import './icons';
</style>

<template>
	<div class="ar">
		<div class="ar__overlay" v-if="isUploading"></div>
		<div class="ar-spinner" v-if="isUploading">
			<div class="ar-spinner__dot"></div>
			<div class="ar-spinner__dot"></div>
			<div class="ar-spinner__dot"></div>
		</div>

		<div class="ar-content" :class="{ ar__blur: isUploading }">
			<div class="ar-recorder">
				<icon-button
					class="ar-icon ar-icon__lg"
					:name="iconButtonType"
					v-if="!recordList"
					:class="{
						'ar-icon--rec': isRecording,
						'ar-icon--pulse': isRecording && volume > 0.02,
					}"
					@click="toggleRecorder"
				/>
				<icon-button
					class="ar-icon ar-icon__sm ar-recorder__stop"
					name="stop"
					v-if="!recordList"
					@click="stopRecorder"
				/>
			</div>

			<div class="audio_recorded">
				<audio-player
					:src="recordList[0].url"
					:record="recordList[0]"
					v-if="recordList"
				/>
			</div>

			<div class="ar-recorder__duration" v-if="!recordList">
				{{ recordedTime }}
			</div>
			<!--얘가 문제-->
			<!-- <div class="ar-records">
				<div
					class="ar-records__record"
					:class="{ 'ar-records__record--selected': record.id }"
					:key="record.id"
					v-for="record in recordList"
					@click="choiceRecord(record)"
				>
					<div class="ar__text">해시태그, 핵심키워드들</div>
					<div class="ar__emo">감정 이모티콘</div>
				</div>
			</div> -->
			<div class="parent">
				<uploader
					v-for="(record, idx) in recordList"
					:key="idx"
					class="ar__uploader"
					:record="record"
					:filename="filename"
					:headers="headers"
					:upload-url="uploadUrl"
					@close-modal="closeModal"
					@insert-babble="insertNewBabble"
				/>&nbsp;&nbsp;&nbsp;&nbsp;
				<div
					class="child"
					v-for="(record, idx) in recordList"
					:key="idx"
					@click="reset"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="50"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#ff6b64"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
						/>
						<path d="M14 3v5h5M9.9 17.1L14 13M9.9 12.9L14 17" />
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AudioPlayer from './player.vue';
import IconButton from './icon-button.vue';
import Recorder from './recorder.js';
import Uploader from './uploader.vue';
import UploaderPropsMixin from './uploader-props.js';
import { convertTimeMMSS } from './utils.js';

export default {
	mixins: [UploaderPropsMixin],
	props: {
		time: { type: Number },
		bitRate: { type: Number, default: 128 },
		sampleRate: { type: Number, default: 48000 },
		showUploadButton: { type: Boolean, default: true },

		micFailed: { type: Function },
		beforeRecording: { type: Function },
		pauseRecording: { type: Function },
		afterRecording: { type: Function },
		failedUpload: { type: Function },
		beforeUpload: { type: Function },
		successfulUpload: { type: Function },
		selectRecord: { type: Function },
	},
	data() {
		return {
			isUploading: false,
			recorder: this._initRecorder(),
			recordList: null,
			selected: {},
			uploadStatus: null,
		};
	},
	components: {
		AudioPlayer,
		IconButton,
		Uploader,
	},
	beforeDestroy() {
		this.stopRecorder();
	},
	methods: {
		reset() {
			console.log(123);
			Object.assign(this.$data, this.$options.data.call(this));
		},
		toggleRecorder() {
			if (this.recorder.records.length >= this.attempts) {
				return;
			}
			if (!this.isRecording || (this.isRecording && this.isPause)) {
				this.recorder.start();
			} else {
				this.recorder.pause();
			}
		},
		stopRecorder() {
			if (!this.isRecording) {
				return;
			}

			this.recorder.stop();
			this.recordList = this.recorder.recordList();
		},
		choiceRecord(record) {
			if (this.record === record) {
				return;
			}
			this.selected = record;
			this.selectRecord(record);
		},
		_initRecorder() {
			return new Recorder({
				beforeRecording: this.beforeRecording,
				afterRecording: this.afterRecording,
				pauseRecording: this.pauseRecording,
				micFailed: this.micFailed,
				bitRate: this.bitRate,
				sampleRate: this.sampleRate,
				format: this.format,
			});
		},
		closeModal: function () {
			this.$emit('close-modal');
		},
		insertNewBabble: function (babble) {
			this.reset();
			console.log(babble);
			this.$emit('insert-babble', babble);
		},
	},
	computed: {
		attemptsLeft() {
			return this.attempts - this.recordList.length;
		},
		iconButtonType() {
			return this.isRecording && this.isPause
				? 'mic'
				: this.isRecording
				? 'pause'
				: 'mic';
		},
		isPause() {
			return this.recorder.isPause;
		},
		isRecording() {
			return this.recorder.isRecording;
		},
		recordedTime() {
			if (this.time && this.recorder.duration >= this.time * 60) {
				this.stopRecorder();
			}
			return convertTimeMMSS(this.recorder.duration);
		},
		volume() {
			return parseFloat(this.recorder.volume);
		},
	},
};
</script>
