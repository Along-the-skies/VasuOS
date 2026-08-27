let windows = document.querySelectorAll(".window");

let filesButton = document.querySelector(".dock-item:nth-child(3)");
let terminalButton = document.querySelector(".dock-item:nth-child(4)");
let creditsButton = document.querySelector(".dock-item:nth-child(5)");
let creditsWindow = document.querySelector("#credits-window");


let terminalWindow = document.querySelector("#terminal-window");

let activeWindow = null;

let mouseOffsetX = 0;
let mouseOffsetY = 0;

let startWidth = 0;
let startHeight = 0;
let startMouseX = 0;
let startMouseY = 0;


function focusWindow(windowElement) {

    document.querySelectorAll(".window").forEach(function(otherWindow) {
        otherWindow.style.zIndex = "1";
    });

    windowElement.style.zIndex = "2";
}


function setDockRunning(dockItem, running) {

    if (running) {
        dockItem.classList.add("running");
    } else {
        dockItem.classList.remove("running");
    }

}


function resetWindow(windowElement) {

    windowElement.style.display = "none";

    windowElement.style.width = "";
    windowElement.style.height = "";
    windowElement.style.top = "";
    windowElement.style.left = "";
    windowElement.style.transform = "";

    windowElement.dataset.maximized = "false";
}


function moveWindow(event) {

    let newLeft = event.clientX - mouseOffsetX;
    let newTop = event.clientY - mouseOffsetY;

    let maxLeft =
        window.innerWidth - activeWindow.offsetWidth;

    let maxTop =
        window.innerHeight - activeWindow.offsetHeight;

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

    activeWindow.style.left = newLeft + "px";
    activeWindow.style.top = newTop + "px";
}


function resizeWindow(event) {

    let newWidth =
        startWidth + (event.clientX - startMouseX);

    let newHeight =
        startHeight + (event.clientY - startMouseY);

    activeWindow.style.width = newWidth + "px";
    activeWindow.style.height = newHeight + "px";
}


windows.forEach(function(windowElement) {

    let closeButton = windowElement.querySelector(
        ".window-controls button:last-child"
    );

    let maximizeButton = windowElement.querySelector(
        ".window-controls button:nth-child(2)"
    );

    let minimizeButton = windowElement.querySelector(
        ".window-controls button:first-child"
    );

    let windowHeader =
        windowElement.querySelector(".window-header");

    let resizeHandle =
        windowElement.querySelector(".resize-handle");


    closeButton.addEventListener("click", function() {

        if (windowElement.id === "files-window") {

            document.dispatchEvent(
                new Event("files-reset")
            );

            setDockRunning(filesButton, false);
        }


        if (windowElement.id === "terminal-window") {

            document.dispatchEvent(
                new Event("terminal-reset")
            );

            setDockRunning(terminalButton, false);
        }


        resetWindow(windowElement);

    });


    minimizeButton.addEventListener("click", function() {

        windowElement.style.display = "none";

    });


    maximizeButton.addEventListener("click", function() {

        if (windowElement.dataset.maximized === "true") {

            windowElement.style.width = "";
            windowElement.style.height = "";
            windowElement.style.top = "";
            windowElement.style.left = "";
            windowElement.style.transform = "";

            windowElement.dataset.maximized = "false";

        } else {

            windowElement.style.width = "100%";
            windowElement.style.height = "calc(100% - 42px)";
            windowElement.style.top = "42px";
            windowElement.style.left = "0";
            windowElement.style.transform = "none";

            windowElement.dataset.maximized = "true";

        }

    });


    windowHeader.addEventListener("mousedown", function(event) {

        activeWindow = windowElement;

        let windowPosition =
            windowElement.getBoundingClientRect();

        windowElement.style.left =
            windowPosition.left + "px";

        windowElement.style.top =
            windowPosition.top + "px";

        windowElement.style.transform = "none";

        mouseOffsetX =
            event.clientX - windowElement.offsetLeft;

        mouseOffsetY =
            event.clientY - windowElement.offsetTop;

        document.addEventListener(
            "mousemove",
            moveWindow
        );

    });


    resizeHandle.addEventListener("mousedown", function(event) {

        activeWindow = windowElement;

        let windowPosition =
            windowElement.getBoundingClientRect();

        windowElement.style.left =
            windowPosition.left + "px";

        windowElement.style.top =
            windowPosition.top + "px";

        windowElement.style.transform = "none";

        startWidth =
            windowElement.offsetWidth;

        startHeight =
            windowElement.offsetHeight;

        startMouseX = event.clientX;
        startMouseY = event.clientY;

        document.addEventListener(
            "mousemove",
            resizeWindow
        );

    });


    windowElement.addEventListener("mousedown", function() {

        focusWindow(windowElement);

    });

});


