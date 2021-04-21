import { mvcInstance } from './index';
import { checkJwt } from './auth.js';

function insertBabble(babble) {
	checkJwt();
	return mvcInstance.post('babble', babble);
}

function deleteBabble(id) {
	checkJwt();
	return mvcInstance.delete(`/babble/${id}`);
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
	return mvcInstance.delete(`babble/${babbleId}/comment/${commentId}`);
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

export {
	insertBabble,
	deleteBabble,
	getBabble,
	getBabbles,
	getBabblesWithTag,
	insertRebabble,
	getUser,
	insertComment,
	like,
	unlike,
	deleteComment,
	follow,
	unfollow,
	getMyInfo,
	getBabblesWithId,
};
