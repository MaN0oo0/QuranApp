var Obj = { Name: "", Url: "", Option: "" };

//#region  Components
var NavBar = "/Components/navbarComponent.html";
var Footer = "/Components/footerComponent.html";
var Home = "/Components/homeComponent.html";
var Juz = "/Components/juzComponent.html";
var Surah = "/Components/surahComponent.html";
var Ayah = "/Components/ayahComponent.html";

export var Urls = {
  navbar: {
    Name: "navbar",
    Url: NavBar,
    Option: "",
  },
  footer: {
    Name: "footer",
    Url: Footer,
    Option: "",
  },
  home: {
    Name: "home",
    Url: Home,
    Option: "",
  },
  juz: {
    Name: "juz",
    Url: Juz,
    Option: "",
  },
  surah: {
    Name: "surah",
    Url: Surah,
    Option: "",
  },
  ayah: {
    Name: "ayah",
    Url: Ayah,
    Option: "",
  },
};

//#endregion

//#region Services
var JuzServices = "/services/juzServices.js";
var SurahServices="/services/surahServices.js";
var AayahServices="/services/ayahServices.js";
var HomeServices="/services/homeServices.js";
export var ServicesUrl = {
  juzServices: JuzServices,
  surahServices: SurahServices,
  ayaServices:AayahServices,
  homeServices:HomeServices,
};

//#endregion
