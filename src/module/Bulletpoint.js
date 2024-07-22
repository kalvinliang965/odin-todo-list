
export default function(parent, description) {

    const dom  = document.createElement("button");
    dom.className="bullet-point";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    dom.appendChild(checkbox);

    const descriptionContainer = document.createElement("div");
    descriptionContainer.textContent = description;
    dom.appendChild(descriptionContainer);

    const getDom = () => {
        return dom;
    }

    function load() {
        parent.appendChild(dom());
    }
    return {
        getDom,
        load,
    }
}