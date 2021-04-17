// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { fluxInstance } from './index';
import store from '../store/index';

function getAudio() {
	return fluxInstance.get(`audio`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function getImage() {
	return fluxInstance.get(`image`).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

function saveAudio(formData) {
	return fluxInstance.post('audio', formData, config).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

function saveImage(formData) {
	return fluxInstance.post('image', formData, config).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

export { getAudio, getImage, saveAudio, saveImage };
