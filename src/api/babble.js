// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { mvcInstance } from './index';
import store from '../store/index';

function getTagsInBabble(id) {
	return mvcInstance.get(`/babble/${id}/tags`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertTags(id, tags) {
	return mvcInstance.post(`/babble/${id}/tags`, tags).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function updateTags(id, tags) {
	return mvcInstance.put(`/babble/${id}/tags`, tags).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertBabble(babble) {
	return mvcInstance.post('babble', babble).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteBabble(id) {
	return mvcInstance.delete(`/babble/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function updateBabble(id) {
	return mvcInstance.put(`/babble/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getBabble(id) {
	return mvcInstance.get(`/babble/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getBabbles() {
	return mvcInstance.get('babbles').catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getBabblesWithTag(tag) {
	return mvcInstance.get(`babbles/${tag}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getBabblesWithId(id) {
	return mvcInstance.get(`user/${id}/babbles`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertRebabble(babble) {
	return mvcInstance.post('rebabble', babble).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getUser(id) {
	return mvcInstance.get(`user/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getMyInfo() {
	return mvcInstance.get('my').catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertComment(babbleId, comment) {
	return mvcInstance.post(`babble/${babbleId}/comment`, comment).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteComment(babbleId, commentId) {
	return mvcInstance
		.delete(`babble/${babbleId}/comment/${commentId}`)
		.catch(err => {
			store.state.error = err.toString().slice(-3);
		});
}

function deleteComments(id) {
	return mvcInstance.delete(`babble/${id}/comments`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteLikes(id) {
	return mvcInstance.delete(`babble/${id}/likes`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteTags(id) {
	return mvcInstance.delete(`babble/${id}/tags`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function like(id) {
	return mvcInstance.post(`babble/${id}/like`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function unlike(id) {
	return mvcInstance.delete(`babble/${id}/like`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function follow(id) {
	return mvcInstance.post(`user/${id}/follow`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function unfollow(id) {
	return mvcInstance.delete(`user/${id}/follow`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getFollowers(id) {
	return mvcInstance.get(`user/${id}/follower`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getFollowings(id) {
	return mvcInstance.get(`user/${id}/following`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getLikeBabbles(id) {
	return mvcInstance.get(`user/${id}/likes`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

export {
	getTagsInBabble,
	insertTags,
	updateTags,
	insertBabble,
	deleteBabble,
	updateBabble,
	getBabble,
	getBabbles,
	getBabblesWithTag,
	insertRebabble,
	getUser,
	insertComment,
	deleteComments,
	deleteLikes,
	deleteTags,
	like,
	unlike,
	deleteComment,
	follow,
	unfollow,
	getFollowers,
	getFollowings,
	getLikeBabbles,
	getMyInfo,
	getBabblesWithId,
};
