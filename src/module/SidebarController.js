import svgfile from "./svgfile";


function info(type, msg, count) {
    return {
        type,
        msg,
        count,
    };
}
function load(body) {

    const sidebar = document.createElement("div");
    // the main container
    sidebar.className="sidebar";

    const header = createHeader(sidebar);
    sidebar.appendChild(header);
    

    sidebar.appendChild(createItem("Tasks",[
        info("calendarToday", "Today", 0),
        info("calendarTomorrow", "Tomorrow", 0),
        info("calendarWeek", "This Week", 0),
        info("checkMark", "Completed", 0),
    ]));

    sidebar.appendChild(createItem("Projects",[
        info("folder", "Default", 0),
        info("add", "Add Project", ""),
    ]));



    body.insertBefore(sidebar, body.firstChild);
    load_svg();
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
        console.log(info);
        itemContent.appendChild(createLine(info));    
    })
    item.appendChild(itemContent);

    return item;
}

function createLine(info) {
    const ret = document.createElement("button");
    ret.className="line";
    const content = document.createElement("div");
    content.className="content";
    const svg_container = document.createElement("div");
    svg_container.className="svg-container";
    svg_container.dataset.type=info.type;
    content.appendChild(svg_container);
    const msg = document.createElement("span");
    msg.textContent=info.msg;
    content.appendChild(msg);
    ret.appendChild(content);

    const countContainer = document.createElement("span");
    countContainer.className="count";
    countContainer.textContent=info.count;
    ret.appendChild(countContainer);
    return ret;
}
function load_svg(){
    document.querySelectorAll(".svg-container").
                forEach(svg => {
                    console.log(svg.dataset.type);
                    svg.innerHTML = svgfile[svg.dataset.type];
                });

}


export default {
    load,
    hide,
}