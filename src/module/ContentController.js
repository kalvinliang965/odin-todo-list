import svgfile from "./svgHelper.js";
import {isToday, isThisWeek, isTomorrow, endOfToday } from "date-fns";
import TodoContainer from "./TodoContainer.js";
import TaskDialog from "./TaskDialog.js";
import TODO from "./TODO.js";

export default function(parent) {
    

    // this contain all TODO for the life time of the program
    const allTasks = [];
    const taskDialog = TaskDialog();
    
    let todoContainer=null;
    let tag = "Default";

    taskDialog.getConfirmBtn().addEventListener("click", () => {
        const newTodo=TODO(todoContainer.getDom(), taskDialog.getTitle(), taskDialog.getDate(),
                    taskDialog.getDescriptions(), taskDialog.getPriority(), tag);
        
        newTodo.load();

        allTasks.push(newTodo);

        newTodo.getDom().querySelector(".complete-btn").addEventListener("click", () => {
            newTodo.setCompleted(true);
            todoContainer.getDom().removeChild(newTodo.getDom());
        });

        newTodo.getDom().querySelector(".remove-btn").addEventListener("click", ()=>{
            for (let i = 0; i < allTasks.length; ++i) {
                if (allTasks[i].getDom() === newTodo.getDom()) {
                    allTasks.splice(i, 1);
                }
            }
            todoContainer.getDom().removeChild(newTodo.getDom());
        });
    });
    
    
    function load() {
        // default is to load task that is due by end of today
        load_by_date(endOfToday());

        // create the add btn
        load_add_btn();

        svgfile.load();
    }
    

    function add_task() {
        taskDialog.reset();
        taskDialog.show();
    }


    function load_add_btn() {
        const addBtn = document.createElement("button");
        addBtn.id="add-content-item";

        const svg_container = document.createElement("div");
        svg_container.className = "svg-container";
        svg_container.dataset.type = "add";

        const span = document.createElement("span");
        span.textContent = "Add Task";

        addBtn.appendChild(svg_container);
        addBtn.appendChild(span);
        addBtn.addEventListener("click", add_task);
        parent.appendChild(addBtn);
    }

    function load_header(header) {
        const headerContainer = document.createElement("div");
        headerContainer.className="header";
        headerContainer.textContent = header;
        parent.appendChild(headerContainer);

        load_sort_options();
    }

    function load_sort_options() {
        const btnContainer = document.createElement("div");
        btnContainer.className = "button-container";
        const allBtn = document.createElement("button");
        allBtn.textContent = "ALL";
        const sortBtn = document.createElement("button");
        sortBtn.textContent = "Sort";
        btnContainer.appendChild(allBtn);
        btnContainer.appendChild(sortBtn);
        parent.appendChild(btnContainer);
    }
    
    
    function load_by_date(date) {

        if (isToday(date)) {
            load_header("Today");
            todoContainer = TodoContainer(parent);
            todoContainer.load();

            // get data from all allTasks..

        } else if (isThisWeek(date)) {

        } else if (isTomorrow(date)) {

        } else {
            // future

        }
    }

    function load_by_tag(tag) {
        // check the tag

        load_header(tag);

        allTasks.filter()
    }

    return {
        load,
    }
}