<template>
	<!-- babbles -->
	<div
		class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
	>
		<router-link :to="`/profile/${babble.user.id}`">
			<img
				v-if="babble.user.avatar.slice(-4) !== 'null'"
				:src="babble.user.avatar"
				class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
			/>
			<img
				v-else
				src="../image/defaultProfile.png"
				class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
			/>
		</router-link>
		<div class="ml-3 flex-1 flex flex-col space-y-1">
			<div v-if="isRebabblePost">
				Rebabbleed by {{ babble.rebabbleUser.username }}
			</div>
			<div class="text-sm flex justify-between items-center">
				<router-link :to="`/babble/${babble.id}`">
					<div class="space-x-1">
						<span class="font-bold">{{ babble.user.username }}</span>
						<span class="text-gray-500 text-xs"
							>@{{ babble.user.nickname }}</span
						>
						<span>·</span>
						<span class="text-gray-500 text-xs">{{
							moment(babble.regDate).fromNow()
						}}</span>
					</div>
				</router-link>
				<button
					v-if="currentUser.id === babble.user.id"
					@click="onDeleteBabble(babble.id)"
				>
					<i
						class="fas fa-trash text-red-400 p-2 rounded-full hover:bg-red-50"
					></i>
				</button>
			</div>
			<!-- tag -->
			<div>
				<span v-for="tag in babble.tags" :key="tag">
					<router-link :to="`/${tag}`">
						#{{ tag }}&nbsp;&nbsp;</router-link
					></span
				>
			</div>
			<!-- babble body -->
			<audio-player :audioUrl="babble.fileUrl"></audio-player>
			<!-- babble actions -->
			<div class="flex justify-between">
				<!-- comment button -->
				<div
					@click="showCommentModal = true"
					class="text-gray-500 hover:text-primary"
				>
					<i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ commentCount }}</span>
				</div>
				<!-- rebabble button -->
				<div
					v-if="!isRebabbleed"
					class="text-gray-500 hover:text-green-400"
					@click="onInsertRebabble(babble)"
				>
					<i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ rebabbleCount }}</span>
				</div>
				<div v-else class="text-green-400" @click="onDeleteRebabble(babble)">
					<i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ rebabbleCount }}</span>
				</div>
				<!-- like button -->
				<div
					v-if="!isLiked"
					class="text-gray-400 hover:text-red-400"
					@click="handleLike(babble.id)"
				>
					<i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ likeCount }}</span>
				</div>
				<div v-else class="text-red-400" @click="handleUnlike(babble.id)">
					<i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ likeCount }}</span>
				</div>
				<!-- share button -->
				<div class="text-gray-500 hover:text-primary"></div>
			</div>
		</div>
		<comment-modal
			:babble="babble"
			v-if="showCommentModal"
			@close-modal="(showCommentModal = false), commentCount++"
		></comment-modal>
	</div>
</template>

<script>
import moment from 'moment';
import { ref } from 'vue';
import CommentModal from './CommentModal.vue';
import { deleteBabble, insertRebabble, like, unlike } from '../api/babble';
import AudioPlayer from './AudioPlayer.vue';

export default {
	components: { CommentModal, AudioPlayer },
	props: ['currentUser', 'babble'],
	data: function () {
		return {
			commentCount: this.babble.comments.length,
			likeCount: this.babble.likes.length,
			rebabbleCount: this.babble.rebabbles.length,
		};
	},
	methods: {
		onDeleteBabble(babbleId) {
			if (confirm('정말로 배블을 삭제하시겠습니까?')) {
				deleteBabble(babbleId);
				this.isRebabbleed = false;
				this.$emit('delete', this.babble);
			}
		},
		async onInsertRebabble(babble) {
			const data = {
				fileUrl: babble.fileUrl,
				tags: babble.tags,
				rebabbleId: babble.id,
			};
			let rebabble = await insertRebabble(data);
			rebabble.data.user.avatar = `http://localhost:88/image/${rebabble.data.user.avatar}`;
			this.$emit('rebabble', rebabble.data);
			this.babble.rebabbles.push(rebabble.data);
			this.isRebabbleed = true;
			this.rebabbleCount++;
		},
		onDeleteRebabble(babble) {
			babble.rebabbles.forEach(r => {
				if (r.user.id === this.currentUser.id) {
					deleteBabble(r.id);
					let index = babble.rebabbles.indexOf(r);
					babble.rebabbles.splice(index, 1);
					this.$emit('unrebabble', r.id);
				}
			});

			this.isRebabbleed = false;
			this.rebabbleCount--;
		},
		handleLike(babbleId) {
			like(babbleId);
			this.likeCount++;
			this.isLiked = true;
		},
		handleUnlike(babbleId) {
			unlike(babbleId);
			this.likeCount--;
			this.isLiked = false;
		},
		upCommentCount() {
			this.commentCount++;
		},
	},
	setup(props) {
		const showCommentModal = ref(false);

		let isRebabbleed = false;
		let isLiked = false;
		let isRebabblePost = false;

		props.babble.rebabbles.forEach(babble => {
			if (babble.user.id === props.currentUser.id) {
				isRebabbleed = true;
			}
		});

		props.babble.likes.forEach(l => {
			if (l.id === props.currentUser.id) {
				isLiked = true;
			}
		});

		if (props.babble.rebabbleUser !== null) {
			isRebabblePost = true;
		}

		return {
			moment,
			showCommentModal,
			isRebabbleed,
			isLiked,
			isRebabblePost,
		};
	},
};
</script>

<style></style>
