class AddUserRequest {
    constructor(username, password) {
        this.type = "adduserrequest";
        this.username = username;
        this.password = password;
    }
};