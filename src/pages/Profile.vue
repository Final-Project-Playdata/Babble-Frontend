<template>
	<div class="flex-1 flex" v-if="profileUser">
		<!-- profile section -->
		<div class="flex-1 flex flex-col border-r border-color">
			<!-- title -->
			<div class="px-3 py-1 flex border-b border-color">
				<button class="mr-4" @click="router.go(-1)">
					<i
						class="fas fa-arrow-left text-primary p-3 rounded-full hover:bg-blue-50"
					></i>
				</button>
				<div>
					<div class="font-extrabold text-lg">{{ profileUser.username }}</div>
					<div class="text-xs text-gray">{{ tweets.length }} 트윗</div>
				</div>
			</div>
			<!-- background image -->
			<div class="bg-gray-300 h-48 relative flex-none">
				<img :src="profileUser.background" class="w-full h-48 object-cover" />
				<!-- profile image -->
				<div
					class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2"
				>
					<img
						:src="profileUser.avatar"
						class="w-full h-full rounded-full opacity-90 hover:opacity-100 cursor-pointer"
					/>
				</div>
			</div>
			<!-- profile edit button -->
			<div class="text-right mt-2 mr-2 mb-10 relative">
				<div v-if="currentUser.id === profileUser.id">
					<button
						@click="showProfileEditModal = true"
						class="border text-sm border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
					>
						프로필 수정
					</button>
				</div>
				<div v-else>
					<div
						v-if="followings.includes(profileUser)"
						class=""
						@click="onUnFollow"
					>
						<button
							class="absolute w-24 right-0 text-sm bg-primary text-white px-3 py-2 hover:opacity-0 font-bold rounded-full"
						>
							팔로잉
						</button>
						<button
							class="absolute w-24 right-0 text-sm bg-red-400 text-white px-3 py-2 opacity-0 hover:opacity-100 font-bold rounded-full"
						>
							언팔로우
						</button>
					</div>
					<div v-else @click="onFollow">
						<button
							class="absolute right-0 w-24 border text-sm border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
						>
							팔로우
						</button>
					</div>
				</div>
			</div>
			<!-- user info -->
			<div class="mx-3 mt-2">
				<div class="font-extrabold text-lg">
					{{ profileUser.lastName + profileUser.firstName }}
				</div>
				<div class="text-gray">@{{ profileUser.nickname }}</div>
				<audio-player :audioUrl="profileUser.bio"></audio-player>
				<div>
					<span class="text-gray">가입일:</span>
					<span class="text-gray">{{
						moment(profileUser.regDate).format('YYYY년 MM월')
					}}</span>
				</div>
				<div>
					<span class="font-bold mr-1">{{ followings.length }}</span>
					<span class="text-gray mr-3">팔로우 중</span>
					<span class="font-bold mr-1">{{ followers.length }}</span>
					<span class="text-gray">팔로워</span>
				</div>
			</div>
			<!-- tabs -->
			<div class="flex border-b border-color mt-3">
				<div
					@click="currentTab = 'tweet'"
					:class="`${
						currentTab == 'tweet'
							? 'border-b border-primary text-primary'
							: ' text-gray'
					} py-3  font-bold  text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary`"
				>
					트윗
				</div>
				<div
					@click="currentTab = 'retweet'"
					:class="`${
						currentTab == 'retweet'
							? 'border-b border-primary text-primary'
							: ' text-gray'
					} py-3  font-bold  text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary`"
				>
					리트윗
				</div>
				<div
					@click="currentTab = 'like'"
					:class="`${
						currentTab == 'like'
							? 'border-b border-primary text-primary'
							: ' text-gray'
					} py-3  font-bold  text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary`"
				>
					좋아요
				</div>
			</div>
			<!-- tweets -->
			<div class="overflow-y-auto">
				<Tweet
					v-for="tweet in currentTab == 'tweet'
						? tweets
						: currentTab == 'retweet'
						? reTweets
						: likeTweets"
					:key="tweet.id"
					:currentUser="currentUser"
					:tweet="tweet"
					@delete="deleteTweet"
					@unretweet="deleteRetweet"
					@retweet="addRetweet"
				/>
			</div>
		</div>
		<!-- trend section -->
		<Trends />
		<profile-edit-modal
			v-if="showProfileEditModal"
			@close-modal="editProfileUser"
		></profile-edit-modal>
	</div>
</template>

<script>
import Trends from '../components/Trends.vue';
import Tweet from '../components/Tweet.vue';
import store from '../store';
import { computed, ref, onBeforeMount } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import router from '../router';
import ProfileEditModal from '../components/ProfileEditModal.vue';
import AudioPlayer from '../components/AudioPlayer.vue';
import {
	getPostList,
	getUser,
	follow,
	unfollow,
	getFollowerList,
	getFollowingList,
	getLikePostList,
} from '../api/babble';

export default {
	components: { Trends, Tweet, ProfileEditModal, AudioPlayer },
	methods: {
		deleteTweet(tweet) {
			this.tweets = this.tweets.filter(t => t !== tweet);
		},
		deleteRetweet(tweetId) {
			this.reTweets = this.reTweets.filter(t => t.id !== tweetId);
		},
		addRetweet(tweet) {
			this.reTweets.push(tweet);
		},
		editProfileUser(data) {
			if (data) {
				this.profileUser = data;
				this.currentUser = data;
			}
			this.showProfileEditModal = false;
		},
	},
	setup() {
		const currentUser = computed(() => store.state.user);
		const profileUser = ref(null);
		const tweets = ref([]);
		const reTweets = ref([]);
		const likeTweets = ref([]);
		const followings = ref([]);
		const followers = ref([]);
		const currentTab = ref('tweet');
		const route = useRoute();

		const showProfileEditModal = ref(false);

		onBeforeMount(async () => {
			const id = route.params.id ?? currentUser.value.id;

			let data = await getUser(id);
			profileUser.value = data.data;
			profileUser.value.avatar = `http://localhost:88/image/${profileUser.value.avatar}`;
			profileUser.value.background = `http://localhost:88/image/${profileUser.value.background}`;

			let data1 = await getPostList(id);
			data1.data.forEach(post => {
				post.user.avatar = `http://localhost:88/image/${post.user.avatar}`;
				if (post.retweetPostId !== null) {
					reTweets.value.push(post);
					console.log(post, 'retweet');
				} else {
					tweets.value.push(post);
					console.log(post, 'tweet');
				}
			});

			let data2 = await getFollowingList(id);
			followings.value = data2.data;

			let data3 = await getFollowerList(id);
			followers.value = data3.data;

			let data4 = await getLikePostList(id);
			likeTweets.value = data4.data;
			likeTweets.value.forEach(likeTweet => {
				console.log(likeTweet.user);
				likeTweet.user.avatar = `http://localhost:88/image/${likeTweet.user.avatar}`;
			});
		});

		const onFollow = async () => {
			follow(profileUser.value.id);
		};

		const onUnFollow = async () => {
			unfollow(profileUser.value.id);
		};

		return {
			currentUser,
			profileUser,
			tweets,
			reTweets,
			likeTweets,
			moment,
			currentTab,
			router,
			showProfileEditModal,
			onFollow,
			onUnFollow,
			followings,
			followers,
		};
	},
};
</script>

<style></style>
