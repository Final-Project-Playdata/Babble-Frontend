// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { mvcInstance } from './index';
import store from '../store/index';

function getTagsInPost(id) {
	return mvcInstance.get(`/post/${id}/tags`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertTagList(id, tagList) {
	return mvcInstance.post(`/post/${id}/tags`, tagList).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function updateTagList(id, tagList) {
	return mvcInstance.put(`/post/${id}/tags`, tagList).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertPost(post) {
	return mvcInstance.post('post', post).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deletePost(id) {
	return mvcInstance.delete(`/post/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function updatePost(id) {
	return mvcInstance.put(`/post/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getPost(id) {
	return mvcInstance.get(`/post/${id}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getPostList() {
	return mvcInstance.get('posts').catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getPostListWithTag(tag) {
	return mvcInstance.get(`posts/${tag}`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function insertRetweetPost(post) {
	return mvcInstance.post('retweet', post).catch(err => {
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

function insertComment(postId, comment) {
	return mvcInstance.post(`post/${postId}/comment`, comment).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteComment(postId, commentId) {
	return mvcInstance
		.delete(`post/${postId}/comment/${commentId}`)
		.catch(err => {
			store.state.error = err.toString().slice(-3);
		});
}

function deleteCommentList(id) {
	return mvcInstance.delete(`post/${id}/comments`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteLikeList(id) {
	return mvcInstance.delete(`post/${id}/likes`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function deleteTagList(id) {
	return mvcInstance.delete(`post/${id}/tags`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function like(id) {
	return mvcInstance.post(`post/${id}/like`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function unlike(id) {
	return mvcInstance.delete(`post/${id}/like`).catch(err => {
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

function getFollowerList(id) {
	return mvcInstance.get(`user/${id}/follower`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getFollowingList(id) {
	return mvcInstance.get(`user/${id}/following`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getLikePostList(id) {
	return mvcInstance.get(`user/${id}/likes`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

export {
	getTagsInPost,
	insertTagList,
	updateTagList,
	insertPost,
	deletePost,
	updatePost,
	getPost,
	getPostList,
	getPostListWithTag,
	insertRetweetPost,
	getUser,
	insertComment,
	deleteCommentList,
	deleteLikeList,
	deleteTagList,
	like,
	unlike,
	deleteComment,
	follow,
	unfollow,
	getFollowerList,
	getFollowingList,
	getLikePostList,
	getMyInfo,
};
