import svgHelper from "./svgHelper";

function load(body) {

    const sidebar = document.createElement("div");
    // the main container
    sidebar.className="sidebar";

    const header = createHeader(sidebar);
    sidebar.appendChild(header);
    

    sidebar.appendChild(createItem("Tasks",[
        svgHelper.info("calendarToday", "Today", 0),
        svgHelper.info("calendarTomorrow", "Tomorrow", 0),
        svgHelper.info("calendarWeek", "This Week", 0),
        svgHelper.info("calendar", "Future", 0),
        svgHelper.info("checkMark", "Completed", 0),
    ]));

    sidebar.appendChild(createItem("Projects",[
        svgHelper.info("folder", "Default", 0),
        svgHelper.info("add", "Add Project", ""),
    ]));

    body.insertBefore(sidebar, body.firstChild);
    svgHelper.load();
}


function hide(body) {
    if (body.firstChild.className==="sidebar") {
        body.removeChild(body.firstChild);
    }
}


function createHeader() {

    const item = document.createElement("div");
    item.className="item";

    const left = document.createElement("div");
    left.className="left";
    let svg_container = document.createElement("div");
    svg_container.className="svg-container";
    svg_container.dataset.type="profile";
    left.appendChild(svg_container); 
    const span = document.createElement("span");
    span.textContent = "Welcome !";
    left.appendChild(span);
    item.appendChild(left);

    const menu_btn = document.createElement("button");
    menu_btn.className="menu-btn";
    svg_container = document.createElement("div");
    svg_container.className = "svg-container";
    svg_container.dataset.type="menu";
    menu_btn.appendChild(svg_container);
    item.appendChild(menu_btn);

    return item;
}

function createItem(header, infos) {
    const item = document.createElement("div");
    item.className="item";

    const headerContainer = document.createElement("div");
    headerContainer.className= "header";
    headerContainer.textContent=header;
    item.appendChild(headerContainer);

    const itemContent = document.createElement("div");
    itemContent.className = "item-content";

    infos.forEach((info) => {

        itemContent.appendChild(svgHelper.createSvgContainer(info));    
    })
    item.appendChild(itemContent);
    return item;
}



export default {
    load,
    hide,
}