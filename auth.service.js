import http from "../http-common";

class AuthService {
  async signIn(email_id, pass) {
    const response = await http.post("/auth", {
      email: email_id, pwd: pass
    });
    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return http.post("/auth/register", { email: email, name: username, pwd: password });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();