//load Surahs first


var Container = document.querySelector(".surahContainer");
loadSurahs = () => {
  $.ajax({
    url: `${loadBaseAssets().baseUrl}/surah`,
    type: "GET",
  })
    .done(function (server_data) {
      Container.innerHTML = "";
      $.each(server_data.data, (i, e) => {
        Container.innerHTML += CreateSurahTemp(
          e.number,
          e.name,
          e.numberOfAyahs
        );
      });
    })
    .fail(function (jqXHR, status, err) {
      console.log("fail" + err);
    });
};
loadSurahs();

//#region Helpers


CreateSurahTemp = (Id, Name, numberOfAyahs) => {
  var Temp = `<div onclick="loadSurah(
${Id}
  )" class="col-md-3 align-items-center d-flex gap-2 flex-row  Surahcell" data-route=${Id} style="border-radius:20px;">
    <a  class="text-decoration-none p-2"   data-route=${Id}>  ${Name}</a>
   <span>(${numberOfAyahs})ايات</span>
    </div>
                `;
  return Temp;
};
CreateChosenSurahTemp = (server_data) => {
  var btn = `<div id="_play"><button class="btn btn-info" id="play_${server_data.data.number}" data-route="${server_data.data.number}"><i class="fa fa-play"></i></button></div>`;
  var cartoona = `<div style="display: flex
;
    width: 100%;
    justify-content: space-between;
    flex-direction: row-reverse;"><div class="text-start "><a onclick="loadSurah(${server_data.data.number > 0 ? server_data.data.number - 1 : 1})" href="#renderSurah_${server_data.data.number > 0 ? server_data.data.number - 1 : 1}"  class="btn btn-primary ${server_data.data.number - 1 == 0 ? "disabled" : ""}">رجوع</a></div><div class="text-end "><a onclick="loadSurah(${server_data.data.number < 114 ? server_data.data.number + 1 : 114})" href="#renderSurah_${server_data.data.number < 118 ? server_data.data.number + 1 : 114}"  class="btn btn-primary ${server_data.data.number == 114 ? "disabled" : ""}">التالي</a></div></div> <center><h3 id="renderSurah_${server_data.data.number}">${server_data.data.name}</h3></center>`;
  cartoona += btn;
  var ayah = "";
  $.each(server_data.data.ayahs, (i, e) => {
    ayah = ` <label class="text-wrap ayahtext" >${e.text.replace(
      "\n",
      ""
    )}</label>
        <span class="surah-bracket-sign">﴿${i + 1}﴾</span>

`;

    cartoona += ayah;
  });


  Container.innerHTML += cartoona;
  $(`#play_${server_data.data.number}`).on("click", function () {
    var surahNumber = Number($(this).attr("data-route"));
    loadPlayer(surahNumber);
  });
};
loadSurah = (num) => {
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
//#endregion
