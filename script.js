let closeButton = document.querySelector(".window-controls button:last-child");
let windowElement = document.querySelector(".window");
let maximizeButton = document.querySelector(".window-controls button:nth-child(2)");
let minimizeButton = document.querySelector(".window-controls button:first-child");
let filesButton = document.querySelector(".dock-item:nth-child(3)");
let windowHeader = document.querySelector(".window-header");
let mouseOffsetX = 0;
let mouseOffsetY = 0;

let resizeHandle = document.querySelector(".resize-handle");
let startWidth = 0;
let startHeight = 0;
let startMouseX = 0;
let startMouseY = 0;


function moveWindow(event) {

    let newLeft = event.clientX - mouseOffsetX;
    let newTop = event.clientY - mouseOffsetY;

    let maxLeft = window.innerWidth - windowElement.offsetWidth;
    let maxTop = window.innerHeight - windowElement.offsetHeight;

    if (newLeft < 0) {
        newLeft = 0;
    }

    if (newTop < 42) {
        newTop = 42;
    }

    if (newLeft > maxLeft) {
        newLeft = maxLeft;
    }

    if (newTop > maxTop) {
        newTop = maxTop;
    }

    windowElement.style.left = newLeft + "px";
    windowElement.style.top = newTop + "px";

}

function resizeWindow(event){
    let newWidth=startWidth + (event.clientX - startMouseX);
    let newHeight = startHeight + (event.clientY - startMouseY);

    windowElement.style.width = newWidth + "px";
    windowElement.style.height = newHeight + "px"
}



closeButton.addEventListener("click",function(){
    console.log("Close button clicked");
    windowElement.style.display="none";
})

maximizeButton.addEventListener("click",function(){
    windowElement.style.width = "100%";
    windowElement.style.height = "calc(100% - 42px)";
    windowElement.style.top = "42px";
    windowElement.style.left="0";
    windowElement.style.transform = "none"
})

minimizeButton.addEventListener("click", function() {

    windowElement.style.display = "none";

});

filesButton.addEventListener("click",function(){
    windowElement.style.display = "block"
})

windowHeader.addEventListener("mousedown", function(event) {
    let windowPosition = windowElement.getBoundingClientRect();

    windowElement.style.left = windowPosition.left + "px";
    windowElement.style.top = windowPosition.top + "px";
    windowElement.style.transform = "none";


    mouseOffsetX = event.clientX - windowElement.offsetLeft;
    mouseOffsetY = event.clientY - windowElement.offsetTop;

    document.addEventListener("mousemove", moveWindow);

});

document.addEventListener("mouseup", function() {

    document.removeEventListener("mousemove", moveWindow);

});

resizeHandle.addEventListener("mousedown", function(event) {

    let windowPosition = windowElement.getBoundingClientRect();

    windowElement.style.left = windowPosition.left + "px";
    windowElement.style.top = windowPosition.top + "px";
    windowElement.style.transform = "none";

    startWidth = windowElement.offsetWidth;
    startHeight = windowElement.offsetHeight;

    startMouseX = event.clientX;
    startMouseY = event.clientY;

    
    document.addEventListener("mousemove", resizeWindow);
    document.addEventListener("mouseup",function(){
        document.removeEventListener("mousemove", resizeWindow);
    })
});

