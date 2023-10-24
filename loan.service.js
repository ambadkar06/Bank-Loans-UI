import http from "../http-common";

class LoanDataService {
  getAll() {
    return http.get("/loan");
  }

  get(id) {
    return http.get(`/loan/${id}`);
  }

  create(data) {
    return http.post("/loan", data);
  }

  update(id, data) {
    return http.put(`/loan/${id}`, data);
  }

  delete(id) {
    return http.delete(`/loan/${id}`);
  }

}

export default new LoanDataService();