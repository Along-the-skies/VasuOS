let clock = document.querySelector("#clock");

function updateClock(){
    let now = new Date();

    let hours = now.getHours().toString().padStart(2,"0");
    let minutes = now.getMinutes().toString().padStart(2,"0");

    clock.textContent = `${hours}:${minutes}`;
}

updateClock();

setInterval(updateClock,1000)