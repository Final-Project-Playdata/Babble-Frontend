<template>
	<!-- tweets -->
	<div
		class="flex px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
	>
		<router-link :to="`/profile/${tweet.user.id}`">
			<img
				:src="tweet.profile_image_url"
				class="w-10 h-10 rounded-full hover:opacity-80 cursor-pointer"
			/>
		</router-link>
		<div class="ml-3 flex-1 flex flex-col space-y-1">
			<div v-if="isRetweetPost">
				Retweeted by {{ tweet.retweetUser.username }}
			</div>
			<router-link :to="`/tweet/${tweet.id}`">
				<div class="text-sm flex justify-between items-center">
					<div class="space-x-1">
						<span class="font-bold">{{ tweet.user.username }}</span>
						<span class="text-gray-500 text-xs"
							>@{{ tweet.user.nickname }}</span
						>
						<span>·</span>
						<span class="text-gray-500 text-xs">{{
							moment(tweet.regDate).fromNow()
						}}</span>
					</div>
					<button
						v-if="currentUser.id === tweet.user.id"
						@click="onDeleteTweet(tweet.id)"
					>
						<i
							class="fas fa-trash text-red-400 p-2 rounded-full hover:bg-red-50"
						></i>
					</button>
				</div>
			</router-link>
			<!-- tweet body -->
			<audio-player :audioUrl="tweet.fileUrl"></audio-player>
			<!-- tweet actions -->
			<div class="flex justify-between">
				<!-- comment button -->
				<div
					@click="showCommentModal = true"
					class="text-gray-500 hover:text-primary"
				>
					<i class="far fa-comment hover:bg-blue-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ commentCount }}</span>
				</div>
				<!-- retweet button -->
				<div
					v-if="!isRetweeted"
					class="text-gray-500 hover:text-green-400"
					@click="retweet(tweet.id)"
				>
					<i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ retweetCount }}</span>
				</div>
				<div v-else class="text-green-400" @click="unretweet(tweet)">
					<i class="fas fa-retweet hover:bg-green-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ retweetCount }}</span>
				</div>
				<!-- like button -->
				<div
					v-if="!isLiked"
					class="text-gray-400 hover:text-red-400"
					@click="handleLike(tweet.id)"
				>
					<i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ likeCount }}</span>
				</div>
				<div v-else class="text-red-400" @click="handleUnlike(tweet.id)">
					<i class="far fa-heart hover:bg-red-50 rounded-full p-2"></i>
					<span class="ml-1 text-sm">{{ likeCount }}</span>
				</div>
				<!-- share button -->
				<div class="text-gray-500 hover:text-primary"></div>
			</div>
		</div>
		<comment-modal
			:tweet="tweet"
			v-if="showCommentModal"
			@close-modal="(showCommentModal = false), commentCount++"
		></comment-modal>
	</div>
</template>

<script>
import moment from 'moment';
import { ref } from 'vue';
import CommentModal from './CommentModal.vue';
import { deletePost, insertRetweetPost, like, unlike } from '../api/babble';
import AudioPlayer from './AudioPlayer.vue';

export default {
	components: { CommentModal, AudioPlayer },
	props: ['currentUser', 'tweet'],
	data: function () {
		return {
			commentCount: this.tweet.commentList.length,
			likeCount: this.tweet.likeList.length,
			retweetCount: this.tweet.retweetList.length,
		};
	},
	methods: {
		onDeleteTweet(tweetId) {
			if (confirm('정말로 트윗을 삭제하시겠습니까?')) {
				deletePost(tweetId);
				this.isRetweeted = false;
				this.$emit('delete', this.tweet);
			}
		},
		async retweet(tweetId) {
			const data = {
				fileUrl: 'C:/ITstudy/12.project/python/011.wav',
				duration: '26.3',
				tagList: ['test1', 'test2', 'test3'],
				retweetPostId: tweetId,
			};
			let temp = await insertRetweetPost(data);
			this.$emit('retweet', temp.data);
			this.tweet.retweetList.push(temp.data);
			this.isRetweeted = true;
			this.retweetCount++;
		},
		unretweet(tweet) {
			tweet.retweetList.forEach(r => {
				if (r.user.id === this.currentUser.id) {
					deletePost(r.id);
					let index = tweet.retweetList.indexOf(r);
					tweet.retweetList.splice(index, 1);
					this.$emit('unretweet', r.id);
				}
			});

			this.isRetweeted = false;
			this.retweetCount--;
		},
		handleLike(tweetId) {
			like(tweetId);
			this.likeCount++;
			this.isLiked = true;
		},
		handleUnlike(tweetId) {
			unlike(tweetId);
			this.likeCount--;
			this.isLiked = false;
		},
		upCommentCount() {
			this.commentCount++;
		},
	},
	setup(props) {
		const showCommentModal = ref(false);

		let isRetweeted = false;
		let isLiked = false;
		let isRetweetPost = false;

		props.tweet.retweetList.forEach(t => {
			if (t.user.id === props.currentUser.id) {
				isRetweeted = true;
			}
		});

		props.tweet.likeList.forEach(l => {
			if (l.id === props.currentUser.id) {
				isLiked = true;
			}
		});

		if (props.tweet.retweetUser !== null) {
			isRetweetPost = true;
		}

		return {
			moment,
			showCommentModal,
			isRetweeted,
			isLiked,
			isRetweetPost,
		};
	},
};
</script>

<style></style>
