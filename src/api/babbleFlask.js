// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { flaskInstance } from './index';
import { checkJwt } from './auth.js';

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

function checkAudio(formData) {
	checkJwt();
	return flaskInstance.post('STT', formData, config);
}

export { checkAudio };
