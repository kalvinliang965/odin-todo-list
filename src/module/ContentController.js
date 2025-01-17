import svgfile from "./svgHelper.js";
import {isToday, isThisWeek, isTomorrow, endOfToday, isBefore, isWithinInterval, startOfDay, endOfWeek, endOfTomorrow, addWeeks, startOfWeek, endOfDay, addDays} from "date-fns";
import TodoContainer from "./TodoContainer.js";
import TaskDialog from "./TaskDialog.js";
import TODO from "./TODO.js";
import DATE from "./DATE.js";

export default function(parent) {
    
    const key = "myStorage";

    // this contain all TODO for the life time of the program
    let storage=[];

    // if (storageAvailable("localStorage")) {
    //     const item = JSON.parse(localStorage.getItem(key));
    //     console.log("item: " + item);
    //     console.log("item type: " + typeof(item));
    //     if (item === null) {
    //         storage = [];
    //     } else {
    //         console.log("storage avaiable");
    //         console.log(item);
    //         storage = item;
    //     }
    // } else  {
    //     // local storage not avaiable
    //     console.log("storage not avaiable");
    //     storage = [];
    // }

    // function storageAvailable(type) {
    //     let storage;
    //     try {
    //       storage = window[type];
    //       const x = "__storage_test__";
    //       storage.setItem(x, x);
    //       storage.removeItem(x);
    //       return true;
    //     } catch (e) {
    //       return (
    //         e instanceof DOMException &&
    //         e.name === "QuotaExceededError" &&
    //         // acknowledge QuotaExceededError only if there's something already stored
    //         storage &&
    //         storage.length !== 0
    //       );
    //     }
    //   }

    //   // save before exit
    //   window.addEventListener("beforeunload", (event)=> {
    //     event.preventDefault();    
    //     localStorage.setItem(JSON.stringify("myExample", storage));
    //     console.log("example: "  + JSON.parse(localStorage.get("myExample")));
    //     localStorage.setItem(key, JSON.stringify([]));
    //   });
    


    const taskDialog = TaskDialog();
    
    const DATE_TYPE = 0;
    const PROJECT_TYPE = 1;
    let todoContainer=null;


    function load() {
        // default is to load task that is due by end of today
        load_by_date(DATE.today);
    }
    

    function add_task(pageType, project, cond) {
        return function() {
            taskDialog.reset();
            taskDialog.show();

            const confirmBtn = taskDialog.getConfirmBtn();

            function confirmBtn_handler() {
                const newTodo=TODO(todoContainer.getDom(), taskDialog.getTitle(), taskDialog.getDate(),
                            taskDialog.getDescriptions(), taskDialog.getPriority(), project);
                
                newTodo.load();

                storage.push(newTodo);

                newTodo.getDom().querySelector(".complete-btn").addEventListener("click", () => {
                    newTodo.setCompleted(true);
                    todoContainer.getDom().removeChild(newTodo.getDom());
                });

                newTodo.getDom().querySelector(".remove-btn").addEventListener("click", ()=>{
                    for (let i = 0; i < storage.length; ++i) {
                        if (storage[i].getDom() === newTodo.getDom()) {
                            storage.splice(i, 1);
                        }
                    }
                    todoContainer.getDom().removeChild(newTodo.getDom());
                });

                confirmBtn.removeEventListener("click", confirmBtn_handler);

                // if condition is not met, we remove it
                if ((pageType===DATE_TYPE && !cond(newTodo.getDate())) || 
                        (pageType===PROJECT_TYPE && newTodo.getProject().getID() != project.getID())) {
            
                    todoContainer.getDom().removeChild(newTodo.getDom());
                } 

                if (pageType === PROJECT_TYPE) {
                    console.log("project added: " + project.getTitle());
                }

                console.log("pageType: " + ((pageType === PROJECT_TYPE)? "project type" : "date type"));
                console.log(pageType);

            }

            confirmBtn.addEventListener("click", confirmBtn_handler);
        }
        
    }


    function load_add_btn(pageType, project, cond) {
        const addBtn = document.createElement("button");
        addBtn.id="add-content-item";

        const svg_container = document.createElement("div");
        svg_container.className = "svg-container";
        svg_container.dataset.type = "add";

        const span = document.createElement("span");
        span.textContent = "Add Task";

        addBtn.appendChild(svg_container);
        addBtn.appendChild(span);
        addBtn.addEventListener("click", add_task(pageType, project, cond));
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
    
    // load the completed task
    function load_completed() {
        clear();

        load_header("Completed");

        todoContainer = TodoContainer(parent);
        todoContainer.load();
    
        storage.filter(task => task.getCompleted()).forEach((task) => {
            todoContainer.add(task);
        });
    }

    function load_by_date(date, project) {
        clear();
        if (date === DATE.today) {
            load_header("Today");
            todoContainer = TodoContainer(parent);
            todoContainer.load();
            // create the add btn
            load_add_btn(DATE_TYPE, project, (date) => {
                return isBefore(date,endOfToday(new Date()));
            });
            // get data from all storage..

            console.log("loading date...")
            console.log(storage);
            storage.filter(task => !task.getCompleted() && isToday(task.getDate())).forEach((task) => {
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
            load_add_btn(DATE_TYPE, project, (date) => {
                console.log("for tomorrow");
                return isWithinInterval(date, interval);
            });
            // get data from all storage..
            storage.filter(task => !task.getCompleted() && isTomorrow(task.getDate())).forEach((task) => {
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
            load_add_btn(DATE_TYPE, project, (date) => {
                console.log("for tomorrow");
                return isWithinInterval(date, interval);
            });
            // get data from storage..
            storage.filter(task => !task.getCompleted() && isWithinInterval(task.getDate(), interval)).forEach((task) => {
                todoContainer.add(task);
            });
        }  else if (date === DATE.planned) {
            load_header("Planned");
            console.log("planned");
            
            todoContainer = TodoContainer(parent);
            todoContainer.load();
            
            load_add_btn(DATE_TYPE, project, (date) => {
                return true;
            });
            // get data from storage..
            storage.filter(task => !task.getCompleted()).forEach((task) => {
                todoContainer.add(task);
            });

        } else {
            alert("Invalid date enter");
        }
        svgfile.load();
    }

    function load_by_project(project) {
        // check the tag
        clear();

        load_header(project.getTitle());
        console.log(project.getTitle());

        todoContainer = TodoContainer(parent);
        todoContainer.load();

        console.log(PROJECT_TYPE);
        load_add_btn(PROJECT_TYPE, project, undefined);
        
        console.log(storage);
        storage.filter(task => !task.getCompleted() && task.getProject().getID() === project.getID()).forEach((task) => {
            todoContainer.add(task);
        });

        svgfile.load();
    }

    function clear() {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    return {
        load_by_date,
        load_by_project,
        load_completed,
        load,
        clear,
    }
}