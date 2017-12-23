class DataRequest {
    constructor(datatype, userid, secret, all, includefinished) {
        this.type = "datarequest";
        this.datatype = datatype;
        this.userid = userid;
        this.secret = secret;
        this.all = all;
        this.includefinished = includefinished;
    }
};