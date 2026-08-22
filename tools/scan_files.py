from pathlib import Path
import json


FILES_DIR = Path("Files")
OUTPUT_FILE = Path("js/filesystem.js")


SUPPORTED_TEXT = {
    ".txt",
    ".md",
    ".html",
    ".css",
    ".js",
    ".py",
    ".json",
    ".xml",
    ".csv"
}


SUPPORTED_IMAGES = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp"
}


def get_file_content(path):

    if path.suffix.lower() in SUPPORTED_IMAGES:

        return "[Image file]"

    try:

        return path.read_text(encoding="utf-8")

    except (UnicodeDecodeError, OSError):

        return "[File content not supported]"


def get_file_type(path):

    extension = path.suffix.lower()

    if extension in SUPPORTED_IMAGES:
        return "image"

    if extension in SUPPORTED_TEXT:
        return "text"

    return "unsupported"


def scan_directory(directory):

    items = []

    for path in sorted(directory.iterdir()):

        if path.is_dir():

            items.append({
                "name": path.name,
                "type": "folder",
                "children": scan_directory(path)
            })

        else:

            items.append({
                "name": path.name,
                "type": "file",
                "file_type": get_file_type(path),
                "path": path.as_posix(),
                "content": get_file_content(path)
            })

    return items


filesystem = scan_directory(FILES_DIR)


javascript = (
    "const fileSystem = "
    + json.dumps(filesystem, indent=4)
    + ";"
    + "\nexport { fileSystem };"
)


OUTPUT_FILE.write_text(
    javascript,
    encoding="utf-8"
)


print("Filesystem scanned successfully")
print(f"Generated: {OUTPUT_FILE}")