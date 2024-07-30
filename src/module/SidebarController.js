import svgHelper from "./svgHelper";
import ContentController from "./ContentController.js";
import { endOfTomorrow, addWeeks, startOfWeek } from "date-fns";
import DATE from "./DATE.js";
import ProjectDialog from "./ProjectDialog.js";
import ProjectList from "./ProjectList.js";
import PROJECT from "./PROJECT.js";

export default function(parent) {
    
    const sidebar = document.createElement("div");
    // the main container
    sidebar.className="sidebar";

    const projectDialog = ProjectDialog();

    const contentContainer = parent.querySelector(".content");
    const contentController = ContentController(contentContainer);
    contentController.load();

    const id_generator = (function(){
        let id = 0;
        return function() {
            return id++;
        }
    })();

    // list contain all tab
    const tab_lst = [];
    // list contain all project object
    let project_list;

    function create_tab(infos) {
        const ret = document.createElement("button");
        ret.className="line";
        const content = document.createElement("div");
        content.className="content";
        content.appendChild(svgHelper.createSvgContainer(infos.type));
        if (infos.msg) {
            const msg = document.createElement("span");
            msg.textContent=infos.msg;
            content.appendChild(msg);
        }

        ret.appendChild(content);

        if (infos.count) {
            const countContainer = document.createElement("span");
            countContainer.className="count";
            countContainer.textContent=info.count;
            ret.appendChild(countContainer);
        }

        return ret;
    }

    function reset_tab_except(tab, lst) {
        lst.forEach ((element) => {
            if (tab != element)
                element.className="line";
        })
    }

    function load() {
    
        const header = createHeader(sidebar);
        sidebar.appendChild(header);
        

        const todayBtn = create_tab(svgHelper.info("calendarToday", "Today", 0));
        const tomorrowBtn = create_tab(svgHelper.info("calendarTomorrow", "Tomorrow", 0));
        const thisWeekBtn = create_tab(svgHelper.info("calendarWeek", "This Week", 0));
        const plannedBtn = create_tab(svgHelper.info("calendar", "Planned", 0));
        const completedBtn = create_tab(svgHelper.info("checkMark", "Completed", 0));
        
        
        const defaultFolder = create_tab(svgHelper.info("folder", "Default", 0),);
        const addFolder = create_tab(svgHelper.info("add", "Add Project", 0));

        addFolder.addEventListener("click", addProject);

        // parent dom which contain all project
        const sidebar_item = createItem("Projects",[
            defaultFolder, addFolder,
        ]);

        project_list = ProjectList(sidebar_item);
        const defaultProject= PROJECT("Default", id_generator(), defaultFolder);
        project_list.add(defaultProject);

        defaultFolder.addEventListener("click", () => {
            defaultFolder.className="line active";
            reset_tab_except(defaultFolder, tab_lst);
            contentController.load_by_project(project_list.getDefault());
        });

        todayBtn.addEventListener("click", () => {
            console.log("Today btn is clicked");
            todayBtn.className="line active";
            reset_tab_except(todayBtn, tab_lst);
            contentController.load_by_date(DATE.today, project_list.getDefault());
        });
        tomorrowBtn.addEventListener("click", () => {
            console.log("tomorrow btn is clicked");
            tomorrowBtn.className="line active";
            reset_tab_except(tomorrowBtn, tab_lst);
            contentController.load_by_date(DATE.tomorrow, project_list.getDefault());
        });
        thisWeekBtn.addEventListener("click", () => {
            console.log("this week btn is clicked");
            thisWeekBtn.className="line active";
            reset_tab_except(thisWeekBtn, tab_lst);
            contentController.load_by_date(DATE.thisWeek, project_list.getDefault());
        });
        plannedBtn.addEventListener("click", () => {
            console.log("planned btn is clicked");
            plannedBtn.className="line active";
            reset_tab_except(plannedBtn, tab_lst);
            contentController.load_by_date(DATE.planned, project_list.getDefault());
        });
        completedBtn.addEventListener("click", () => {
            console.log("completed btn is clicked");
            completedBtn.className="line active";
            reset_tab_except(completedBtn, tab_lst);
            contentController.load_completed();
        });

        sidebar.appendChild(createItem("Tasks",[
            todayBtn, tomorrowBtn, thisWeekBtn, 
            plannedBtn, completedBtn,
        ]));

        sidebar.appendChild(sidebar_item);
        tab_lst.push(todayBtn, tomorrowBtn, thisWeekBtn, plannedBtn, completedBtn, defaultFolder);

        parent.insertBefore(sidebar, parent.firstChild);
        svgHelper.load();
    }
    
    function hide(body) {
        if (body.firstChild.className==="sidebar") {
            body.removeChild(body.firstChild);
        }
    }

    function addProject() {
        projectDialog.show();

        const confirmBtn = projectDialog.getConfirmBtn();

        function confirmBtn_handler() {
            const newProjectTab = create_tab(svgHelper.info("folder", projectDialog.getProjectName(), 0));
            const newProject = PROJECT(projectDialog.getProjectName(), id_generator(), newProjectTab);
            project_list.add(newProject);
            console.log("New project is created with ID: " + newProject.getID());
            tab_lst.push(newProjectTab);
            newProjectTab.addEventListener("click", ()=> {
                newProjectTab.className="line active";
                reset_tab_except(newProjectTab, tab_lst);
                contentController.load_by_project(newProject);
            })
            const itemContent = sidebar.querySelector(".item:last-child .item-content");
            itemContent.insertBefore(newProjectTab, itemContent.lastChild);
            confirmBtn.removeEventListener("click", confirmBtn_handler);
        }
        confirmBtn.addEventListener("click", confirmBtn_handler);
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
    
    function createItem(header, items) {
        const item = document.createElement("div");
        item.className="item";
    
        const headerContainer = document.createElement("div");
        headerContainer.className= "header";
        headerContainer.textContent=header;
        item.appendChild(headerContainer);
    
        const itemContent = document.createElement("div");
        itemContent.className = "item-content";
    
        items.forEach((item) => {
            itemContent.appendChild(item);    
        });

        item.appendChild(itemContent);
        return item;
    }

    return {
        load,
        hide,
        project_list,
    }
}


