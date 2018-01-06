var ws = new WebSocket('ws://34.216.198.44:7308');
console.log(ws);

function buttonLogin() {
  login(document.getElementById("username").value, document.getElementById("password").value);
}

function buttonAddUser(usersession) {
  if (document.getElementById("password").value === document.getElementById("confirmpassword").value)
    addUser(usersession.userid, usersession.secret, document.getElementById("username").value, document.getElementById("password").value);
  else
    document.getElementById("errmsg").innerHTML = "Passwords do not match. Please try again.";
}

function buttonAddTask(usersession) {
  if (document.getElementById("taskname").value != "")
    addTask(usersession.userid, usersession.secret, "general", document.getElementById("taskname").value);
}

function login(username, password) {
  var reqjson = JSON.stringify(new LoginRequest(username, password));
  ws.send(reqjson);
}

function addUser(userid, secret, username, password) {
  var reqjson = JSON.stringify(new AddUserRequest(userid, secret, username, password));
  ws.send(reqjson);
}

function addTask(userid, secret, tasktype, contents) {
  var reqjson = JSON.stringify(new AddTaskRequest(userid, secret, tasktype, contents));
  ws.send(reqjson);
}

function requestData(datatype, userid, secret, all, includefinished) {
  var reqjson = JSON.stringify(new DataRequest(datatype, userid, secret, all, includefinished));
  ws.send(reqjson);
}

function tasksPage(userid, secret, usersession, fade) {
  usersession.page = "tasks";

  if (fade) {
    document.getElementById("dashboard").className = "dashanim";
  } else {
    document.getElementById("dashboard").className = "dashanim-nofade";
  }

  document.getElementById("dashboard").innerHTML = "";

  var taskdiv = document.createElement("div");
  taskdiv.className = "fulltaskdiv";
  taskdiv.id = "taskdiv";
  taskdiv.innerHTML = "<center><p class=\"largetextsection\" style=\"padding-top: 15px; margin-bottom: 0px;\">Unresolved Tasks</p></center>";
  document.getElementById("dashboard").appendChild(taskdiv);

  var innertaskdiv = document.createElement("div");
  innertaskdiv.id = "innertaskdiv";
  document.getElementById("taskdiv").appendChild(innertaskdiv);

  var back = document.createElement("button");
  back.className = "normalbutton";
  back.onclick = function() { loadDash(userid, secret, usersession, true) };
  back.innerHTML = "Back";
  document.getElementById("taskdiv").appendChild(back);

  var resolved = document.createElement("button");
  resolved.className = "normalbutton";
  resolved.onclick = function() { resolvedTasksPage(userid, secret, usersession, true) };
  resolved.innerHTML = "Resolved";
  resolved.style.marginLeft = "10px";
  document.getElementById("taskdiv").appendChild(resolved);

  var addtask = document.createElement("div");
  addtask.id = "addtask";
  addtask.innerHTML = "<br><p class=\"textsection\">Add a task</p><p id=\"errmsg\"></p><input type=\"text\" id=\"taskname\" placeholder=\"Task name\" style=\"margin-right: 10px\"><button id=\"addthis\" class=\"normalbutton\">Add</button>";
  document.getElementById("taskdiv").appendChild(addtask);
  document.getElementById("addthis").onclick = function() { buttonAddTask(usersession) }

  requestData("task", userid, secret, true, false);
}

function resolvedTasksPage(userid, secret, usersession, fade) {
  usersession.page = "resolvedTasks";

  if (fade) {
    document.getElementById("dashboard").className = "dashanim";
  } else {
    document.getElementById("dashboard").className = "dashanim-nofade";
  }

  document.getElementById("dashboard").innerHTML = "";

  var taskdiv = document.createElement("div");
  taskdiv.className = "fulltaskdiv";
  taskdiv.id = "taskdiv";
  taskdiv.innerHTML = "<center><p class=\"largetextsection\" style=\"padding-top: 15px; margin-bottom: 0px;\">Resolved Tasks</p></center>";
  document.getElementById("dashboard").appendChild(taskdiv);

  var innertaskdiv = document.createElement("div");
  innertaskdiv.id = "innertaskdiv";
  document.getElementById("taskdiv").appendChild(innertaskdiv);

  var back = document.createElement("button");
  back.className = "normalbutton";
  back.onclick = function() { tasksPage(userid, secret, usersession, true) };
  back.innerHTML = "Back";
  document.getElementById("taskdiv").appendChild(back);

  requestData("task", userid, secret, true, true);
}

