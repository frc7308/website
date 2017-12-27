class ResolveTaskRequest {
    constructor(taskid, userid, secret) {
        this.type = "resolvetaskrequest";
        this.taskid = taskid;
        this.userid = userid;
        this.secret = secret;
    }
};