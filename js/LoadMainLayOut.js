/**
 * 1- load nav bar
 * 2- load footer
 * 3- load side bar
 * 4- load renderBody
 */

import { Urls } from "./ComponentsURL.js";

//#region Nav Bar
const loadNavBar = function () {
  $("#_nav-bar").load(Urls.navbar.Url, () => {
    var nav = document.querySelectorAll("#navbarNavDropdown .navbar-nav li ");
    $("#navbarNavDropdown .navbar-nav .nav-item a").on("click", function (e) {
      console.log(e.target.getAttribute("data-route"));
      if (e.target.getAttribute("data-route")) {
        $("#_renderBody").load(Urls[e.target.getAttribute("data-route")].Url);
        if($("#navbarNavDropdown").hasClass("show")){
          $("#navbarNavDropdown").removeClass("show");
        }
      }
    });
  });

  //   const navBarHtml = $.get(Urls.navbar.Url, function (r, e, f) {
  //     if (f.status == 200) {
  //       navBar.innerHTML = navBarHtml.responseText;
  //       console.log(navBarHtml);
  //     }
  //   });

  $("#_renderBody").load(Urls.homeServices.Url);
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

document.addEventListener("DOMContentLoaded", function () {
  loadNavBar();
  loadFooter();
});
