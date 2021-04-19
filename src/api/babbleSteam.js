// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { fluxInstance } from './index';
import { checkJwt } from './auth.js';

function getAudio() {
	checkJwt();
	return fluxInstance.get(`audio`);
}

function getImage() {
	checkJwt();
	return fluxInstance.get(`image`);
}

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

function saveAudio(formData) {
	checkJwt();
	return fluxInstance.post('audio', formData, config);
}

function saveImage(formData) {
	checkJwt();
	return fluxInstance.post('image', formData, config);
}

export { getAudio, getImage, saveAudio, saveImage };
