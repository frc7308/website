class AddTaskRequest {
    constructor(userid, secret, tasktype, contents) {
        this.type = "addtaskrequest";
        this.userid = userid
        this.secret = secret;
        this.tasktype = tasktype;
        this.contents = contents;
    }
};