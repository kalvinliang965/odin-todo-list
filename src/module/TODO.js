import Bulletpoint from "./Bulletpoint.js"
import svgHelper from "./svgHelper.js";


export default function(parent, title, date, priority) {

    // to make the list 1-index
    const bulletpoint_list = [];

    /*
        expect
        <div class="content-item"></div>
    */
    const container = document.createElement("div");
    container.className="content-item";
    
    const getDom = () => {
        return container;
    }
    
    const getTitle = () => {
        return title;
    }

    const getDate = () => {
        return date.toString();
    }

    const getPriority = () => {
        return priority.toString();
    }
    /*
        this function expect to create something like this
        <div class="content-item">
                <div class="headline">
                    <div class="left">
                        title1
                    </div>

                    <div class="right">
                        <div class="date">
                            date
                        </div>
                        <button>
                            <div class="svg-container" data-type="dots">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    <hr>
                </div>  
        </div>
    */
    function load() {
        const headerContainer = createHeader();
        container.appendChild(headerContainer);
        // add the line break
        parent.appendChild(document.createElement("hr"));
    }

    /*
        expect:

        <div class="headline">
            <div class="left">
                title1
            </div>
            <div class="right">
                <div class="date">
                    date
                </div>

                <button>
                    <div class="svg-container" data-type="dots">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>

    */
    function createHeader() {
        const headerContainer = document.createElement("div");
        headerContainer.className="headline";

        const left = document.createElement("div");
        left.className="left";
        left.textContent=title;
        headerContainer.appendChild(left);

        const right = document.createElement("div");
        right.className="right";

        const dateContainer = document.createElement("div");
        dateContainer.className = "date";
        dateContainer.textContent = date;
        right.appendChild(dateContainer);

        right.appendChild(svgHelper.createSvgContainer(svgHelper.info(dots)));

        headerContainer.appendChild(right);
        return headerContainer;
    }

    /** 
    *   expect to add bulletpoint
    *
    *   <button class="bullet-point">
    *       <input type="checkbox" checked>
    *       <div>Bullet one</div>
    *   </button>
    */
    function add(description) {
        const bulletpoint = Bulletpoint(container, description);
        bulletpoint.load();
        bulletpoint_list.push(bulletpoint.getDom());
    }

    /**
     * @description     remove bulletpoint
     * @param index     0-index, the position of the dom inside the list
     */
    function remove(index) {
        if (0 <= index && index < bulletpoint_list.length) {
            container.removeChild(container.children[index + 2]);
            bulletpoint_list.splice(index, 1);
        } else {
            console.log("Invalid length enter to remove at TODO.js");
        }
    }

    /**
     *  get a bulletpoint 
     */
    function get(index) {
        if (0 <= index && index < bulletpoint_list.length) {
            return bulletpoint_list[index];
        }
        console.log("Invalid index enter to get() at TODO.js");
        return null;
    }

    return {
        getTitle,
        getDate,
        get,
        load,
        getPriority,
        remove,
        add,
        getDom
    }
}