function addUserPage(userid, secret, usersession) {
  usersession.page = "addUserPage";
  document.getElementById("dashboard").innerHTML = "<br><p class=\"textsection\">Add a user to 7308 DeepVision</p><p id=\"errmsg\"></p><form><input type=\"text\" id=\"username\" placeholder=\"Username\"><br><br><input type=\"password\" id=\"password\" placeholder=\"Password\"><br><br><input type=\"password\" id=\"confirmpassword\" placeholder=\"Confirm Password\"><br><br></form><button id=\"submit\" class=\"normalbutton\">Submit</button>";
  document.getElementById("submit").onclick = function() { buttonAddUser(usersession) }
  var back = document.createElement("button");
  back.className = "normalbutton";
  back.onclick = function() { loadDash(userid, secret, usersession, true) };
  back.innerHTML = "Back";
  back.style.marginLeft = "10px";
  document.getElementById("dashboard").appendChild(back);
}

function userAddedPage(userid, secret, usersession) {
  usersession.page = "userAddedPage";
  document.getElementById("dashboard").innerHTML = "<br><p class=\"textsection\">User Successfully Added</p><button id=\"another\" class=\"normalbutton\" width=\"500px\">Add Another</button>";
  document.getElementById("another").onclick = function() { addUserPage(userid, secret, usersession, false) };
  var back = document.createElement("button");
  back.className = "normalbutton";
  back.onclick = function() { loadDash(userid, secret, usersession, true) };
  back.innerHTML = "Back";
  back.style.marginLeft = "10px";
  document.getElementById("dashboard").appendChild(back);
}

function loadDash(userid, secret, usersession, fade) {
  usersession.page = "home";

  if (fade) {
    document.getElementById("dashboard").className = "dashanim";
  } else {
    document.getElementById("dashboard").className = "dashanim-nofade";
  }

  document.getElementById("dashboard").innerHTML = "";
  var p = document.createElement("p");
  p.className = "largetextsection";
  p.innerHTML = "7308 User Dashboard";
  document.getElementById("dashboard").appendChild(p);

  var taskdiv = document.createElement("div");
  taskdiv.className = "taskdiv";
  taskdiv.id = "taskdiv";
  taskdiv.innerHTML = "<center><p class=\"largetextsection\" style=\"padding-top: 15px; margin-bottom: 0px;\">Active Tasks</p></center>";
  document.getElementById("dashboard").appendChild(taskdiv);

  var innertaskdiv = document.createElement("div");
  innertaskdiv.id = "innertaskdiv";
  document.getElementById("taskdiv").appendChild(innertaskdiv);

  var taskbutton = document.createElement("button");
  taskbutton.className = "normalbutton";
  taskbutton.onclick = function() { tasksPage(userid, secret, usersession, true) };
  taskbutton.innerHTML = "See All";
  document.getElementById("taskdiv").appendChild(taskbutton);

  if (usersession.userid == 0) {
    var adduserbutton = document.createElement("button");
    adduserbutton.className = "normalbutton";
    adduserbutton.onclick = function() { addUserPage(userid, secret, usersession, false) };
    adduserbutton.innerHTML = "Add User";
    adduserbutton.style.marginTop = "20px";
    adduserbutton.style.marginBottom = "5px";
    document.getElementById("dashboard").appendChild(adduserbutton);
  }

  requestData("task", userid, secret, false);
}

function requestTask(taskid, userid, secret) {
  var reqjson = JSON.stringify(new AssignEventRequest("task", taskid, userid, secret));
  ws.send(reqjson);
}

function resolveTask(taskid, userid, secret) {
  var reqjson = JSON.stringify(new ResolveTaskRequest(taskid, userid, secret));
  ws.send(reqjson);
}


function unresolveTask(taskid, userid, secret) {
  var reqjson = JSON.stringify(new UnresolveTaskRequest(taskid, userid, secret));
  ws.send(reqjson);
}

