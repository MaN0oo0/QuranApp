
// This file contains the functions to load random Ayah and play audio for it.
// It uses jQuery to make AJAX requests to the Quran API and manipulate the DOM.
loadRandomAyah = () => {
    let number = Math.floor((Math.random() * 6236) + 1);
    $.ajax({
        url: `https://api.alquran.cloud/v1/ayah/${number}/ar.alafasy`,
        type: "get",
    }).done(function (server_data) {
        loader();
        $(".ayahCell").html("")
        $(".SurahCell").html("")
        // { tagName, classess, styles, innerHTML, attr }
        $(".SurahCell").append(`${createTemp("h4", ["text-center"], "", server_data.data.surah.name)}`)
        // var btn = `<div id="_play"><button class="btn btn-info" id="play_${server_data.data.number}" data-route="${server_data.data.number}"><i class="fa fa-play"></i></button></div>`;
        var btn = createTemp("div", [], [], createTemp("button", ["btn", "btn-info"], [], `<i class="fa fa-play"></i>`, [{ key: "data-route", value: server_data.data.number }, { key: "id", value: `play_${server_data.data.number}` }]), [{ key: "id", value: "_play" }]);

        $(".ayahCell").html(btn + server_data.data.text)
        $(`#play_${server_data.data.number}`).on("click", function () {
            var surahNumber = Number($(this).attr("data-route"));
            playAudio(surahNumber);

        });
    }).fail(function (jqXHR, status, err) {
        console.log("fail" + err);

    });

}
interval = setInterval(() => {
    loadRandomAyah();
}
    , 10000);
loadRandomAyah();

playAudio = (num) => {
    clearInterval(interval);
    loadPlayer(num, "ayah");
    var audio = document.querySelector("audio");
    audio.onloadedmetadata = () => {

        setTimeout(() => {
            setInterval(() => {
                loadRandomAyah();
            }
                , 100000);
        }, Math.floor(audio.duration + 3) * 1000);
        // duration in seconds
    };
};
