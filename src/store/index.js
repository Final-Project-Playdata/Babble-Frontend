import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';
import { setNotificationInterval } from '../api/babbleElasticsearch';
const store = createStore({
	state() {
		return {
			user: null,
			tags: null,
			token: null,
			username: null,
			password: null,
			checkedAudio: null,
			notifications: null,
			isCommentModal: false,
			notificationInterval: null,
		};
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user;
		},
		CLEAR_DATA: state => {
			state.user = null;
			state.tags = null;
			state.token = null;
			state.username = null;
			state.password = null;
			state.checkedAudio = null;
			state.notifications = null;
			state.isCommentModal = false;
			clearInterval(state.notificationInterval);
			state.notificationInterval = null;
		},
		SET_TOKEN(state, token) {
			state.token = token;
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
		SET_NOTIFICATIONINTERVAL(state, notificationInterval) {
			state.notificationInterval = notificationInterval;
		},
	},
	plugins: [createPersistedState()],
});

export default store;
