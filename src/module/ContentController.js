import svgfile from "./svgHelper.js";

function load(parent, header) {

    const headerContainer=load_header(header)
    parent.appendChild(headerContainer);
    svgfile.load();
}

function load_header(header) {
    const headerContainer = document.createElement("div");
    headerContainer.className="header";
    headerContainer.textContent = header;
    return headerContainer;
}


function loadTask() {

}


export default {
    load,
}