import { fluxInstance } from './index';
import { checkJwt } from './auth.js';

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

function getAudio() {
	checkJwt();
	return fluxInstance.get(`audio`);
}

function getImage() {
	checkJwt();
	return fluxInstance.get(`image`);
}

function saveImage(formData) {
	checkJwt();
	return fluxInstance.post('image', formData, config);
}

export { getAudio, getImage, saveImage };
