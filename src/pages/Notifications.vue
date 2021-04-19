<template>
	<!-- notification -->
	<div class="flex-1 border-r border-gray-100 flex flex-col overflow-y-auto">
		<!-- title -->
		<div class="p-3 font-bold text-lg border-b border-gray-100">알림</div>
		<!-- notifications -->
		<div
			class="flex flex-col hover:bg-gray-50 p-3 space-y-2 border-b border-gray-100 cursor-pointer"
			v-for="notification in notifications"
			:key="notification.id"
		>
			<div class="flex justify-between">
				<router-link :to="`/profile/${notification.uid}`">
					<img
						:src="notification.profile_image_url"
						class="w-10 h-10 rounded-full hover:opacity-80"
					/>
				</router-link>
				<i
					class="fas fa-ellipsis-h text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-10 h-10 flex items-center justify-center"
				></i>
			</div>
			<div>
				<span class="font-bold"> {{ notification.username }}</span> 님의 최근
				트윗
			</div>
			<router-link :to="`/tweet/${notification.id}`" class="text-gray-500">{{
				notification.tweet_body
			}}</router-link>
		</div>
	</div>
	<!-- trends -->
	<Trends />
</template>

<script>
import Trends from '../components/Trends.vue';
import { ref, computed, onBeforeMount } from 'vue';
import store from '../store';

export default {
	components: { Trends },
	setup() {
		const currentUser = computed(() => store.state.user);
		const notifications = ref([]);

		onBeforeMount(() => {});

		return {
			currentUser,
			notifications,
		};
	},
};
</script>

<style></style>
