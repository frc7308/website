class AddUserRequest {
    constructor(userid, secret, username, password) {
        this.type = "adduserrequest";
        this.userid;
        this.secret;
        this.username = username;
        this.password = password;
    }
};