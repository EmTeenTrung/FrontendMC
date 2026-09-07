const commandInput = document.getElementById("commandInput");
const terminalContent = document.getElementById("terminal-content");

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

fetch("http://localhost:8080/api/server/status")
  .then((response) => response.json())
  .then((data) => {
    updateServerStatus(data.status);
  });

const startBtn = document.querySelector(".btn-start");

startBtn.addEventListener("click", function () {
  fetch("http://localhost:8080/api/server/start", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      updateServerStatus(data.status);
    });
});

const stopBtn = document.querySelector(".btn-stop");

stopBtn.addEventListener("click", function () {
  fetch("http://localhost:8080/api/server/stop", { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      updateServerStatus(data.status);
    });
});
