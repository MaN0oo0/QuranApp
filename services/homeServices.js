document.title = `${localStorage.getItem("AppTitle")} | Quran`;
window.setInterval(() => {
  let number = Math.floor(Math.random() * 6236 + 1);
  $.ajax({
    url: `https://api.alquran.cloud/v1/ayah/${number}/ar.alafasy`,
    type: "get",
  })
    .done(function (server_data) {
      $(".lead").html(server_data.data.text);
    })
    .fail(function (jqXHR, status, err) {
      console.log("fail" + err);
    });
}, 20000);
