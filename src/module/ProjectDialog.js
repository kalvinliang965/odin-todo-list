export default function() {
    const dialog = document.getElementById("addProjectDialog");
    const myForm = dialog.querySelector("form");
    const confirmBtn = dialog.querySelector(".confirmBtn");
    const cancelBtn = dialog.querySelector(".cancelBtn");
    const projectNameContainer = myForm.querySelector("#project-name");

    let projectName;

    function show() {
        dialog.showModal();
    }

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        projectName = projectNameContainer.value;

        console.log("Project name: " + projectName);

        myForm.reset();
        dialog.close();
    });

    cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        myForm.reset();
        dialog.close();
    });

    function getConfirmBtn() {
        return confirmBtn;
    }

    function getProjectName() {
        return projectName;
    }

    return {
        show,
        getProjectName,
        getConfirmBtn,
    }
}