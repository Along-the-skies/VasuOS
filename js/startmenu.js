let appLauncherWindow = document.querySelector("#app-launcher");
let appLauncherButton = document.querySelector(".dock-item:nth-child(1)");

appLauncherButton.addEventListener("click",function(){
    if (appLauncherWindow.style.display === "block"){
        appLauncherWindow.style.display = "none"
    } else {
        appLauncherWindow.style.display = "block"
    }
})