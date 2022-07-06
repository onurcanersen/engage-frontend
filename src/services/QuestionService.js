import http from "../HttpCommon";

class QuestionDataService {
	findBySessionCode(sessionCode) {
		return http.get(`/sessions/${sessionCode}/questions`);
	}
	update(id, data) {
		return http.put(`/questions/${id}`, data);
	}
}

export default new QuestionDataService();
