class AddUserRequest {
    constructor(userid, secret, username, password) {
        this.type = "adduserrequest";
        this.userid = userid;
        this.secret = secret;
        this.username = username;
        this.password = password;
    }
};