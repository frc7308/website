class UserSession {
    constructor(userid, secret, page) {
        this.type = "usersession";
        this.userid = userid;
        this.secret = secret;
        this.page = page;
    }
};