document.addEventListener("mouseup", function() {

    document.removeEventListener(
        "mousemove",
        moveWindow
    );

    document.removeEventListener(
        "mousemove",
        resizeWindow
    );

});


filesButton.addEventListener("click", function() {

    let filesWindow =
        document.querySelector("#files-window");

    filesWindow.style.display = "block";

    focusWindow(filesWindow);

    setDockRunning(filesButton, true);

});


terminalButton.addEventListener("click", function() {

    terminalWindow.style.display = "block";

    focusWindow(terminalWindow);

    setDockRunning(terminalButton, true);

});

creditsButton.addEventListener("click", function() {

    creditsWindow.style.display = "block";

    focusWindow(creditsWindow);

});


function setupViewerWindow(windowElement) {

    let closeButton = windowElement.querySelector(
        ".window-controls button:last-child"
    );

    let maximizeButton = windowElement.querySelector(
        ".window-controls button:nth-child(2)"
    );

    let minimizeButton = windowElement.querySelector(
        ".window-controls button:first-child"
    );

    let windowHeader =
        windowElement.querySelector(".window-header");

    let resizeHandle =
        windowElement.querySelector(".resize-handle");


    closeButton.addEventListener("click", function() {

        resetWindow(windowElement);

    });


    minimizeButton.addEventListener("click", function() {

        windowElement.style.display = "none";

    });


    maximizeButton.addEventListener("click", function() {

        if (windowElement.dataset.maximized === "true") {

            windowElement.style.width = "";
            windowElement.style.height = "";
            windowElement.style.top = "";
            windowElement.style.left = "";
            windowElement.style.transform = "";

            windowElement.dataset.maximized = "false";

        } else {

            windowElement.style.width = "100%";
            windowElement.style.height = "calc(100% - 42px)";
            windowElement.style.top = "42px";
            windowElement.style.left = "0";
            windowElement.style.transform = "none";

            windowElement.dataset.maximized = "true";

        }

    });


    windowHeader.addEventListener("mousedown", function(event) {

        activeWindow = windowElement;

        let windowPosition =
            windowElement.getBoundingClientRect();

        windowElement.style.left =
            windowPosition.left + "px";

        windowElement.style.top =
            windowPosition.top + "px";

        windowElement.style.transform = "none";

        mouseOffsetX =
            event.clientX - windowElement.offsetLeft;

        mouseOffsetY =
            event.clientY - windowElement.offsetTop;

        document.addEventListener(
            "mousemove",
            moveWindow
        );

    });


    resizeHandle.addEventListener("mousedown", function(event) {

        activeWindow = windowElement;

        let windowPosition =
            windowElement.getBoundingClientRect();

        windowElement.style.left =
            windowPosition.left + "px";

        windowElement.style.top =
            windowPosition.top + "px";

        windowElement.style.transform = "none";

        startWidth =
            windowElement.offsetWidth;

        startHeight =
            windowElement.offsetHeight;

        startMouseX = event.clientX;
        startMouseY = event.clientY;

        document.addEventListener(
            "mousemove",
            resizeWindow
        );

    });


    windowElement.addEventListener("mousedown", function() {

        focusWindow(windowElement);

    });


    focusWindow(windowElement);

}


document.addEventListener("window-created", function(event) {

    windows = document.querySelectorAll(".window");

    setupViewerWindow(event.detail);

});


import "./js/terminal.js";
import "./js/clock.js";
import "./js/startmenu.js";
import "./js/files.js";