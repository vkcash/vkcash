"use strict";
var socket, openbox, sound_open, sound_close, sound_scroll, volume, case_in_process = false;

window.addEventListener("load", function() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  /** REF SYSTEM
   *
   * НЕПОНЯТНО БЛЯТЬ?
   *
   */

/* Responsive navigation */ 
$(".nav-button").click(function(){ 
var status = $(".nav ul").css("display"); 

if (status == 'none') { 
$(".nav ul").fadeIn(0); 
} 
else { 
$(".nav ul").fadeOut(100); 
} 
});

  var ref = document.location.search.match(/ref=([a-z0-9]+)/i);
  var refcode = "";
  if (ref && ref.length > 1) {
    refcode = ref[1];
    localStorage.setItem("ref", ref[1]);
  }
  if (refcode.length || localStorage.getItem("ref")) {
    refcode = refcode || localStorage.getItem("ref");
    $.get("/ref/" + refcode, function(response) {
      if (response && response.done) {
        localStorage.removeItem("ref");
      }
    });
  }

  socket = io(sockethost, {
    forceNew: true
  });
  socket.on("connect", function() {
    // alert("CONNECTED");
    socket.emit("auth", {
      vkid: vkid,
      salt: salt
    });
  });

  socket.on("auth_success", function() {
    // alert("AUTH SUCCESS");
  });

  socket.on("auth_fail", function() {
    // alert("AUTH FAIL");
  });

  socket.on("err", function(data) {
    // alert("error code "+data.code);
    var messages = {
      "-1": "Вы были забанены",
      "3": "Недостаточно монет на счету"
    };
    if (data.code == 3) {
      case_in_process = false;
      popupOpen('#deposit');
      $("#depositbalance").val(
        caseinfo.price + parseFloat($(".chance input:checked").data("price") || 0) - $("#balance").html()
      );
    }
    toastr.error(messages[data.code] || "Неизвестная ошибка");
  });

  socket.on("prize", function(data) {
    openbox.start(data.id);
  });

  socket.on("stats_update", function(data) {
    // var csns = $.animateNumber.numberStepFactories.separator(",");
    $('#stat_online').html(data.online + 41);
    $('#stat_opened').html(data.opened);
    $('#stat_users').html(data.users);
    // $("#stat_online").animateNumber({
    //   number: data.online,
    //   numberStep: csns
    // }, 500);
    // $("#stat_opened").animateNumber({
    //   number: data.opened,
    //   numberStep: csns
    // }, 500);
    // $("#stat_users").animateNumber({
    //   number: data.users,
    //   numberStep: csns
    // }, 500);
  });

  socket.on("liveprize", function(data) {
    var block = $("<div class=\"b\">" +
      "<div class=\"winner-box eas\">" +
      "<div class=\"winner eas\">" +
      "<div class=\"userpic\">" +
      "<a href=\"/profile/" + data.vkid + "\">" +
      "<img src=\"" + data.img + "\">" +
      "</a></div></div></div>" +
      "<img class=\"coin\" src=\"" + data.prize.live + "\" alt=\"" + data.prize.value + "\">" +
      "</div>")
    $(block).hide();
    setTimeout(function() {
        $("#live-prize-box").prepend(block);
        $(block).fadeIn(1000);
        if ($("#live-prize-box .b").length > 15) $("#live-prize-box .b").last().remove();
    }, 3000);
  });

    socket.on("liveprize", function(data) {
    var block = "<div class=\"b\">" +
      "<div class=\"prize_small\">" +
      "<img src=\"" + data.prize.live + "\" alt=\"" + data.prize.value + "\">" +
      "<a href=\"/profile/" + data.vkid + "\">" +
      "<div class=\"hover\"> <img class=\"hover_avatar\" src=\"" + data.img + "\"></div></a></div></div>";
    $(".livefeed .prize-list").prepend(block);
    if ($(".livefeed .prize-item").length > 15) $(".livefeed .prize-item").last().remove();
  });

  socket.on("balance", function(data) {
    console.log("BALANCE UPDATE", data);
    $("#balance").html(data || 0);
  });

  $("input[type=checkbox]").change(function() {
    if (this.checked) {
      var check = $("input[type=checkbox]");
      for (var i = 0; i < check.length; i++)
        if (check[i] != this)
          check[i].checked = false;
    }
  });

  $(".chance input").on("change", function() {
    $("#caseprice").html(caseinfo.price + parseFloat($(".chance input:checked").data("price") || 0));
  });

  

  if ($(".ruletka").length) {
    openbox = new casebox(caseinfo.prizes, 9000, 60);
    sound_open = new Sound(snd_open);
    sound_close = new Sound(snd_close);
    sound_scroll = new Sound(snd_scroll);
    volume = (localStorage.getItem("muted") || "false") == "false";

    $("#volume_" + (volume ? "off" : "up")).hide();
    $("#volume_up").on("click", function() {
      localStorage.setItem("muted", "true");
      volume = false;
      $(this).hide();
      $("#volume_off").show();
      sound_close.sound.volume = volume ? 0.5 : 0;
      sound_open.sound.volume = volume ? 0.6 : 0;
      sound_scroll.sound.volume = volume ? 0.8 : 0;
    });
    $("#volume_off").on("click", function() {
      localStorage.setItem("muted", "false");
      volume = true;
      $(this).hide();
      $("#volume_up").show();

      sound_close.sound.volume = volume ? 0.5 : 0;
      sound_open.sound.volume = volume ? 0.6 : 0;
      sound_scroll.sound.volume = volume ? 0.8 : 0;
    });

    sound_close.sound.volume = volume ? 0.5 : 0;
    sound_open.sound.volume = volume ? 0.6 : 0;
    sound_scroll.sound.volume = volume ? 0.8 : 0;
  }


$(".tab").click(function(){
    var tabId = $(this).data("tab-id");
    $(".tab-container").fadeOut(0);
    $(".tab-container-"+tabId).fadeIn(500);
    $(".tab").removeClass("active");
    $(".tab-"+tabId).addClass("active");
  });



  withdrawform.addEventListener("submit", function(event) {
    event.preventDefault();
    var b = parseFloat(withdrawbalance.value);
    var c = withdrawsystem.value;
    var e = $(".w-d.active").data("v") || "";
    if (isNaN(b) || b < 9 || b > 15000) return toastr.warning("Недопустимая сумма");
    if (e != "webmoney" && e != "yandex" && e != "qiwi") return toastr.warning("Выберите платёжную систему");
    $.get("/withdraw", {
      b: b,
      c: c,
      e: e
    }, function(response) {
      if (response) {
        if (response.success) {
          toastr.success("Ваш запрос добавлен в очередь. Средства будут начислены в течение 24 часов.");
          $("#withdraw").modal("hide");
          $("#balance").html(parseFloat($("#balance").html()) - (parseFloat(withdrawbalance.value) || 0));
        } else {
          toastr.error(response.error);
        }
      }
    });
  });
  $("#btn-opencase").on("click", function() {
    opencase(this.dataset.caseid);
  });
});

function sendref(refcode) {
  var code = refcode.refcode.value;
  if (!code) return toastr.warning("Введите код");
  if (code.search(/^[a-z0-9]+$/i) < 0) return toastr.warning("Недействительный код");
  $.get("/ref/" + code, function(response) {
    if (response && response.success) {
      toastr.success("Код принят, монеты начислены");
    } else {
      if ("error" in response) {
        toastr.error(response.error);
      }
    }
  });
}


$(".nav-button").click(function(){
		var status = $(".nav ul").css("display");
		
		if (status == 'none') {
			$(".nav ul").fadeIn(0);
		}
		else {
			$(".nav ul").fadeOut(100);
		}
	});

function opencase(caseid) {
  if (salt == 1) {
    toastr.warning("Для начала войдите на сайт");
    console.log("test");
  } else {
    if (!case_in_process) {
      socket.emit("opencase", {
        vkid: vkid,
        salt: salt,
        id: caseid,
        extrachance: $(".chance input:checked").val() || 0
      });
      case_in_process = true;
    }
  }
}