function loadTasks(data, usersession) {

  var elements = [];
  var parents = []
  if (data.length == 0) {
    var p = document.createElement("p");
    p.className = "textsection";
    p.color = "darkgray";
    p.innerHTML = "No tasks to display.";
    p.style.marginTop = "10px";
    p.style.marginBottom = "10px";
    elements.push(p);
    parents.push("innertaskdiv");
  }
  else if (data[0].type === "task") {
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.className = "codetask";
      div.id = "task#" + i;
      var p = document.createElement("p");
      p.innerHTML = data[i].contents;
      elements.push(div);
      parents.push("innertaskdiv");
      elements.push(p);
      parents.push("task#" + i);
      if ((data[i].userid == usersession.userid || data[i].open == true) && !data[i].resolved) {
        var button = document.createElement("button");
        if (data[i].userid == usersession.userid) {
          button.className = "remtaskbutton";
        } else {
          button.className = "addtaskbutton";
        }
        button.id = data[i].taskid;
        button.onclick = function() { requestTask(this.id, usersession.userid, usersession.secret); console.log("click"); };
        elements.push(button);
        parents.push("task#" + i);

        if (data[i].userid == usersession.userid) {
          var resolvebutton = document.createElement("button");
          resolvebutton.className = "resolvetaskbutton";
          resolvebutton.id = "resolve#" + data[i].taskid;
          resolvebutton.onclick = function() { resolveTask(parseInt(this.id.slice(-1)), usersession.userid, usersession.secret); console.log("click"); };
          elements.push(resolvebutton);
          parents.push("task#" + i);
        }
      }
      else if (data[i].resolved) {
        var unresolvebutton = document.createElement("button");
        unresolvebutton.className = "addtaskbutton";
        unresolvebutton.id = "unresolve#" + data[i].taskid;
        unresolvebutton.onclick = function() { unresolveTask(parseInt(this.id.slice(-1)), usersession.userid, usersession.secret); console.log("click"); };
        elements.push(unresolvebutton);
        parents.push("task#" + i);
      }
      else {
        var username = document.createElement("p");
        username.id = "usernametask";
        username.innerHTML = data[i].username;
        elements.push(username);
        parents.push("task#" + i);
      }
    }
  }
  document.getElementById("innertaskdiv").innerHTML = "";
  for (var i = 0; i < elements.length; i++) {
    document.getElementById(parents[i]).appendChild(elements[i]);
  }
}

var usersession = new UserSession(0, "", "home");

ws.onopen = function (event) {
  console.log("Connected to server");
};

ws.onmessage = function (msg) {
  var data = JSON.parse(msg.data);
  console.log(data);

  if (Object.prototype.toString.call(data) === '[object Array]') {
    loadTasks(data, usersession);
    if (document.getElementById("dashboard").className == "dashanim") {
      document.getElementById("dashboard").className = "maindiv";
    } else {
      document.getElementById("dashboard").className = "maindiv-nofade";
    }
  }

  else if (data.type === "loginresponse") {
    if (data.accepted == true) {

      usersession.userid = data.userid;
      usersession.secret = data.secret;
      console.log("Logged in");
      document.getElementById("dashboard").innerHTML = "<center><img class=\"loading\" src=\"https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif\"></center>";

      loadDash(usersession.userid, usersession.secret, usersession, true);

    } else {
      console.log("Login failed");
      document.getElementById("errmsg").innerHTML = "Login failed. Please try again.";
    }
  }

  else if (data.type === "assigneventresponse") {
    if (data.accepted) {
      if (data.removed == false) {
        document.getElementById(data.taskid).className = "remtaskbutton";
        if (usersession.page === "home") {
          loadDash(usersession.userid, usersession.secret, usersession, false);
        }
        if (usersession.page === "tasks") {
          tasksPage(usersession.userid, usersession.secret, usersession, false);
        }
      } else {
        document.getElementById(data.taskid).className = "addtaskbutton";
        if (usersession.page === "home") {
          loadDash(usersession.userid, usersession.secret, usersession, false);
        }
        if (usersession.page === "tasks") {
          tasksPage(usersession.userid, usersession.secret, usersession, false);
        }
      }
    }
  }

  else if (data.type === "resolvetaskresponse" || data.type === "unresolvetaskresponse") {
    if (data.accepted) {
      if (usersession.page === "home") {
        loadDash(usersession.userid, usersession.secret, usersession, false);
      }
      if (usersession.page === "tasks") {
        tasksPage(usersession.userid, usersession.secret, usersession, false);
      }
      if (usersession.page === "resolvedTasks") {
        resolvedTasksPage(usersession.userid, usersession.secret, usersession, false);
      }
    }
  }

  else if (data.type === "adduserresponse") {
    if (data.accepted) {
      userAddedPage(usersession.userid, usersession.secret, usersession);
    } else {
      document.getElementById("errmsg").innerHTML = "Error: Request not valid (username may be taken)";
    }
  }

  else if (data.type === "addtaskresponse") {
    if (data.accepted) {
      tasksPage(usersession.userid, usersession.secret, usersession, true);
    }
  }
};