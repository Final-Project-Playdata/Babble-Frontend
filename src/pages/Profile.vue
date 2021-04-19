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
					<div class="text-xs text-gray">{{ babbles.length }} 트윗</div>
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
					<div v-if="isFollowed" class="" @click="onUnFollow">
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
					@click="currentTab = 'babble'"
					:class="`${
						currentTab == 'babble'
							? 'border-b border-primary text-primary'
							: ' text-gray'
					} py-3  font-bold  text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary`"
				>
					배블
				</div>
				<div
					@click="currentTab = 'rebabble'"
					:class="`${
						currentTab == 'rebabble'
							? 'border-b border-primary text-primary'
							: ' text-gray'
					} py-3  font-bold  text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary`"
				>
					리배블
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
			<!-- babbles -->
			<div class="overflow-y-auto">
				<Babble
					v-for="babble in currentTab == 'babble'
						? babbles
						: currentTab == 'rebabble'
						? rebabbles
						: likeBabbles"
					:key="babble.id"
					:currentUser="currentUser"
					:babble="babble"
					@delete="deleteBabble"
					@unrebabble="deleteRebabble"
					@rebabble="addRebabble"
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
import Babble from '../components/Babble.vue';
import store from '../store';
import { computed, ref, onBeforeMount } from 'vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import router from '../router';
import ProfileEditModal from '../components/ProfileEditModal.vue';
import AudioPlayer from '../components/AudioPlayer.vue';
import {
	getBabblesWithId,
	getUser,
	follow,
	unfollow,
	getFollowers,
	getFollowings,
	getLikeBabbles,
} from '../api/babble';

export default {
	components: { Trends, Babble, ProfileEditModal, AudioPlayer },
	methods: {
		deleteBabble(babble) {
			this.babbles = this.babbles.filter(t => t !== babble);
		},
		deleteRebabble(babbleId) {
			this.rebabbles = this.rebabbles.filter(t => t.id !== babbleId);
		},
		addRebabble(babble) {
			if (this.profileUser.id === this.currentUser.id) {
				this.rebabbles.push(babble);
			}
		},
		editProfileUser() {
			this.showProfileEditModal = false;
			window.location.reload();
		},
	},
	computed: {
		isFollowed() {
			let status = false;
			this.followers.forEach(user => {
				if (user.id === this.currentUser.id) {
					status = true;
				}
			});
			return status;
		},
	},
	watch: {
		'$route.params.id'(val) {
			window.location.reload();
		},
	},
	setup() {
		const currentUser = computed(() => store.state.user);
		const profileUser = ref(null);
		const babbles = ref([]);
		const rebabbles = ref([]);
		const likeBabbles = ref([]);
		const followings = ref([]);
		const followers = ref([]);
		const currentTab = ref('babble');
		const route = useRoute();

		const showProfileEditModal = ref(false);

		onBeforeMount(async () => {
			const id = route.params.id ?? currentUser.value.id;

			let user = await getUser(id);
			user.data.avatar = `http://localhost:88/image/${user.data.avatar}`;
			user.data.background = `http://localhost:88/image/${user.data.background}`;
			profileUser.value = user.data;

			if(profileUser.value.id === currentUser.value.id){
				store.commit('SET_USER', user.data);
			}

			let babble = await getBabblesWithId(id);
			babble.data.forEach(babble => {
				babble.user.avatar = `http://localhost:88/image/${babble.user.avatar}`;
				if (babble.rebabbleId !== null) {
					rebabbles.value.push(babble);
				} else {
					babbles.value.push(babble);
				}
			});

			let followings = await getFollowings(id);
			followings.value = followings.data;

			let followers = await getFollowers(id);
			followers.value = followers.data;

			let likes = await getLikeBabbles(id);
			likeBabbles.value = likes.data;
			likeBabbles.value.forEach(likeBabble => {
				likeBabble.user.avatar = `http://localhost:88/image/${likeBabble.user.avatar}`;
			});
		});

		const onFollow = () => {
			follow(profileUser.value.id);
			followers.value.push(currentUser.value);
		};

		const onUnFollow = () => {
			unfollow(profileUser.value.id);
			followers.value = followers.value.filter(
				f => f.id !== currentUser.value.id
			);
		};

		return {
			currentUser,
			profileUser,
			babbles,
			rebabbles,
			likeBabbles,
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
