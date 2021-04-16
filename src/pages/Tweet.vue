<template>
	<div class="flex-1 flex">
		<div class="flex-1 border-r border-gray-100">
			<div class="flex flex-col" v-if="tweet">
				<!-- title -->
				<div class="flex items-center px-3 py-2 border-b border-gray-100">
					<button @click="router.go(-1)">
						<i
							class="fas fa-arrow-left text-primary text-lg ml-3 hover:bg-blue-50 p-2 rounded-full h-10 w-10"
						></i>
					</button>
					<span class="font-bold text-lg ml-6">트윗</span>
				</div>
				<!-- tweet -->
				<div class="px-3 py-2 flex">
					<img
						:src="tweet.avatar"
						class="w-10 h-10 rounded-full hover:opacity-90 cursor-pointer"
					/>
					<div class="ml-2">
						<div class="font-bold">{{ tweet.user.username }}</div>
						<div class="text-gray text-sm">@{{ tweet.user.nickname }}</div>
					</div>
				</div>
				<detail-audio-player
					class="px-3 py-2"
					:audioUrl="tweet.fileUrl"
					playerid="audio-player"
				></detail-audio-player>
				<div class="px-3 py-2 text-gray text-xs">
					{{ moment(tweet.regDate).fromNow() }}
				</div>
				<div class="h-px w-full bg-gray-100"></div>
				<div class="flex space-x-2 px-3 py-2 items-center">
					<span class="">{{ tweet.retweetList.length }}</span>
					<span class="text-sm text-gray">리트윗</span>
					<span class="ml-5">{{ tweet.likeList.length }}</span>
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
					<button @click="handleRetweet(tweet.id)">
						<i
							v-if="isRetweeted"
							class="fas fa-retweet text-xl hover:bg-green-50 text-green-400 p-2 rounded-full h-10 w-10"
						></i>
						<i
							v-else
							class="fas fa-retweet text-gray-400 text-xl hover:bg-green-50 hover:text-green-400 p-2 rounded-full h-10 w-10"
						></i>
					</button>
					<button @click="handleLikes(tweet.id)">
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
					v-for="comment in tweet.commentList"
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
						<audio-player class="px-3 py-2" :audioUrl="tweet.fileUrl"></audio-player>
					</div>
					<button
						@click="handleDeleteComment(comment.id)"
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
			:tweet="tweet"
			v-if="showCommentModal"
			@close-modal="addComment"
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
	getPost,
	deleteComment,
	like,
	unlike,
	deletePost,
	insertRetweetPost,
} from '../api/babble';

export default {
	components: { Trends, CommentModal, AudioPlayer, DetailAudioPlayer },
	data: function () {
		return {
			isRetweeted: false,
			isLiked: false,
		};
	},
	methods: {
		addComment(comment) {
			this.showCommentModal = false;
			if (comment) {
				this.tweet.commentList.push(comment);
			}
		},
		handleDeleteComment(commentId) {
			if (confirm('정말로 답글을 삭제하시겠습니까?')) {
				deleteComment(this.tweet.id, commentId);
				this.tweet.commentList = this.tweet.commentList.filter(
					c => c.id !== commentId
				);
			}
		},
		handleRetweet(tweetId) {
			if (this.isRetweeted) {
				deletePost(tweetId);
				this.isRetweeted = false;
			} else {
				const data = {
					fileUrl: 'C:/ITstudy/12.project/python/011.wav',
					duration: '26.3',
					tagList: ['test1', 'test2', 'test3'],
					retweetPostId: tweetId,
				};
				insertRetweetPost(data);
				this.isRetweeted = true;
			}
		},
		handleLikes(tweetId) {
			if (this.isLiked) {
				unlike(tweetId);
				this.isLiked = false;
			} else {
				like(tweetId);
				this.isLiked = true;
			}
		},
	},
	setup() {
		const tweet = ref(null);
		const comments = ref([]);
		const currentUser = computed(() => store.state.user);
		const showCommentModal = ref(false);

		const route = useRoute();

		onBeforeMount(async () => {
			let data = await getPost(route.params.id);
			tweet.value = data.data;
			tweet.value.avatar = 'http://localhost:88/image';
		});
		return {
			router,
			tweet,
			comments,
			currentUser,
			moment,
			showCommentModal,
		};
	},
};
</script>

<style></style>
