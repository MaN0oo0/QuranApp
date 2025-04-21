
// loadAyah = (number) => {
//   $.ajax({
//     url: ` ${loadBaseAssets().baseUrl}/surah/${number}`,
//     type: "get",
//   })
//     .done(function (server_data) {
//       $.each(server_data.data.ayahs, (i, e) => {
//         var ayah = ` <label class="text-wrap ayahtext" >${e.text.replace(
//           "\n",
//           ""
//         )}</label>
//         <span class="surah-bracket-sign">﴿${i + 1}﴾</span>
//         `;
//         $(".ayahCell").html(ayah);
//       });
//       $(".lead").html(server_data.data.text);
//     })
//     .fail(function (jqXHR, status, err) {
//       console.log("fail" + err);
//     });
// }

// window.setInterval(() => {
//   let number = Math.floor(Math.random() * 118 + 1);
//   loadAyah(number)
// }, 5000);
// loadAyah(2);
