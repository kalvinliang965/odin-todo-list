import "./style.css";
import SidebarController from "./module/SidebarController";
import ContentController from "./module/ContentController";


(function main() {
    console.log("Hello, world");
    const body = document.querySelector("body");
    
    
    SidebarController.load(body);
    const menu_btn = document.querySelector(`[data-type="menu"]`);

    menu_btn.addEventListener("click", ()=> {
        SidebarController.hide(body);
    });

    const contentContainer = body.querySelector("body > .content");
    const contentController = ContentController(contentContainer);
    contentController.load();
})();

