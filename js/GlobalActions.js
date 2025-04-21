// Global Variables
localStorage.setItem("AppTitle", "Quran App");
signs = localStorage.getItem("Signs") ? JSON.parse(localStorage.getItem("Signs")) : [{}];
interval = 1;
// Global Functions
loader = () => {
    let loader = document.createElement("div");
    loader.className = "loader";
    loader.innerHTML = `<img src="../Images/lg.gif" alt="Loading...">`;
    document.body.appendChild(loader);
    setTimeout(() => {
        document.body.removeChild(loader);
    }, 500);
}
loadBaseAssets = () => {
    return {
        baseUrl: "https://api.alquran.cloud/v1",
        audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy",
        audioAyahUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy",
    }
}
loadPlayer = (num, type) => {
    const playerArea = document.getElementById("_play");
    playerArea.innerHTML = "";
    const audio = document.createElement("audio");
    audio.setAttribute("controls", "controls");
    audio.setAttribute("autoplay", "autoplay");
    audio.setAttribute("preload", "auto");
    if (type == "ayah") {
        audio.setAttribute("src", `${loadBaseAssets().audioAyahUrl}/${num}.mp3`);
    }
    else {
        audio.setAttribute("src", `${loadBaseAssets().audioUrl}/${num}.mp3`);
    }
    playerArea.appendChild(audio);
}
activeTab = (tab) => {
    let tabs = document.querySelectorAll("#navbarNavDropdown .navbar-nav .nav-item ");
    tabs.forEach((e) => {
        e.classList.remove("activeTab");
    });
    // tab.parentElement.classList.add("activeTab");
    document.querySelector(`[data-route="${tab}"]`).parentElement.classList.add("activeTab");
}
addSign = (e) => {
    $(e).on("click", function () {
        var Name = $(this).data("name");
        var number = $(this).data("number");
        signs.push({
            name: Name,
            number: number
        });
        localStorage.setItem("Signs", JSON.stringify(signs));
        $(this).addClass("addSign");
    });
}
changePage = (page, service) => {
    localStorage.setItem("CurrntPage", JSON.stringify({ "page": page, "service": service }));
}
getCurrentPage = () => {
    return localStorage.getItem("CurrntPage");
}


createTemp = (tagName = "", classess = [], styles = [], innerHTML = "", attr = [{}]) => {


    var temp = document.createElement(tagName);


    if (classess) {
        classess.forEach((e) => {
            temp.classList.add(e);
        })
    }

    if (styles) {
        styles.forEach((e) => {
            var [key, value] = e.split(":");
            temp.style[key] = value;
        })
    }


    if (innerHTML) {
        temp.innerHTML = innerHTML;
    }
    if (attr) {
        attr.forEach((e) => {
            temp.setAttribute(e.key, e.value);
        }
        )
    }
    return temp.outerHTML;
}
togelebtn = () => {

    document.querySelector(".navbar-toggler-icon").addEventListener("click", function () {

        if (document.querySelector(".navbar-collapse").classList.contains("collapse")) {
            document.querySelector(".navbar-collapse").classList.remove("collapse");
        } else {
            document.querySelector(".navbar-collapse").classList.add("collapse");
        }

    })
}
togelebtn();