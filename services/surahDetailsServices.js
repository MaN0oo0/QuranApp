const number = window.pageParams?.id;
loadSurahByNumber = (number) => {
    $("#Page_title").text("إقرأ القرآن بالسورة");

    $.ajax({
        url: ` ${loadBaseAssets().baseUrl}/surah/${number}`,
        type: "GET",
    })
        .done(function (server_data) {
            // loader();

            var btn = createTemp("div", [],
                [], createTemp("button",
                    ["btn", "btn-info"], [],
                    `<i class="fa fa-play"></i>`,
                    [{ key: "id", value: `play_${server_data.data.number}` },
                    { key: "data-route", value: server_data.data.number }]),
                [{ key: "id", value: "_play" }])
            var cartoona = createTemp("center", [], [],
                createTemp("h3", [], [], server_data.data.name,
                    [{
                        key: "id", value: `renderSurah_${server_data.data.number}`

                    }]));
            cartoona += btn;
            var ayah = "";
            $.each(server_data.data.ayahs, (i, e) => {


                ayah = createTemp(
                    "label",
                    ["text-wrap", "ayahtext"],
                    [],
                    e.text.replace(
                        "\n",
                        ""
                    ),
                );
                createTemp(
                    "span",
                    ["surah-bracket-sign"],
                    [],
                    `﴿${i + 1}﴾`,
                );
                createTemp(`br`);

                cartoona += ayah;
            });
            $("#renderSurah").removeClass("d-none");
            $("#renderSurah").html(cartoona);
            $(`#play_${server_data.data.number}`).on("click", function () {
                var surahNumber = Number($(this).attr("data-route"));
                // playAudio(surahNumber);
                loadPlayer(surahNumber);
            });
        })
        .fail(function (jqXHR, status, err) {
            console.log("fail" + err);
        });
};

loadSurahByNumber(number);