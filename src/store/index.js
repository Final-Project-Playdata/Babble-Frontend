import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			user: null,
			tags: null,
			token: null,
			username: null,
			password: null,
			isCommentModal: false,
			checkedAudio: null,
		};
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user;
		},
		CLEAR_USER: state => {
			state.user = null;
		},
		SET_TOKEN(state, token) {
			state.token = token;
		},
		CLEAR_TOKEN(state) {
			state.token = null;
		},
		SET_CHECKEDAUDIO(state, checkedAudio) {
			state.checkedAudio = checkedAudio;
		},
		SET_USERNAME(state, username) {
			state.username = username;
		},
		SET_PASSWORD(state, password) {
			state.password = password;
		},
		SET_TAGS(state, tags) {
			state.tags = tags;
		},
		SET_ISCOMMENTMODAL(state, isCommentModal) {
			state.isCommentModal = isCommentModal;
		},
	},
	plugins: [createPersistedState()],
});

export default store;
