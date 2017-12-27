class AssignEventRequest {
    constructor(eventtype, eventid, userid, secret) {
        this.type = "assigneventrequest";
        this.eventtype = eventtype;
        this.eventid = eventid;
        this.userid = userid;
        this.secret = secret;
    }
};