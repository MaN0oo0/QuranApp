/**
 * 1- load nav bar
 * 2- load footer
 * 3- load side bar
 * 4- load renderBody
 */

import { Urls, ServicesUrl } from "./ComponentsURL.js";

//#region Nav Bar


const Render = (pageName, pageServices,) => {
  loader();
  $("#_renderBody").load(Urls[pageName].Url, function () {

    activeTab(pageName);
    document.title = `${localStorage.getItem("AppTitle")} | ${pageName}`;
    // Set Current Page
    changePage(pageName, pageServices);
    $.get(ServicesUrl[pageServices], function () {
      history.replaceState(null, '', location.pathname + location.search);
      if (interval > 0 && pageName != "ayah") {
        clearInterval(interval);
      };

    });
  });
}

const loadNavBar = function () {

  $("#_nav-bar").load(Urls.navbar.Url, () => {
    $("#navbarNavDropdown .navbar-nav .nav-item a").on("click", function (e) {

      let currntPage = JSON.parse(getCurrentPage());
      if (currntPage == null) {
        currntPage = {
          page: "home",
          service: "homeServices"
        }
      } else {
        if (currntPage.page == e.target.getAttribute("data-route")) {
          return;
        }
      }


      if (e.target.getAttribute("data-route")) {
        Render(e.target.getAttribute("data-route"), e.target.getAttribute("data-service"));
        if ($("#navbarNavDropdown").hasClass("show")) {
          $("#navbarNavDropdown").removeClass("show");
        }
      }
    });
  });
  $("#_renderBody").load(Urls.home.Url);
};
//#endregion

//#region Footer
const loadFooter = () => {
  const footer = document.getElementById("_footer");
  const footerHtml = $.get(Urls.footer.Url, function (r, e, f) {
    if (f.status == 200) {
      footer.innerHTML = footerHtml.responseText;
    }
  });
};

//#endregion

const loadCurrentPage = () => {
  var currntPage = JSON.parse(getCurrentPage());
  if (currntPage == null) {
    currntPage = {
      page: "home",
      service: "homeServices"
    }
  } else {

    Render(currntPage.page, currntPage.service);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  loadNavBar();
  loadFooter();
  loadCurrentPage();
  // localStorage.setItem('scriptRan', 'true');

});


