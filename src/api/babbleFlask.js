// 학습 노트 조작과 관련된 CRUD API 함수 파일
import { flaskInstance } from './index';
import store from '../store/index';

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

function checkAudio(formData) {
	return flaskInstance.post('STT', formData, config).catch(err => {
		store.state.error = err.toString().slice(-3);
	});
}

export { checkAudio };
