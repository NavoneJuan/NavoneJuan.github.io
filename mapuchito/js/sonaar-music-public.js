IRON = window.IRON || {};
(function ($) {
  createFakeWave = function (audioPlayer) {

    // CREATE FAKEWAVE IN CANVAS
    function createWaves(container, wavescolor, initHeights) {
      var ctx = container.getContext("2d");
      var canvasWidth = container.width;
      var canvasHeight = container.height;
      let yPos;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = wavescolor;
      for (var i = 0; i < numBars; i++) {
        yPos = canvasHeight / 2 - initHeights[i] / 2;
        ctx.fillRect(barWidth * i + gapWidth * i, Math.round(yPos), barWidth, initHeights[i]);
      }
    }

    function randomVal(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if(IRON.isSonaarTheme && srp_pluginEnable){
      IRON.audioPlayer.stickyEnable = true;
    }

    var waveColor = $(audioPlayer).data("wave-color") != "" ? $(audioPlayer).data("wave-color") : sonaar_music.option.music_player_timeline_color;
    var waveProgressColor = $(audioPlayer).data("wave-progress-color") != "" ? $(audioPlayer).data("wave-progress-color") : sonaar_music.option.music_player_progress_color;

    if ($(audioPlayer).attr("first-track-loading") == "true") {
      $(audioPlayer).removeAttr("first-track-loading");
      return;
    }

    let el_bar_container;
    let el_bar_destination;
    let canvasId_container;
    let canvasId_progress;
    let canvasId_splayer_container;
    let canvasId_splayer_progress;

    if (sonaar_music.option.waveformType == "simplebar") {
      let el_bar_base = $(".sonaar_fake_wave").find(".sonaar_wave_base");
      let el_bar_progress = $(".sonaar_fake_wave").find(".sonaar_wave_cut");
      let barHeight = sonaar_music.option.sr_soundwave_height_simplebar + "px";
      el_bar_base.css("height", barHeight);
      el_bar_progress.css("height", barHeight);

      el_bar_container = $(audioPlayer).find(".sonaar_fake_wave");
      el_bar_destination = $("#sonaar-player .sonaar_fake_wave");
    } else {
      if (audioPlayer) {
        el_bar_container = $(audioPlayer).find(".sonaar_fake_wave svg");
        canvasId_container = audioPlayer.id + "-container";
        canvasId_progress = audioPlayer.id + "-progress";
      }

      el_bar_destination = $("#sonaar-player .sonaar_fake_wave svg");
      canvasId_splayer_container = "splayer-wave-container";
      canvasId_splayer_progress = "splayer-wave-progress";
    }

    if ($(audioPlayer).attr("duplicating_wave") == "true") {
      //DUPLICATE FAKEWAVE OR SIMPLE BAR INTO THE STICKY PLAYER
      var duplicatedWave = el_bar_container.html();
      el_bar_destination.html(duplicatedWave);
      $(audioPlayer).removeAttr("duplicating_wave");
      return;
    }

    // RETURN IF SIMPLE BAR IS USED - NO NEED TO CREATE FAKEWAVES.
    if (sonaar_music.option.waveformType == "simplebar") {
      return;
    }
    $(audioPlayer).addClass("sr-creating-wave");
    if (IRON.audioPlayer.stickyEnable) {
      $("#sonaar-player").addClass("sr-creating-wave");
    }

    let numBars = 4000;
    let gapWidth = sonaar_music.option.music_player_bargap ? sonaar_music.option.music_player_bargap : 2;
    let barWidth = sonaar_music.option.music_player_barwidth ? sonaar_music.option.music_player_barwidth : 1;
    let initHeightsAudio = [];
    let initHeightsSticky = [];

    if (audioPlayer) {
      var sr_canvas_container = document.getElementById(canvasId_container);
      var sr_canvas_progress = document.getElementById(canvasId_progress);
    }
    
    if (IRON.audioPlayer.stickyEnable) {
      var sr_canvas_splayer_container = document.getElementById(canvasId_splayer_container);
      var sr_canvas_splayer_progress = document.getElementById(canvasId_splayer_progress);
    }

    //CREATE THE RANDOM PEAK BARS with conditions to prevent to many if. numBars is pretty high
    if (audioPlayer && IRON.audioPlayer.stickyEnable) {
      //LOAD PEAKS FOR BOTH STICKY AND AUDIOPLAYER
      for (var i = 0; i < numBars; i++) {
        initHeightsAudio[i] = randomVal(0, sr_canvas_container.height);
        initHeightsSticky[i] = randomVal(0, sr_canvas_splayer_container.height);
      }
      initHeightsAudio.unshift(1, 2, 8, 5, 10);
      initHeightsSticky.unshift(1, 2, 8, 5, 10);
    } else if (audioPlayer && !IRON.audioPlayer.stickyEnable) {
      //LOAD PEAKS FOR AUDIOPLAYER ONLY
      for (var i = 0; i < numBars; i++) {
        initHeightsAudio[i] = randomVal(0, sr_canvas_container.height);
      }
      initHeightsAudio.unshift(1, 2, 8, 5, 10);
    } else {
      // LOAD PEAKS ONLY FOR STICKY
      for (var i = 0; i < numBars; i++) {
        initHeightsSticky[i] = randomVal(0, sr_canvas_splayer_container.height);
      }
      initHeightsSticky.unshift(1, 2, 8, 5, 10);
    }

    if (audioPlayer) {
      createWaves(sr_canvas_container, waveColor, initHeightsAudio);
      createWaves(
        sr_canvas_progress,
        waveProgressColor,
        initHeightsAudio.map((x) => x + 1)
      );
      // .map array to fix minor glitch for pixels. Perfection is an art!
    }
    if (IRON.audioPlayer.stickyEnable) {
      createWaves(sr_canvas_splayer_container, sonaar_music.option.sticky_player_soundwave_bars, initHeightsSticky);
      createWaves(sr_canvas_splayer_progress, sonaar_music.option.sticky_player_soundwave_progress_bars, initHeightsSticky);
    }

    return;
  };

  //Replace CTA button by ellipsis on small device
  sr_playerCTAresponsive = function () {
    const sr_breakpoint = 200;
    $('.elementor-widget-music-player').each(function () {
      let sr_ctaEnable = null;
      if ($(this).hasClass('sr_track_inline_cta_bt__yes')) {
        $(this).find('.audio-track').each(function () {
          if ($(this).width() < sr_breakpoint) {
            sr_ctaEnable = true;
          }
        });
      } else if ($(this).hasClass('sr_track_inline_cta_bt__no')) {
        let i = 0;
        $(this).find('.sr-playlist-item').each(function () {
          if ($(this).find('.audio-track').width() >= sr_breakpoint + $(this).find('.song-store-list-container').width()) {
            i++;
          }
        });
        if (i >= $(this).find('.sr-playlist-item').length) {
          sr_ctaEnable = false;
        }
      }
      if (sr_ctaEnable === true) {
        $(this).removeClass('sr_track_inline_cta_bt__yes')
        $(this).addClass('sr_track_inline_cta_bt__no')
      } else if (sr_ctaEnable === false) {
        $(this).removeClass('sr_track_inline_cta_bt__no')
        $(this).addClass('sr_track_inline_cta_bt__yes')
      }
    })
  }

  //Call Function on window Resize
  let resizeTimer;
  $(window).resize(function () {
    if (resizeTimer != null) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {

      //Call function here...
      sr_playerCTAresponsive();

    }, 200);
  });


})(jQuery);

//Check if the we are int the guttenberg editor
function isGutenbergActive() {
  return typeof wp !== 'undefined' && typeof wp.blocks !== 'undefined';
}

/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */