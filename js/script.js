const commandInput = document.getElementById("commandInput");
const terminalContent = document.getElementById("terminal-content");
const IP = "http://localhost:8080";

if (commandInput && terminalContent) {
  commandInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = commandInput.value;
      if (command.trim() === "") {
        return;
      }
      terminalContent.innerHTML += "> " + command + "<br>";
      terminalContent.scrollTop = terminalContent.scrollHeight;
      commandInput.value = "";
    }
  });
}

const statusTexts = document.querySelectorAll(".server-status-text");
const statusElements = document.querySelectorAll(".server-status");

function updateServerStatus(status) {
  statusTexts.forEach((element) => {
    element.textContent = status;
  });
  statusElements.forEach((element) => {
    if (status === "online") {
      element.classList.remove("offline");
      element.classList.add("online");
    } else {
      element.classList.remove("online");
      element.classList.add("offline");
    }
  });
}

function serverApi(endpoint, method) {
  return fetch(IP + "/api/server" + endpoint, {
    method: method,
  });
  /*fetch(IP + "/api/server" + endpoint, {
    method: method,
  })
    .then((response) => response.json())
    .then((data) => {
      updateServerStatus(data.status);
    });*/
}

serverApi("/status", "GET")
  .then((response) => response.json())
  .then((data) => {
    updateServerStatus(data.status);
  });

const startBtn = document.querySelector(".btn-start");
const stopBtn = document.querySelector(".btn-stop");

function action(button, endpoint) {
  if (button) {
    button.addEventListener("click", async function () {
      try {
        const response = await serverApi(endpoint, "POST");
        button.disabled = true;
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }

        const data = await response.json();
        updateServerStatus(data.status);
      } catch (e) {
        console.log(e.message);
      } finally {
        button.disabled = false;
      }
    });
  }
}

action(startBtn, "/start");
action(stopBtn, "/stop");
