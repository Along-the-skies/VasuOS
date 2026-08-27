import { fileSystem } from "./filesystem.js";

let filesContent = document.querySelector("#files-content");

let fileViewerWindow = document.querySelector("#file-viewer-window");
let fileViewerTitle = document.querySelector("#file-viewer-title");
let fileViewerContent = document.querySelector("#file-viewer-content");
let imageViewerWindow = document.querySelector("#image-viewer-window");
let imageViewerTitle = document.querySelector("#image-viewer-title");
let imageViewerImage = document.querySelector("#image-viewer-image");

function createViewerWindow(template) {
    let viewerWindow = template.cloneNode(true);

    viewerWindow.id = template.id + "-" + Date.now();

    document.querySelector("#desktop").appendChild(
        viewerWindow
    );

    return viewerWindow;
}



function openFile(file) {

    if (file.file_type === "image") {

        let viewerWindow =
            createViewerWindow(imageViewerWindow);

        viewerWindow.querySelector(
            "#image-viewer-title"
        ).innerText = file.name;

        viewerWindow.querySelector(
            "#image-viewer-image"
        ).src = file.path;

        viewerWindow.style.display = "block";

        viewerWindow.style.left = "160px";
        viewerWindow.style.top = "100px";

        document.dispatchEvent(
            new CustomEvent("window-created", {
                detail: viewerWindow
            })
        );

        return;
    }


    let viewerWindow =
        createViewerWindow(fileViewerWindow);

    let viewerTitle =
        viewerWindow.querySelector("#file-viewer-title");

    let viewerContent =
        viewerWindow.querySelector("#file-viewer-content");

    viewerTitle.innerText = file.name;

    if (file.file_type === "unsupported") {

        viewerContent.innerText =
            "File content not supported.";

    } else {

        viewerContent.innerText =
            file.content;

    }

    viewerWindow.style.display = "block";

    viewerWindow.style.left = "140px";
    viewerWindow.style.top = "90px";

    document.dispatchEvent(
        new CustomEvent("window-created", {
            detail: viewerWindow
        })
    );
}
function renderFiles(items) {

    filesContent.innerHTML = "";

    items.forEach(function(item) {

        let fileItem = document.createElement("div");

        fileItem.className = "file-item";

        if (item.type === "folder") {

            fileItem.classList.add("folder");

            fileItem.innerHTML = `
                <i class="fa-solid fa-folder"></i>
                <span>${item.name}</span>
            `;

            fileItem.addEventListener("click", function() {

                renderFolder(item);

            });

        } else {

            fileItem.classList.add("file");

            fileItem.innerHTML = `
                <i class="fa-solid fa-file"></i>
                <span>${item.name}</span>
            `;

            fileItem.addEventListener("click", function() {

                openFile(item);

            });

        }

        filesContent.appendChild(fileItem);

    });

}


function renderFolder(folder) {

    filesContent.innerHTML = `
        <button id="back-button">← Back</button>

        <h2>${folder.name}</h2>
    `;

    let backButton = document.querySelector("#back-button");

    backButton.addEventListener("click", function() {

        renderFiles(fileSystem);

    });


    folder.children.forEach(function(item) {

        let fileItem = document.createElement("div");

        fileItem.className = "file-item";

        if (item.type === "folder") {

            fileItem.classList.add("folder");

            fileItem.innerHTML = `
                <i class="fa-solid fa-folder"></i>
                <span>${item.name}</span>
            `;

        } else {

            fileItem.classList.add("file");

            fileItem.innerHTML = `
                <i class="fa-solid fa-file"></i>
                <span>${item.name}</span>
            `;

            fileItem.addEventListener("click", function() {

                openFile(item);

            });

        }

        filesContent.appendChild(fileItem);

    });

}


renderFiles(fileSystem);
function resetFiles() {
    renderFiles(fileSystem);
}
document.addEventListener("files-reset", function() {

    resetFiles();

});