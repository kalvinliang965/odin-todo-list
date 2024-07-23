export default function() {

    const dialog = document.getElementById("addTaskDialog");

    function show() {
        console.log("show");
        dialog.showModal();
    }


    function hide(event) {
        event.preventDefault();
        dialog.close();
    }

    return {
        show,
        hide,
        text: "hello",
    }
}