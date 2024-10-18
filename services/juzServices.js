
    document.title = `${localStorage.getItem("AppTitle")} | juz`
    loadJuz = () => {
        var juzCellContainer = $(".juzCellContainer");
        var cartoona = "";
        for (let index = 0; index < 30; index++) {
            cartoona += `
    <div class="col-md-3 juzCell" data-route=${index + 1}>
    <b>الجزء  ${index + 1}</b>

</div>

`;
        }
        juzCellContainer.html(cartoona);
        $(".juzCellContainer .juzCell").on("click", function () {
            var juzNumber = Number($(this).attr("data-route"));
            loadSurahByJuz(juzNumber);
        })

    }



    loadJuz();


    loadSurahByJuz = (juzId) => {
        $.ajax({
            url: `http://api.alquran.cloud/v1/juz/${juzId}`,
            type: "GET",

        }).done(function (server_data) {
            $(".JuzCellSurah").html('')
            var temp = "";

            for (let key in server_data.data.surahs) {
                var surah = server_data.data.surahs[key];


                temp += `
                
                    <div class="col-md-3  Surahcell" data-route=${surah.number}>
    <a class="text-decoration-none " href='#renderSurah_${surah.number}'  data-route=${surah.number}>  ${surah.name}</a>

</div>
                ` ;


            }
            $(".JuzCellSurah").html(temp);
            $(".juzCellContainer .Surahcell a").on("click", function () {

                $(this).parent().addClass("activeSurah").siblings().removeClass("activeSurah")
                var juzNumber = Number($(this).attr("data-route"));
                loadSurahByNumber(juzNumber);
            })

        }).fail(function (jqXHR, status, err) {
            console.log("fail" + err);
        });

    }

    loadSurahByNumber = (number) => {

        $("#Page_title").text("إقرأ القرآن بالسورة");

        $.ajax({
            url: ` http://api.alquran.cloud/v1/surah/${number}`,
            type: "GET",

        }).done(function (server_data) {
            var btn = `<div id="_play"><button class="btn btn-info" id="play_${server_data.data.number}" data-route="${server_data.data.number}"><i class="fa fa-play"></i></button></div>`;
            var cartoona = `<center><h3 id="renderSurah_${server_data.data.number}">${server_data.data.name}</h3></center>`;
            cartoona += btn;
            var ayah = "";
            $.each(server_data.data.ayahs, (i, e) => {



                ayah = ` <label class="text-wrap ayahtext" >${e.text.replace('\n', '')}</label>
                <span class="surah-bracket-sign">﴿${i + 1}﴾</span>
          
      
        <br/>
`;

                cartoona += ayah;
            })
            $("#renderSurah").removeClass("d-none")


            $("#renderSurah").html(cartoona);
            $(`#play_${server_data.data.number}`).on("click", function () {
                var surahNumber = Number($(this).attr("data-route"));
                playAudio(surahNumber);

            })
        }).fail(function (jqXHR, status, err) {
            console.log("fail" + err);
        });

    }

    playAudio = (num) => {
        var player = `
            
            <audio controls>

<source src="https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${num}.mp3" type="audio/mp3">
</audio>
            
            `;

        $("#_play").html(player);
    }

