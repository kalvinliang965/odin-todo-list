import TODO from "./TODO.js";

export default function(parent, title) {

    const todo_list = [];

    /*
        expect: 

        <div class="content-item-container"></div>
    */
    const container = document.createElement("div");
    container.className="content-item-container";
    
    const getDom = () => {
        return container;
    }

    const getTitle = () => {
        return title;
    }
    
    function load() {
        parent.appendChild(container);
    }

    /*
        This function expect to create something like this
    */
    function add(container, title, date, priority) {
        const newTODO = TODO(container, title, date, priority);
        newTODO.load();
        todo_list.push(newTODO);
    }

    function remove(index) {
        if (0 <= index && index < todo_list.length) {
            container.removeChild(container.children[index]);
            todo_list.splice(index, 1);
        } else {
            console.log("Invalid index enter to remove at TODO.js");
        }
    }

    function get(index) {
        if (0 <= index && index < todo_list.length) {
            return todo_list[index];
        } else {
            console.log("Invalid index enter to get() for todolist");
            return null;
        }
    }
    return {
        get,
        getTitle,
        load,
        add,
        remove,
        getDom,
    }
}