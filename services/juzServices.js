


$(".juzCellContainer .juzCell").on("click", function () {
  var juzNumber = Number($(this).attr("data-route"));
  loadSurahByJuz(juzNumber);
});
// loadJuz();

loadSurahByJuz = (juzId) => {
  $.ajax({
    url: `${loadBaseAssets().baseUrl}/juz/${juzId}`,
    type: "GET",
  })
    .done(function (server_data) {
      // loader();
      $(".JuzCellSurah").html("");
      var temp = "";

      for (let key in server_data.data.surahs) {
        var surah = server_data.data.surahs[key];

        temp += createTemp("div",
          ["col-md-3", "Surahcell"],
          [], createTemp("a", ["text-decoration-none"], [], surah.name,
            [
              { key: "data-route", value: surah.number }], { key: "id", value: `surah_${surah.number}` }),
          [{ key: "data-route", value: surah.number }]);
      }
      $(".JuzCellSurah").html(temp);
      $(".juzCellContainer .Surahcell a").on("click", function () {
        $(this)
          .parent()
          .addClass("activeSurah")
          .siblings()
          .removeClass("activeSurah");
        loadSurah(Number($(this).attr("data-route")));
      });
    })
    .fail(function (jqXHR, status, err) {
      console.log("fail" + err);
    });
};


var Container = document.getElementById("renderSurah");
CreateChosenSurahTemp = (server_data) => {
  var btn = /*html*/`
  <div id="_play"><button class="btn btn-info" id="play_${server_data.data.number}" data-route="${server_data.data.number}"><i class="fa fa-play"></i></button></div>`;
  var cartoona = /*html*/`<div style="display: flex
;
    width: 100%;
    justify-content: space-between;
    flex-direction: row-reverse;"><div class="text-start ">
    <a id="_PrevBtn"  
      class="btn btn-primary ${server_data.data.number - 1 == 0 ? "disabled" : ""}" onclick="loadSurah(${server_data.data.number - 1})">رجوع</a></div>
      <div class="text-end ">
       <a  
       onclick="loadSurah(${server_data.data.number + 1})"
       id="_NextBtn" class="btn btn-primary ${server_data.data.number == 114 ? "disabled" : ""}">التالي</a></div></div> 
      <center>
        <h3 id="renderSurah_${server_data.data.number}">${server_data.data.name}</h3></center>`;
  cartoona += btn;
  var ayah = "";
  $.each(server_data.data.ayahs, (i, e) => {
    ayah = /*html*/ ` <label class="text-wrap ayahtext" >${e.text.replace(
      "\n",
      ""
    )}</label>
        <span class="surah-bracket-sign">﴿${i + 1}﴾</span>

`;

    cartoona += ayah;
  });


  Container.innerHTML += cartoona;
  Container.classList.remove("d-none");
  $(`#play_${server_data.data.number}`).on("click", function () {
    var surahNumber = Number($(this).attr("data-route"));
    loadPlayer(surahNumber);
  });
};
loadSurah = (num) => {
  loader();
  $.ajax({
    url: `https://api.alquran.cloud/v1/surah/${num}`,
    type: "GET",
  })
    .done(function (server_data) {

      Container.innerHTML = "";
      CreateChosenSurahTemp(server_data);
    })
    .fail(function (jqXHR, status, err) {
      console.log("fail" + err);
    });
};
