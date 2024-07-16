import svgfile from "./svgfile";

function load() {
    load_svg();
}

function load_svg(){
    document.querySelectorAll(".svg-container").
                forEach(svg => {
                    svg.innerHTML = svgfile[svg.dataset.type];
                });

}

export default {
    load,
}