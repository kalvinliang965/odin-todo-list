import myDate from "./myDate.js";

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
    })

    cancelBtn.addEventListener("click", ()=>{
        myForm.reset();
    })

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
        date = myDate(myForm.querySelector("#due-date").value);

        // element read
        console.log("title: " + title);
        descriptions.forEach(e => {console.log("bulletpoints: " + e)});
        console.log("Priority: " + priority);
        console.log("date: " + date.toString());

        myForm.reset();
        dialog.close();
    }

    function show() {
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

    return {
        show,
        getTitle,
        getDate,
        getDescriptions,
        getPriority,
    }
}