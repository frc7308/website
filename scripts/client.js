var ws = new WebSocket('ws://34.216.198.44:7308');
console.log(ws);

function buttonLogin() {
  login(document.getElementById("username").value, document.getElementById("password").value);
}

function login(username, password) {
  var reqjson = JSON.stringify(new LoginRequest(username, password));
  ws.send(reqjson);
}

function requestData(datatype, userid, secret, all, includefinished) {
  var reqjson = JSON.stringify(new DataRequest(datatype, userid, secret, all, includefinished));
  console.log(reqjson);
  ws.send(reqjson);
}

function tasksPage(userid, secret, usersession, fade) {
  usersession.page = "tasks";

  if (fade) {
    document.getElementById("dashboard").className = "dashanim";
  } else {
    document.getElementById("dashboard").className = "dashanim-quickfade";
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

  requestData("task", userid, secret, true, false);
}

function resolvedTasksPage(userid, secret, usersession, fade) {
  usersession.page = "resolvedTasks";

  if (fade) {
    document.getElementById("dashboard").className = "dashanim";
  } else {
    document.getElementById("dashboard").className = "dashanim-quickfade";
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

function loadDash(userid, secret, usersession, fade) {
  usersession.page = "home";

  if (fade) {
    document.getElementById("dashboard").className = "dashanim";
  } else {
    document.getElementById("dashboard").className = "dashanim-quickfade";
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

  if (Object.prototype.toString.call(data) === '[object Array]') {
    loadTasks(data, usersession);
    if (document.getElementById("dashboard").className == "dashanim") {
      document.getElementById("dashboard").className = "maindiv";
    } else {
      document.getElementById("dashboard").className = "maindiv-quickfade";
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
};