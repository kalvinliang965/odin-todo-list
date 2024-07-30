import PROJECT from "./PROJECT.js";

export default function(parent) {
    const project_list=[];

    const default_id = 0;

    function add(project) {
        project_list.push(project);
    }

    function remove(id) {
        if (id === default_id) {
            alert("Not allow to remove default folder");
        } else {
            const index = project_list.findIndex(project => project.id === id);
            parent.removeChild(project_list[index].getDom());
            project_list.splice(index, 1);
        }
    }

    function get(id) {
        const index = project_list.findIndex(project => project.id === id);
        return project_list.get(index);
    }

    // get default project tag
    function getDefault() {
        return project_list[default_id];
    }
    return {
        add,
        remove,
        get,
        getDefault,
    }
}