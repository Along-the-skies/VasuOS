let terminalInput = document.querySelector(".terminal-input input");
let terminalOutput = document.querySelector(".terminal-output");

terminalInput.addEventListener("keydown",function(event){
    if (event.key !== "Enter") {
        return;
    }

    let command = terminalInput.value.trim();
    let parts = command.split(" ");
    command = parts[0];
    let action = parts.slice(1).join(" ");


    terminalOutput.innerHTML +=`
    <br>
    vasu@vasuos:~$ ${command}
    `

    if (command==="help"){
        terminalOutput.innerHTML +=`
        <p>Available commands:</p>
        <p>help - Show available commands</p>
        <p>clear - Clean up terminal</p>
        <p>echo - echo what you typed</p>
        `;
    } else if (command === "clear"){
        terminalOutput.innerHTML = `
        <h3>VasuOS Terminal</h3>
        Type <strong>help</strong> to see available commands.`;
    } else if (command === "echo") {
        terminalOutput.innerHTML += `
        <p>system:${action}</p>`
    } else if (command == "banana") {
        terminalOutput.innerHTML += `
        <p>🍌</p>`
    } else {
        terminalOutput.innerHTML += `
        <p>Command not found: ${command}</p>`
    }

    terminalInput.value="";
})