import http from "../HttpCommon";

class PresenterDataService {
	findByEmail(email) {
		return http.get(`/presenters/${email}`);
	}
	create(data) {
		return http.post(`/presenters`, data);
	}
}

export default new PresenterDataService();
