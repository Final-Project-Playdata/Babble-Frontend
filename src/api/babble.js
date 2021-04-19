// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { mvcInstance } from './index';
import store from '../store/index';
import { checkJwt } from './auth.js';

function getTagsInBabble(id) {
	checkJwt();
	return mvcInstance.get(`/babble/${id}/tags`);
}

function insertTags(id, tags) {
	checkJwt();
	return mvcInstance.post(`/babble/${id}/tags`, tags);
}

function updateTags(id, tags) {
	checkJwt();
	return mvcInstance.put(`/babble/${id}/tags`, tags);
}

function insertBabble(babble) {
	checkJwt();
	return mvcInstance.post('babble', babble);
}

function deleteBabble(id) {
	checkJwt();
	return mvcInstance.delete(`/babble/${id}`);
}

function updateBabble(id) {
	checkJwt();
	return mvcInstance.put(`/babble/${id}`);
}

function getBabble(id) {
	checkJwt();
	return mvcInstance.get(`/babble/${id}`);
}

function getBabbles() {
	checkJwt();
	return mvcInstance.get('babbles');
}

function getBabblesWithTag(tag) {
	checkJwt();
	return mvcInstance.get(`babbles/${tag}`);
}

function getBabblesWithId(id) {
	checkJwt();
	return mvcInstance.get(`user/${id}/babbles`);
}

function insertRebabble(babble) {
	checkJwt();
	return mvcInstance.post('rebabble', babble);
}

function getUser(id) {
	checkJwt();
	return mvcInstance.get(`user/${id}`);
}

function getMyInfo() {
	checkJwt();
	return mvcInstance.get('my');
}

function insertComment(babbleId, comment) {
	checkJwt();
	return mvcInstance.post(`babble/${babbleId}/comment`, comment);
}

function deleteComment(babbleId, commentId) {
	checkJwt();
	return mvcInstance
		.delete(`babble/${babbleId}/comment/${commentId}`)
		.catch(err => {
			store.state.error = err.toString().slice(-3);
		});
}

function deleteComments(id) {
	checkJwt();
	return mvcInstance.delete(`babble/${id}/comments`);
}

function deleteLikes(id) {
	checkJwt();
	return mvcInstance.delete(`babble/${id}/likes`);
}

function deleteTags(id) {
	checkJwt();
	return mvcInstance.delete(`babble/${id}/tags`);
}

function like(id) {
	checkJwt();
	return mvcInstance.post(`babble/${id}/like`);
}

function unlike(id) {
	checkJwt();
	return mvcInstance.delete(`babble/${id}/like`);
}

function follow(id) {
	checkJwt();
	return mvcInstance.post(`user/${id}/follow`);
}

function unfollow(id) {
	checkJwt();
	return mvcInstance.delete(`user/${id}/follow`);
}

function getFollowers(id) {
	checkJwt();
	return mvcInstance.get(`user/${id}/follower`);
}

function getFollowings(id) {
	checkJwt();
	return mvcInstance.get(`user/${id}/following`);
}

function getLikeBabbles(id) {
	checkJwt();
	return mvcInstance.get(`user/${id}/likes`);
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
