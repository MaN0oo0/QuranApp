
loadJuz = () => {
  var juzCellContainer = $(".juzCellContainer");
  var cartoona = "";
  for (let index = 0; index < 30; index++) {
    cartoona += createTemp("div",
      ["col-md-3", "juzCell"], [],
      createTemp("b", [], "", " الجزء " + Number(index + 1)),
      [{ key: "data-route", value: Number( index + 1) }])
      ;
  }
  juzCellContainer.html(cartoona);
  $(".juzCellContainer .juzCell").on("click", function () {
    var juzNumber = Number($(this).attr("data-route"));
    loadSurahByJuz(juzNumber);
  });
};

loadJuz();

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
            [{ key: "href", value: `/surah/${surah.number}` },
            { key: "data-route", value: surah.number }]),
          [{ key: "data-route", value: surah.number }]);
      }
      $(".JuzCellSurah").html(temp);
      $(".juzCellContainer .Surahcell a").on("click", function () {
        $(this)
          .parent()
          .addClass("activeSurah")
          .siblings()
          .removeClass("activeSurah");
        
      });
    })
    .fail(function (jqXHR, status, err) {
      console.log("fail" + err);
    });
};



