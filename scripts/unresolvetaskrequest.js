class UnresolveTaskRequest {
    constructor(taskid, userid, secret) {
        this.type = "unresolvetaskrequest";
        this.taskid = taskid;
        this.userid = userid;
        this.secret = secret;
    }
};