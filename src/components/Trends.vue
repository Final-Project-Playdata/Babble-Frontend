<template>
	<div class="hidden lg:block lg:w-2/5 px-4 py-2">
		<!--tweet search  input -->
		<div class="relative mb-5">
			<input
				v-model="hashTag"
				@keyup.enter="search"
				placeholder="Hash Tag"
				type="text"
				class="pl-10 rounded-full w-full p-2 bg-gray-100 text-sm focus:ring-1 focus:ring-primary focus:bg-white focus:outline-none"
			/>
			<i class="fas fa-search absolute left-0 mt-2 ml-3 text-sm text-light"></i>
		</div>
		<!-- trend for me -->
		<div class="w-full rounded-xl bg-gray-50 flex flex-col">
			<div
				class="flex items-center justify-between px-3 py-1 border-b border-gray-100"
			>
				<span class="text-lg font-bold">최근 내가 많이 사용한 단어들</span>
				<i
					class="text-center fas fa-cog text-lg text-primary hover:bg-blue-50 p-2 rounded-full w-10 h-10"
				></i>
			</div>
			<div
				class="border-b border-gray-100 hover:bg-gray-100 px-4 py-2 cursor-pointer"
				v-for="trend in 3"
				:key="trend"
			>
				<div class="flex">
					<div class="flex-1 flex flex-col">
						<div class="font-bold text-lg">오늘</div>
						<div class="text-gray-500">날씨</div>
					</div>
					<i class="fas fa-ellipsis-h text-gray-500"></i>
				</div>
			</div>
		</div>

		<!-- follow recommends -->
		<div class="mt-5 w-full rounded-xl bg-gray-50 flex flex-col">
			<div class="px-3 py-3 border-b border-gray-100">
				<span class="text-lg font-bold">최근 나의 상태</span>
			</div>
			<div
				class="border-b border-gray-100 hover:bg-gray-100 px-4 py-2 cursor-pointer"
				v-for="trend in 3"
				:key="trend"
			>
				<div class="flex items-center">
					<div class="flex-1 flex flex-col">
						<div class="font-bold">😍😊😉</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
	data: function () {
		return {
			hashTag: '',
			router: useRouter(),
		};
	},
	methods: {
		search: function () {
			this.$data.router.replace(`/${this.$data.hashTag}`);
		},
	},
};
</script>

<style></style>
