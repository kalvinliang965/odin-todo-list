import svgfile from "./svgHelper.js";
import {isToday, isThisWeek, isTomorrow, endOfToday, isBefore, isWithinInterval, startOfDay, endOfWeek, endOfTomorrow, addWeeks, startOfWeek, endOfDay, addDays} from "date-fns";
import TodoContainer from "./TodoContainer.js";
import TaskDialog from "./TaskDialog.js";
import TODO from "./TODO.js";
import DATE from "./DATE.js";

export default function(parent) {
    

    // this contain all TODO for the life time of the program
    const allTasks = [];
    const taskDialog = TaskDialog();
    
    const DATE_TYPE = 0;
    const PROJECT_TYPE = 1;
    let todoContainer=null;
    let tag = "Default";

    
    
    
    function load() {
        // default is to load task that is due by end of today
        load_by_date(DATE.today);
    }
    

    function add_task(pageType, cond) {
        console.log("add Task is use");
        return function() {
            taskDialog.reset();
            taskDialog.show();

            const confirmBtn = taskDialog.getConfirmBtn();

            function confirmBtn_handler() {
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

                confirmBtn.removeEventListener("click", confirmBtn_handler);

                console.log("cond: " + cond);
                console.log("newTodo meet cond: " + cond(newTodo.getDate()));
                // if condition is not met, we remove it
                if ((pageType===DATE_TYPE && !cond(newTodo.getDate())) || 
                        (pageType===PROJECT_TYPE && newTodo.getTag() != tag)) {
            
                    todoContainer.getDom().removeChild(newTodo.getDom());
                } 

            }

            confirmBtn.addEventListener("click", confirmBtn_handler);
        }
        
    }


    function load_add_btn(pageType, cond) {
        const addBtn = document.createElement("button");
        addBtn.id="add-content-item";

        const svg_container = document.createElement("div");
        svg_container.className = "svg-container";
        svg_container.dataset.type = "add";

        const span = document.createElement("span");
        span.textContent = "Add Task";

        addBtn.appendChild(svg_container);
        addBtn.appendChild(span);
        addBtn.addEventListener("click", add_task(pageType, cond));
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
        clear();

        if (date === DATE.today) {
            load_header("Today");
            todoContainer = TodoContainer(parent);
            todoContainer.load();
            // create the add btn
            load_add_btn(DATE_TYPE, (date) => {
                return isBefore(date,endOfToday(new Date()));
            });
            // get data from all allTasks..

            console.log("loading date...")
            console.log(allTasks);
            allTasks.filter(task => !task.getCompleted() && isToday(task.getDate())).forEach((task) => {
                todoContainer.add(task);
            });

        } else if (date === DATE.tomorrow) {
            load_header("Tomorrow");
            todoContainer = TodoContainer(parent);
            todoContainer.load();

            const interval = {
                start: startOfDay(endOfTomorrow(new Date())),
                end: endOfTomorrow(new Date()),
            }
            
            // create the add btn
            load_add_btn(DATE_TYPE, (date) => {
                console.log("for tomorrow");
                return isWithinInterval(date, interval);
            });
            // get data from all allTasks..
            allTasks.filter(task => !task.getCompleted() && isTomorrow(task.getDate())).forEach((task) => {
                todoContainer.add(task);
            });
        } else if (date === DATE.thisWeek) {
            load_header("This Week");
            todoContainer = TodoContainer(parent);
            todoContainer.load();

            const interval = {
                start: startOfDay(addDays(startOfWeek(new Date()), 1)),
                end: endOfDay(addWeeks(startOfWeek(new Date()), 1)),
            }
            
            // create the add btn
            load_add_btn(DATE_TYPE, (date) => {
                console.log("for tomorrow");
                return isWithinInterval(date, interval);
            });
            // get data from allTasks..
            allTasks.filter(task => !task.getCompleted() && isWithinInterval(task.getDate(), interval)).forEach((task) => {
                todoContainer.add(task);
            });
        }  else if (date === DATE.planned) {
            load_header("Planned");
            console.log("planned");
            
            todoContainer = TodoContainer(parent);
            todoContainer.load();
            
            load_add_btn(DATE_TYPE, (date) => {
                return true;
            });
            // get data from allTasks..
            allTasks.filter(task => !task.getCompleted()).forEach((task) => {
                todoContainer.add(task);
            });

        } else {
            alert("Invalid date enter");
        }
        svgfile.load();
    }

    function load_by_tag(tag) {
        // check the tag

        load_header(tag);

        allTasks.filter();
        svgfile.load();
    }

    function clear() {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return {
        load_by_date,
        load_by_tag,
        load,
        clear,
    }
}