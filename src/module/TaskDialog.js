
import {format, endOfDay} from "date-fns";

export default function() {

    const dialog = document.getElementById("addTaskDialog");

    const myForm = dialog.querySelector("form");
    const confirmBtn = dialog.querySelector(".confirmBtn");
    const cancelBtn = dialog.querySelector(".cancelBtn");
    const bulletpoints = myForm.querySelector(".bulletpoints");
    const addBtn = myForm.querySelector("#taskDialog-add");
    
    let title;
    let descriptions = [];      
    let date;
    let priority;

    
    
    addBtn.addEventListener("click", ()=> {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "text";
        input.value="task";
        li.appendChild(input);
        bulletpoints.append(li);
    });

    cancelBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        myForm.reset();
        dialog.close();
    });

    confirmBtn.addEventListener("click", read_input);
    
    function read_input(e) {
        e.preventDefault();

        title = myForm.querySelector("#title").value;
        // get all the bullet points
        bulletpoints.querySelectorAll("li").forEach((target) => {
            const inputElement = target.querySelector("input");
            descriptions.push(inputElement.value);
        });
        priority = myForm.querySelector("#priority").value;

        const date_list = myForm.querySelector("#due-date").value.split("-");
        const year = date_list[0];
        const month = date_list[1];
        const day = date_list[2];
        // MONTH is 0-index
        date = new Date(year, month - 1, day);

        // element read
        console.log("title: " + title);
        descriptions.forEach(e => {console.log("bulletpoints: " + e)});
        console.log("Priority: " + priority);
        console.log(date);
        console.log("date: " + format(date, "MM-dd-yyyy"));

        myForm.reset();
        dialog.close();
    }

    function show() {
        // default value of date to TODAY
        const due_date = myForm.querySelector("#due-date");
        due_date.value = format(endOfDay(new Date()), "yyyy-MM-dd");
        dialog.showModal();
    }

    function getTitle() {
        return title;
    }

    const getDescriptions = () => {
        return descriptions;
    }

    const getDate = () => {return date;}

    const getPriority = () => {
        return priority;
    }

    const getConfirmBtn = () => {
        return confirmBtn;
    }

    const reset = () => {
        title = undefined;
        descriptions = [];      
        date = undefined;
        priority = undefined;

        while (bulletpoints.children.length > 1) {
            bulletpoints.removeChild(bulletpoints.lastChild);
        }
    }

    return {
        reset,
        show,
        getTitle,
        getDate,
        getDescriptions,
        getPriority,
        getConfirmBtn,
    }
}