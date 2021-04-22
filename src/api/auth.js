import { instance, mvcInstance } from './index';
import store from '../store/index.js';

function signUp(data) {
	return instance.post('/signup', data);
}

function signIn(data) {
	return instance.post('/login', data);
}

function allClient(data) {
	return instance.get('/getMemberList', data);
}

function updateUserInfo(data) {
	return mvcInstance.put(`user/${data.id}`, data);
}

async function checkJwt() {
	function parseJwt(token) {
		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
		return JSON.parse(jsonPayload);
	}

	let result = parseJwt(store.state.token);
	if (Date.now() + 60 * 1000 * 3 >= result.exp * 1000) {
		const data = {
			username: store.state.username,
			password: store.state.password,
		};
		let result = await signIn(data);
		await store.commit('SET_TOKEN', result.headers['authorization']);
	}
}

export { signUp, signIn, allClient, updateUserInfo, checkJwt };
