import { fileSystem } from "./filesystem.js";

let filesContent = document.querySelector("#files-content");

let fileViewerWindow = document.querySelector("#file-viewer-window");
let fileViewerTitle = document.querySelector("#file-viewer-title");
let fileViewerContent = document.querySelector("#file-viewer-content");
let imageViewerWindow = document.querySelector("#image-viewer-window");
let imageViewerTitle = document.querySelector("#image-viewer-title");
let imageViewerImage = document.querySelector("#image-viewer-image");

function openFile(file) {

    if (file.file_type === "image") {

        imageViewerTitle.innerText = file.name;
        imageViewerImage.src = file.path;

        imageViewerWindow.style.display = "block";

        return;
    }


    fileViewerTitle.innerText = file.name;

    if (file.file_type === "unsupported") {

        fileViewerContent.innerText =
            "File content not supported.";

    } else {

        fileViewerContent.innerText = file.content;

    }

    fileViewerWindow.style.display = "block";
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