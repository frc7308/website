class LoginRequest {
    constructor(username, password) {
        this.type = "loginrequest";
        this.username = username;
        this.password = password;
    }
};