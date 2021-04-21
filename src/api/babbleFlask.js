import { flaskInstance } from './index';
import { checkJwt } from './auth.js';

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

function checkAudio(formData) {
	checkJwt();
	return flaskInstance.post('STT', formData, config);
}

export { checkAudio };
