import http from "../http-common";

class LedgerDataService {
  getAll() {
    return http.get("/ledger");
  }

  get(id) {
    return http.get(`/ledger/${id}`);
  }

  create(data) {
    return http.post("/ledger", data);
  }

  update(id, data) {
    return http.put(`/ledger/${id}`, data);
  }

  delete(id) {
    return http.delete(`/ledger/${id}`);
  }

}

export default new LedgerDataService();