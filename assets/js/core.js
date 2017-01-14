"use strict";
/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
/* animateNumber */
// (function(d) {
//   var q = function(b) {
//       return b.split("").reverse().join("")
//     },
//     m = {
//       numberStep: function(b, a) {
//         var e = Math.floor(b);
//         d(a.elem).text(e)
//       }
//     },
//     h = function(b) {
//       var a = b.elem;
//       a.nodeType && a.parentNode && (a = a._animateNumberSetter, a || (a = m.numberStep), a(b.now, b))
//     };
//   d.Tween && d.Tween.propHooks ? d.Tween.propHooks.number = {
//     set: h
//   } : d.fx.step.number = h;
//   d.animateNumber = {
//     numberStepFactories: {
//       append: function(b) {
//         return function(a, e) {
//           var g = Math.floor(a);
//           d(e.elem).prop("number", a).text(g + b)
//         }
//       },
//       separator: function(b, a, e) {
//         b = b || " ";
//         a = a || 3;
//         e = e || "";
//         return function(g, k) {
//           var c = Math.floor(g).toString(),
//             t = d(k.elem);
//           if (c.length > a) {
//             for (var f = c, l = a, m = f.split("").reverse(), c = [], n, r, p, s = 0, h = Math.ceil(f.length / l); s < h; s++) {
//               n = "";
//               for (p = 0; p < l; p++) {
//                 r = s * l + p;
//                 if (r === f.length) break;
//                 n += m[r]
//               }
//               c.push(n)
//             }
//             f = c.length - 1;
//             l = q(c[f]);
//             c[f] = q(parseInt(l, 10).toString());
//             c = c.join(b);
//             c = q(c)
//           }
//           t.prop("number", g).text(c + e)
//         }
//       }
//     }
//   };
//   d.fn.animateNumber = function() {
//     for (var b = arguments[0], a = d.extend({}, m, b), e = d(this), g = [a], k = 1, c = arguments.length; k < c; k++) g.push(arguments[k]);
//     if (b.numberStep) {
//       var h = this.each(function() {
//           this._animateNumberSetter = b.numberStep
//         }),
//         f = a.complete;
//       a.complete = function() {
//         h.each(function() {
//           delete this._animateNumberSetter
//         });
//         f && f.apply(this, arguments)
//       }
//     }
//     return e.animate.apply(e, g)
//   }
// })(jQuery);

function casebox(prizes, duration, minelements) {
  // Elements which we would use in our animation
  this.elements = {
    "hideonstart": $(".anim-hideonstart"), // This should be hidden before rolling begins
    "rouletteList": $(".anim-ruletka-list"), // This should be filled with prizes
    "ruletkaFrame": $(".openbox_ruletka"), // This should be shown before rolling and after clearing
    "historyFrame": $(".history-cases"),
    "openedFrame": $(".openbox_opened"), // This should be shown after rolling
    "prizecost": $("#prizecost, #prizeimg .summ"), // The prize cost
    "prizeimg": $("#prizeimg img") // The prize img
  };
  this.lastwon = 0;
  this.duration = duration;
  for (var key in prizes) prizes[key].id = key;
  this.prizelist = prizes;
  this.prizeswidth = [];
  var prizeblock = prizes;
  while (prizeblock.length < 7) prizeblock = prizeblock.concat(prizes);
  this.prizes = shuffle(prizeblock);
  while (this.prizes.length < minelements) this.prizes = this.prizes.concat(prizeblock);

  for (var key in this.prizes) {
    this.elements.rouletteList.append("<div class=\"roulette-item\"><img src=\"" + this.prizes[key].img + "\"></div>");
  }
  this.elements.rouletteList.children().each(function(a) {
    return function(i) {
      a.prizeswidth.push($(this).width());
    };
  }(this));


  this.start = function(w) {
    this.clear();
    console.log("START ANIMATION");
    // sound_open.play();
    this.elements.hideonstart.fadeOut().promise().done(function(a) {
      return function() {
        setTimeout(function() {
          a.scrollToElement(w);
        }, 100);
      }
    }(this));
    this.lastwon = w;
  };
  this.scrollToElement = function(w) {
    var counter = 0;
    var key = this.getKeyById(w, true);
    console.log("SCROLLING TO ELEMENT", w);
    this.elements.rouletteList.css({
      transition: "left cubic-bezier(0, 0, 0, 1) " + (Math.round(this.duration / 100) / 10) + "s",
      left: this.getOffsetToElement(key) + (Math.round(Math.random()) ? 1 : -1) * getRandomArbitary(0, this.prizeswidth[key] / 2 * 0.4)
    });
    sound_scroll.repeat(250);
    setTimeout(function() {
      sound_scroll.repeat(350);
    }, this.duration / 20 * 6);
    setTimeout(function() {
      sound_scroll.repeat(500);
    }, this.duration / 20 * 8);
    setTimeout(function() {
      sound_scroll.repeat(700);
    }, this.duration / 20 * 10);
    setTimeout(function() {
      sound_scroll.repeat(1000);
    }, this.duration / 20 * 15);
    setTimeout(function() {
      sound_scroll.repeat(2000);
    }, this.duration / 20 * 17);
    setTimeout(function(a) {
      return function() {
        a.showPrize(w);
      }
    }(this), this.duration + 5);
  };
  this.showPrize = function(w) {
    sound_scroll.clear();
    sound_close.play();
    case_in_process = false;
    console.log("DONE");
    this.elements.prizecost.html(this.prizes[this.getKeyById(w)].value);
    this.elements.prizeimg.attr("src", this.prizes[this.getKeyById(w)].img);
    this.elements.ruletkaFrame.slideUp();
    this.elements.historyFrame.slideUp();
    this.elements.openedFrame.slideDown();
  }
  this.clear = function() {
    if (sound_scroll) sound_scroll.stop();
    console.log("CLEAR ANIMATION");
    this.elements.hideonstart.show();
    this.elements.ruletkaFrame.slideDown();
    this.elements.historyFrame.slideDown();
    this.elements.openedFrame.slideUp();
    this.elements.rouletteList.css({
      "transition": "all linear 0s",
      left: this.getOffsetToElement(this.getKeyById(this.lastwon))
    });
  };
  this.getOffsetToElement = function(w) {
    var offset = 0;
    for (var i = 0; i < w; i++) {
      offset -= this.prizeswidth[i];
    }
    offset -= this.prizeswidth[w] / 2;
    offset += this.elements.rouletteList.parent().width() / 2;
    return offset;
  }
  this.getKeyById = function(w, way) {
    var way = way || false;
    if (way) {
      for (var i = this.prizes.length - 4; i >= 0; i--) {
        if (this.prizes[i].id == w) return i;
      }
    } else {
      for (var i = 4; i < this.prizes.length; i++) {
        if (this.prizes[i].id == w) return i;
      }
    }
    return 0;
  }
  this.clear();
}


