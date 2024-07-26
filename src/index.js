import "./style.css";
import SidebarController from "./module/SidebarController";
import ContentController from "./module/ContentController";


(function main() {
    console.log("Hello, world");
    const body = document.querySelector("body");
    
    
    const sidebarController = SidebarController(body);
    sidebarController.load();
    const menu_btn = document.querySelector(`[data-type="menu"]`);

    menu_btn.addEventListener("click", ()=> {
        sidebarController.hide(body);
    });
})();

