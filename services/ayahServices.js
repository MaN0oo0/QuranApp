document.title = `${localStorage.getItem("AppTitle")} | ayah`; // Set the title of the page
loadRandomAyah = () => {
    let number = Math.floor((Math.random() * 6236) + 1);
    $.ajax({
        url: `https://api.alquran.cloud/v1/ayah/${number}/ar.alafasy`,
        type: "get",

    }).done(function (server_data) {
        $(".ayahCell").html("")
        $(".SurahCell").html("")
        $(".SurahCell").html(`<h4 class="text-center">${server_data.data.surah.name}</h4>`)
        var btn = `<div id="_play"><button class="btn btn-info" id="play_${server_data.data.number}" data-route="${server_data.data.number}"><i class="fa fa-play"></i></button></div>`;
        $(".ayahCell").html(btn+server_data.data.text)
        $(`#play_${server_data.data.number}`).on("click", function () {
            var surahNumber = Number($(this).attr("data-route"));
            playAudio(surahNumber);
          });
    }).fail(function (jqXHR, status, err) {
        console.log("fail" + err);
    });

}
loadRandomAyah();

playAudio = (num) => {
    var player = `
          
          <audio controls>
  
  <source src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/${num}.mp3" type="audio/mp3">
  </audio>
          
          `;
  
    $("#_play").html(player);
  };
  