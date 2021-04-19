import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
	state() {
		return {
			user: null,
			error: 200,
			token: null,
			followers: null,
			followings: null,
		};
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user;
		},
		CLEAR_USER: state => {
			state.user = null;
		},
		SET_BACKGROUND_IMAGE: (state, image) => {
			state.user.background_image_url = image;
		},
		SET_PROFILE_IMAGE: (state, image) => {
			state.user.profile_image_url = image;
		},
		SET_FOLLOW: (state, uid) => {
			state.user.followings.push(uid);
		},
		SET_UN_FOLLOW: (state, uid) => {
			state.user.followings = state.user.followings.filter(u => u !== uid);
		},
		SET_TOKEN(state, token) {
			state.token = token;
		},
		CLEAR_TOKEN(state) {
			state.token = null;
		},
		SET_FOLLOWERS(state, followers) {
			state.followers = followers;
		},
		SET_FOLLOWINGS(state, followings) {
			state.followings = followings;
		},
	},
	plugins: [createPersistedState()],
});

export default store;