function Sound(url) {
  this.sound = (typeof object == "string" ? new Audio(url) : url);
  this.interval = 0;
  this.paused = true;
  this.play = function() {
    this.sound.play();
  }
  this.stop = function(clear) {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.sound.loop = false;
    if (!clear) clearInterval(this.interval);
  }
  this.clear = function() {
    clearInterval(this.interval);
  }
  this.pause = function() {
    this.sound.pause();
    this.paused = true;
  }
  this.loop = function() {
    this.stop();
    this.sound.loop = true;
    this.play();
  }
  this.repeat = function(delay) {
    this.stop();
    this.paused = false;
    this.interval = setInterval(function(obj) {
      return function() {
        if (!obj.paused) {
          obj.stop(true);
          obj.play();
        }
      };
    }(this), delay);
    this.play();
  }
}

function popupClose(id) {
  $(id +" .popup-container").animate({
    top: "60%"
  }, 500, function() {
    
    $(id).fadeOut(500);
    
      $(id+" .popup-container").animate({
      top: "-300%"
    }, 500, function() {
        
    });
  });
}

function popupOpen(id) {
  $(id +" .popup-container").css("top","200%");
  $(id).fadeIn(300);
  
  $(id +" .popup-container").animate({
    top: "40%"
  }, 500, function() {
    
      $( ".popup-container" ).animate({
      top: "50%"
    }, 500, function() {
        
    });
  });
}


function changePaymentMethod(pm, holder) {
  $(".payment-method").removeClass("active");
  $(".pm-"+pm).addClass("active");
  
  $("#form-deposit").prop("action", "/payment/"+pm+"/go/");
  $("#withdrawal-type-field").val(pm);
  
  if (holder != undefined) { 
    document.getElementsByClassName('PurseHolder')[0].placeholder=holder;
  }
}


function depositNow() {
  $("#form-deposit").submit();
}

function withdrawalNow() {
  
  var withdrawalForm = 'form[name="form-withdrawal"]';
  var withdrawalData = $( withdrawalForm ).serialize()+'&key='+getUniqueId();
  var loader = withdrawalForm+' .loader';
    $(loader).fadeIn(100);
  
  $.post("?page_load=ajax&url=/ajax/withdrawal.ajax", withdrawalData ,function(data) {
    data = JSON.parse(data); 
      
    if (data['status'] == 1) {
      smoke.alert(data['message']);
      UpdateBalance(data['sum']*-1);
      popupClose('#withdrawal');
    }
    else {
      smoke.alert(data['message']);
    }
     
  }).done(function(){
    $(loader).fadeOut(500);
  });
}


function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}

function shuffle(array) {
  var counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function SocialFollow() {
	
	$(".social-follow").animate({
		top: "40%"
	}, 500, function() {
		
	    $( ".social-follow" ).animate({
			top: "50%"
		}, 500, function() {
	    	
		});
	});
}
