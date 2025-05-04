
// import { togelebtn } from './js/GlobalActions.js';

const routes = {
    '/': {
        path: "/",
        title: 'الرائيسية',
        file: 'Pages/home.hbs',
        script: '/services/homeServices.js',
        data: {
            intro: "مقدمة",
            introText: "القرآن الكريم هو الكتاب المقدس في الإسلام، ويعتبر كلام الله الذي أنزل على النبي محمد صلى الله عليه وسلم. يتكون القرآن من 114 سورة، ويحتوي على آيات تتناول مواضيع متنوعة تشمل العقيدة، العبادة، الأخلاق، والتوجيهات الحياتية.",

        }
    },
    '/juz': {
        path: "/juz",
        title: 'الجزء',
        file: 'Pages/juz.hbs',
        script: '/services/juzServices.js',
        data: {
            intro: "إقرأ القرآن بالجزء",
            introText: "الجزء هو وحدة قياس في القرآن الكريم، حيث يتكون القرآن من 30 جزءًا. كل جزء يحتوي على عدد من السور والآيات. يتم تقسيم القرآن إلى أجزاء لتسهيل القراءة والحفظ.",
        }
    },
    '/ayah': {
        path: "/ayah",
        title: 'آية',
        file: 'Pages/ayah.hbs',
        script: '/services/ayahServices.js'
    },
    '/surah': {
        path: "/surah",
        title: 'سورة',
        file: '/Pages/surah.hbs',
        script: '/services/surahServices.js'
    },
    'AppName': "الْقُرْآن الْكَرِيْم"

};
const notFound = {
    title: '404 - Not Found',
    file: 'Pages/404.hbs'
};


function loadTemplate(url, data = {}) {

    return fetch(url)
        .then(res => res.text())
        .then(src => Handlebars.compile(src)(data));
}
function matchRoute(path) {
    for (const pattern in routes) {
        const regex = new RegExp('^' + pattern.replace(/:\w+/g, '(\\w+)') + '$');
        const match = path.match(regex);
        if (match) {
            const paramNames = [...pattern.matchAll(/:(\w+)/g)].map(m => m[1]);
            const params = {};
            paramNames.forEach((name, i) => params[name] = match[i + 1]);
            return { route: routes[pattern], params };
        }
    }
    return { route: notFound, params: {} };
}

function route(path) {
checkDropdown();
    const { route: r, params } = matchRoute(path);
    loadTemplate(r.file, getDataFromRoute(path)).then(html => {
        // loader();
        document.getElementById('_renderBody').innerHTML = html;
        document.title = r.title;
        setActiveLink(path);
        removePreviousScripts();
        if (r.scripts && Array.isArray(r.scripts)) {
            r.scripts.forEach(src => loadScript(src));
        }
        else if (r.script) {

            loadScript(r.script);
        }
        window.pageParams = params; // make accessible in page scripts
    });

}



function setActiveLink(path) {
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('data-route');
        link.parentElement.classList.toggle('activeTab', href === path);
    });
}
function navigate(e) {
    if (e.target.tagName === 'A' && e.target.closest('nav')) {
        e.preventDefault();
        const path = new URL(e.target.href).pathname;
        history.pushState({}, '', path);
        route(path);
    }
}

function loadScript(src) {
    const existing = document.querySelector(`script[data-page-script]`);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.src = src;
    // script.type = "module";
    script.setAttribute('data-page-script', 'true');
    document.body.appendChild(script);
}
function removePreviousScripts() {
    document.querySelectorAll('script[data-page-script]').forEach(s => s.remove());
}

const MainScripts = () => {
    let arr = [{ src: "/js/GlobalActions.js", type: "" }];
    arr.forEach((e) => {

        const script = document.createElement('script');
        script.type = e.type;
        script.src = e.src;
        script.setAttribute('data-Main-page-script', 'true');
        document.body.appendChild(script);
    }
    );
}
const MainStyles = () => {
    let arrstyles = [{ href: "/fonts/fontkitab.css" }, { href: "/css/main.css" }]
    arrstyles.forEach(style => {
        const link = document.createElement('link');
        link.href = style.href; link.rel = 'stylesheet';
        document.head.appendChild(link);
    });
}
const getDataFromRoute = (route) => {
    const data = routes[route];
    console.log(data);

    if (data) {
        return data.data;
    }
    return null;
}
Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 1; i <= n; ++i)
        accum += block.fn(i);
    return accum;
}); 
let checkDropdown = () => {
    if ($(".navbar-collapse").hasClass("collapse")) {
        $(".navbar-collapse").removeClass("collapse");
    } else {
        $(".navbar-collapse").addClass("collapse");
    }
}
window.addEventListener('popstate', () => route(location.pathname));
window.addEventListener('DOMContentLoaded', () => {
   

    loadTemplate('/partials/navbar.hbs', routes).then(html => {
        MainScripts();
        MainStyles();

        removePreviousScripts()
        document.getElementById('_nav-bar').innerHTML = html;
        loadTemplate('/partials/footer.hbs').then(html => {
            document.getElementById('_footer').innerHTML = html;
            // removePreviousScripts();
        });
        document.body.addEventListener('click', navigate);
        route(location.pathname);
     
    });
});
