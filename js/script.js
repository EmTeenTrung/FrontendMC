const commandInput = document.getElementById("commandInput");
const terminalContent = document.getElementById("terminal-content");

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
