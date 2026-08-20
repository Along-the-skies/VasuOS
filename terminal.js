let terminalInput = document.querySelector(".terminal-input input");
let terminalOutput = document.querySelector(".terminal-output");

terminalInput.addEventListener("keydown",function(event){
    if (event.key != "Enter") {
        return;
    }

    let command = terminalInput.value.trim();
    terminalOutput.innerHTML +=`vasu@vasuos:~$${command}`

    if (command==="help"){
        terminalOutput.innerHTML +=`
        <p>Available commands:</p>
        <p>help - Show available commands</p>
        `;
    }

    terminalInput.value="";
})