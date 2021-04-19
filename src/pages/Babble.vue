<template>
	<div class="flex-1 flex">
		<div class="flex-1 border-r border-gray-100">
			<div class="flex flex-col" v-if="babble">
				<!-- title -->
				<div class="flex items-center px-3 py-2 border-b border-gray-100">
					<button @click="router.go(-1)">
						<i
							class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 rounded-full h-10 w-10"
						></i>
					</button>
					<span class="font-bold text-lg ml-6">트윗</span>
				</div>
				<!-- babble -->
				<div class="px-3 py-2 flex">
					<img
						:src="babble.user.avatar"
						class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
					/>
					<div class="ml-2">
						<div class="font-bold">{{ babble.user.username }}</div>
						<div class="text-gray text-sm">@{{ babble.user.nickname }}</div>
					</div>
				</div>
				<detail-audio-player
					class="px-3 py-2"
					:audioUrl="babble.fileUrl"
					playerid="audio-player"
				></detail-audio-player>
				<div class="px-3 py-2 text-gray text-xs">
					{{ moment(babble.regDate).fromNow() }}
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<div class="flex space-x-2 px-3 py-2 items-center">
					<span class="">{{ babble.rebabbles.length }}</span>
					<span class="text-sm text-gray">리배블</span>
					<span class="ml-5">{{ babble.likes.length }}</span>
					<span class="text-sm text-gray">마음에 들어요</span>
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<!-- buttons -->
				<div class="flex justify-around py-2">
					<button @click="showCommentModal = true">
						<i
							class="far fa-comment text-gray-400 text-xl hover:bg-blue-50 hover:text-primary p-2 rounded-full h-10 w-10"
						></i>
					</button>
					<button @click="onRebabble(babble.id)">
						<i
							v-if="isRebabbled"
							class="fas fa-rebabble text-xl hover:bg-green-50 text-green-400 p-2 rounded-full h-10 w-10"
						></i>
						<i
							v-else
							class="fas fa-rebabble text-gray-400 text-xl hover:bg-green-50 hover:text-green-400 p-2 rounded-full h-10 w-10"
						></i>
					</button>
					<button @click="handleLikes(babble.id)">
						<i
							v-if="this.isLiked"
							class="far fa-heart text-xl hover:bg-red-50 text-red-400 p-2 rounded-full h-10 w-10"
						></i>
						<i
							v-else
							class="far fa-heart text-gray-400 text-xl hover:bg-red-50 hover:text-red-400 p-2 rounded-full h-10 w-10"
						></i>
					</button>
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<!-- comments -->
				<div
					v-for="comment in babble.comments"
					:key="comment"
					class="flex hover:bg-gray-50 cursor-pointer px-3 py-3 border-b border-gray-100"
				>
					<img
						:src="comment.user.avatar"
						class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
					/>
					<div class="ml-2 flex-1">
						<div class="flex items-center space-x-2">
							<span class="font-bold">{{ comment.user.username }}</span>
							<span class="text-gray text-sm"
								>@{{ comment.user.nickname }}</span
							>
							<span>{{ moment(comment.regDate).fromNow() }}</span>
						</div>
						<audio-player
							class="px-3 py-2"
							:audioUrl="babble.fileUrl"
						></audio-player>
					</div>
					<button
						@click="onDeleteComment(comment.id)"
						v-if="comment.user.id === currentUser.id"
					>
						<i
							class="fas fa-trash text-red-400 hover:bg-red-50 w-10 h-10 rounded-full p-2"
						></i>
					</button>
				</div>
			</div>
		</div>
		<trends></trends>
		<comment-modal
			:babble="babble"
			v-if="showCommentModal"
			@close-modal="onAddComment"
		></comment-modal>
	</div>
</template>

<script>
import Trends from '../components/Trends.vue';
import router from '../router';
import { onBeforeMount, ref, computed } from 'vue';
import store from '../store';
import { useRoute } from 'vue-router';
import moment from 'moment';
import CommentModal from '../components/CommentModal.vue';
import AudioPlayer from '../components/AudioPlayer.vue';
import DetailAudioPlayer from '../components/DetailAudioPlayer.vue';
import {
	getBabble,
	deleteComment,
	like,
	unlike,
	deleteBabble,
	insertRebabble,
} from '../api/babble';

export default {
	components: { Trends, CommentModal, AudioPlayer, DetailAudioPlayer },
	data: function () {
		return {
			isRebabbled: false,
			isLiked: false,
		};
	},
	methods: {
		onAddComment(comment) {
			this.showCommentModal = false;
			if (comment) {
				this.babble.comments.push(comment);
			}
		},
		onDeleteComment(commentId) {
			if (confirm('정말로 답글을 삭제하시겠습니까?')) {
				deleteComment(this.babble.id, commentId);
				this.babble.comments = this.babble.comments.filter(
					c => c.id !== commentId
				);
			}
		},
		onRebabble(babbleId) {
			if (this.isRebabbled) {
				deleteBabble(babbleId);
				this.isRebabbled = false;
			} else {
				const data = {
					fileUrl: 'C:/ITstudy/12.project/python/011.wav',
					duration: '26.3',
					tags: ['test1', 'test2', 'test3'],
					rebabbleId: babbleId,
				};
				insertRebabble(data);
				this.isRebabbled = true;
			}
		},
		handleLikes(babbleId) {
			if (this.isLiked) {
				unlike(babbleId);
				this.isLiked = false;
			} else {
				like(babbleId);
				this.isLiked = true;
			}
		},
	},
	setup() {
		const babble = ref(null);
		const comments = ref([]);
		const currentUser = computed(() => store.state.user);
		const showCommentModal = ref(false);

		const route = useRoute();

		onBeforeMount(async () => {
			let data = await getBabble(route.params.id);
			babble.value = data.data;
			babble.value.user.avatar = `http://localhost:88/image/${babble.value.user.avatar}`;

			babble.value.comments.forEach(comment => {
				comment.user.avatar = `http://localhost:88/image/${comment.user.avatar}`;
			});
		});
		return {
			showCommentModal,
			currentUser,
			comments,
			router,
			babble,
			moment,
		};
	},
};
</script>

<style></style>
