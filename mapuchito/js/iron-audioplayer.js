IRON.audioPlayer = (function ($) {
  "use strict";
  var seekTimeOut;
  var autoplayEnable;
  var wavesurferEnable = Boolean(sonaar_music.option.waveformType === "wavesurfer");

  function initPlayer(player) {
    var audioPlayer = player;
    audioPlayer.id = audioPlayer.data("id");
    audioPlayer.hide_progressbar = audioPlayer.data("hide-progressbar") ? true : false;
    this.audioPlayer = player;
    var waveContainer = this.audioPlayer.find(".player .wave").attr("id");
    var playlist = audioPlayer.find(".playlist");
    this.playlist = playlist;
    this.autoplayEnable = audioPlayer.data("autoplay");

    $(audioPlayer).css("opacity", 1);

    if (wavesurferEnable) {
		/* waveContainer black when already have html */
		if ( jQuery.trim(jQuery('#' +waveContainer).html() ) != '' )  {			
			jQuery('#' +waveContainer).html('');
		}
      var wavesurfer = WaveSurfer.create({
        container: "#" + waveContainer,
        cursorWidth: 0,
        barWidth: 1,
        progressColor: sonaar_music.option.music_player_progress_color,
        waveColor: sonaar_music.option.music_player_timeline_color,
        height: 70,
        mediaControls: true,
        backend: "MediaElement",
        mediaControls: false,
      });	
	
      wavesurfer.on("loading", function () {
        var progressLoad = arguments[0];
        audioPlayer.find(".progressLoading").css("background", sonaar_music.option.music_player_timeline_color);
        audioPlayer.find(".progressLoading").css("width", "calc( " + progressLoad + "% - 200px )");
      });

      var firstLoad = true;
      wavesurfer.on("ready", function () {
        if (firstLoad || isGutenbergActive()) {
          firstLoad = false;
        } else {
          wavesurfer.play();
          audioPlayer.addClass("audio-playing");
        }
      });

      wavesurfer.on("audioprocess", function () {
        var currentTime = wavesurfer.getCurrentTime();
        var duration = wavesurfer.getDuration();
        var time = moment.duration(currentTime, "seconds");

        currentTime = moment(time.minutes() + ":" + time.seconds(), "m:s").format("mm:ss");

        if (duration !== Infinity) {
          var totalTime = moment.duration(wavesurfer.getDuration() - wavesurfer.getCurrentTime(), "seconds");
          if (totalTime.hours() >= 12 || totalTime.hours() <= 0) {
            audioPlayer.find(".totalTime").html("-" + moment(totalTime.minutes() + ":" + totalTime.seconds(), "m:s").format("mm:ss"));
          } else {
            audioPlayer.find(".totalTime").html("-" + moment(totalTime.hours() + ":" + totalTime.minutes() + ":" + totalTime.seconds(), "h:m:s").format("h:mm:ss"));
          }
        } else {
          audioPlayer.find(".totalTime").html(this.list.tracks[this.currentTrack].length);
        }
        audioPlayer.find(".currentTime").html(moment(time.minutes() + ":" + time.seconds(), "m:s").format("mm:ss"));
      });
    } else {
      var wavesurfer = $("#" + waveContainer).find(".sonaar_media_element")[0];
    }

    this.wavesurfer = wavesurfer;

    if (!wavesurferEnable) {
      fakeWaveUpdate(wavesurfer, audioPlayer, playlist);
      $(audioPlayer).find(".wave").css("opacity", "1");
    }
    setPlaylist(playlist, wavesurfer, audioPlayer);
    setCurrentTrack(playlist.find("li").eq(0), playlist.find("li").index(), audioPlayer, wavesurfer);
    setControl(this.wavesurfer, audioPlayer, playlist);
    setNextSong(wavesurfer, audioPlayer, playlist);

    sr_playerCTAresponsive();
  }

  var setNextSong = function (wavesurfer, audioPlayer, playlist) {
    if (wavesurferEnable) {
      wavesurfer.on("finish", function () {
        next(audioPlayer, wavesurfer, playlist);
      });
    }
  };

  var triggerPlay = function (wavesurfer, audioPlayer) {
    if (wavesurferEnable) {
      if (!wavesurfer.isPlaying()) togglePlaying(audioPlayer, wavesurfer);
    } else {
      wavesurfer.play();
      togglePlaying(audioPlayer, wavesurfer);
    }
  };

  function setCurrentTrack(track, index, audioPlayer, wavesurfer) {
    var albumArt = audioPlayer.find(".album .album-art");
    var album = audioPlayer.find(".album");
    var trackTitle = audioPlayer.find(".track-title");
    var trackTime = audioPlayer.find(".track-time");
    var trackArtist = audioPlayer.find(".sr_it-artists-value");
    var albumTitle = audioPlayer.find(".album-title");
    var albumTitle = audioPlayer.find(".sr_it-playlist-title");
    var albumReleaseDate = audioPlayer.find(".sr_it-date-value");

    if (track.data("albumart")) {
      album.show();
      albumArt.show();
      albumArt.css("cursor", "pointer");
      if (albumArt.find("img").length) {
        albumArt.find("img").attr("src", track.data("albumart"));
      } else {
        albumArt.css("background-image", "url(" + track.data("albumart") + ")");
      }
    } else {
      album.hide();
      albumArt.hide();
    }

    audioPlayer.data("currentTrack", index);

    trackTitle.text(track.data("tracktitle"));
    trackTime.text(track.data("tracktime"));
    trackArtist.text(track.data("trackartists"));
    albumReleaseDate.text(track.data("releasedate"));
    if (audioPlayer.data("playlist_title").length) {
      albumTitle.text(audioPlayer.data("playlist_title"));
    } else {
      albumTitle.text(track.data("albumtitle"));
    }

    audioPlayer.find(".player").removeClass("hide");

    audioPlayer.find(".wave").removeClass("reveal");

    if (!track.data("showloading")) {
      audioPlayer.find(".player").addClass("hide");
    } else {
      audioPlayer.find(".progressLoading").css("opacity", "0.75");
    }
    if (wavesurferEnable) {
      setAudio(track.data("audiopath"), wavesurfer, audioPlayer);
    }

    if (!wavesurferEnable) {
      createFakeWave(audioPlayer);
    }
    setTime(audioPlayer, wavesurfer);

    hideEmptyAttribut(track.data("releasedate"), audioPlayer.find(".sr_it-playlist-release-date"));
  }

  function setPlaylist(playlist, wavesurfer, audioPlayer) {
    playlist.find("li").each(function () {
      setSingleTrack($(this), $(this).index(), wavesurfer, audioPlayer);
    });
  }

  function setTime(audioPlayer, wavesurfer) {
    if (wavesurferEnable) {
      audioPlayer.find(".player").addClass("reveal");
      $(".wave").addClass("reveal");
      audioPlayer.find(".progressLoading").css("opacity", "0");
    } else {
      $(wavesurfer).on("timeupdate", function () {
        var currentTime = wavesurfer.currentTime;
        var time = moment.duration(currentTime, "seconds");
        audioPlayer.find(".currentTime").html(moment(time.minutes() + ":" + time.seconds(), "m:s").format("mm:ss"));
        if (wavesurfer.duration !== Infinity) {
          var timeLeft = moment.duration(wavesurfer.duration - wavesurfer.currentTime, "seconds");
          audioPlayer.find(".totalTime").html("-" + moment(timeLeft.minutes() + ":" + timeLeft.seconds(), "m:s").format("mm:ss"));
        } else {
          audioPlayer.find(".totalTime").html("");
        }
      });
    }
  }

  function setControl(wavesurfer, audioPlayer, playlist) {
    // var ctrl = audioPlayer.find('.control');
	audioPlayer.unbind('click');
    audioPlayer.on("click", ".play, .album .album-art", function (event) {
      togglePause();

      if (!audioPlayer.hasClass("audio-playing")) {
        if (wavesurferEnable || wavesurfer.currentSrc != "") {
          play(audioPlayer, wavesurfer);
          triggerPlay(wavesurfer, audioPlayer);
        } else {
          $(audioPlayer).attr("first-track-loading", "true");
          playlist.find("li").eq(0).find("a.audio-track").click();
        }
      } else {
        togglePause();
      }
      togglePlaying(audioPlayer, wavesurfer);
      event.preventDefault();
    });
    audioPlayer.on("click", ".previous", function (event) {
      previous(audioPlayer, wavesurfer, playlist);
      event.preventDefault();
    });
    audioPlayer.on("click", ".next", function (event) {
      next(audioPlayer, wavesurfer, playlist);
      event.preventDefault();
    });
  }

  function setSingleTrack(singleTrack, eq, wavesurfer, audioPlayer) {
    singleTrack.find(".audio-track").remove();
    var tracknumber = eq + 1;
    var trackplay = $("<span/>", {
      class: "track-number",
      html:
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17.5 21.2" style="enable-background:new 0 0 17.5 21.2;" xml:space="preserve"><path d="M0,0l17.5,10.9L0,21.2V0z"></path><rect width="6" height="21.2"></rect><rect x="11.5" width="6" height="21.2"></rect></svg><span class="number">' +
        tracknumber +
        "</span>",
    });
    $("");
    $("<a/>", {
      class: "audio-track",
      click: function (event) {
        if (wavesurfer.currentSrc == "") {
          $(audioPlayer).attr("first-track-loading", "true");
        }
        if ($(this).parent().attr("data-audiopath").length == 0) {
          return;
        }

        if (ifTrackIsPlaying(wavesurfer) && singleTrack.hasClass("current")) {
          togglePause();
          togglePlaying(audioPlayer, wavesurfer);
        } else if (singleTrack.hasClass("current")) {
          play(audioPlayer, wavesurfer);
        } else {
          togglePause();
          setCurrentTrack(singleTrack, eq, audioPlayer, wavesurfer);

          if (!wavesurferEnable) {
            setAudio(singleTrack.data("audiopath"), wavesurfer, audioPlayer);
          }
          audioPlayer.find(".playlist li").removeClass("current");
          singleTrack.addClass("current");
          triggerPlay(wavesurfer, audioPlayer);
          togglePlaying(audioPlayer, wavesurfer);
        }
        event.preventDefault();
      },
    })
      .appendTo(singleTrack)
      .prepend(trackplay)
      .append('<div class="tracklist-item-title">' + singleTrack.data("tracktitle") + ' </div><span class="tracklist-item-time">' + singleTrack.data("tracktime") + "</span>");
    singleTrack.find('.store-list').before(singleTrack.find(".audio-track"));
  }

  var setAudio = function (audio, wavesurfer) {
    if (wavesurferEnable) {
      seekTimeOut = setTimeout(function () {
        wavesurfer.load(audio);
      }, 250);
    } else {
      $(wavesurfer).attr("src", audio);
      wavesurfer.load();

      $(".sonaar_fake_wave").on("click", function (event) {
        var currentAudio = $(this).find(".sonaar_media_element")[0];
        var progressedAudio = $(this).width() / event.offsetX;
        currentAudio.currentTime = currentAudio.duration / progressedAudio;
        event.preventDefault();
      });
    }
  };

  function getTime(wavesurfer) {
    return wavesurfer.getCurrentTime();
  }

  function togglePlaying(audioPlayer, wavesurfer) {
    $.each(IRON.players, function () {
      this.audioPlayer.removeClass("audio-playing");
    });

    if (ifTrackIsPlaying(wavesurfer)) {
      audioPlayer.addClass("audio-playing");
      return;
    }

    audioPlayer.removeClass("audio-playing");
  }

  function togglePause() {
    $.each(IRON.players, function () {
      if (ifTrackIsPlaying(this.wavesurfer)) {
        this.wavesurfer.pause();
      }
    });
  }

  function play(audioPlayer, wavesurfer) {
    if (!audioPlayer.find(".playlist li").hasClass("current")) {
      audioPlayer.find("li:first-of-type").addClass("current");
    }
    if (ifTrackIsPlaying(wavesurfer)) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
    togglePlaying(audioPlayer, wavesurfer);
  }

  function previous(audioPlayer, wavesurfer, playlist) {
    var currentTrack = audioPlayer.data("currentTrack");
    var nextTrack = currentTrack - 1;

    if (wavesurferEnable) {
      if ("2" < getTime(wavesurfer)) {
        wavesurfer.seekTo(0);
        return;
      }
    }
    playlist.find("li").eq(nextTrack).find("a.audio-track").click();
  }

  function next(audioPlayer, wavesurfer, playlist) {
    var currentTrack = audioPlayer.data("currentTrack");
    var nextTrack = currentTrack + 1;

    if (!playlist.find("li").eq(nextTrack).length) {
      nextTrack = 0;
    }
    wavesurfer.pause();
    playlist.find("li").eq(nextTrack).find("a.audio-track").click();
  }

  function getPlayer() {
    return this;
  }

  function getplay() {
    play(this.audioPlayer, this.wavesurfer);
  }

  function ifTrackIsPlaying(wavesurfer) {
    if (wavesurferEnable) {
      return wavesurfer.isPlaying();
    } else {
      return !wavesurfer.paused;
    }
  }

  var fakeWaveUpdate = function (wavesurfer, audioPlayer, playlist) {
    $(wavesurfer).on("timeupdate", function () {
      $(audioPlayer)
        .find(".sonaar_wave_cut")
        .width((this.currentTime / this.duration) * 100 + "%");
      if (wavesurfer.ended) {
        //When track ended
        next(audioPlayer, wavesurfer, playlist);
      }
    });
  };

  return {
    init: initPlayer,
    getPlayer: getPlayer,
    play: getplay,
    autoplayEnable: autoplayEnable,
    triggerPlay: triggerPlay,
  };
})(jQuery);

function hideEmptyAttribut(string, selector) {
  if (string == "") {
    selector.css("display", "none");
  } else {
    selector.css("display", "block");
  }
}

//Load Music player Content
function setIronAudioplayers(specificParentSelector) {
  if (typeof specificParentSelector !== "undefined") {
    // set all audioplayers or only players inide a specific selector
    var playerSelector = jQuery(specificParentSelector + " .iron-audioplayer");
    if (IRON.players == "undefined") {
      IRON.players = []; //dont reset the IRON.players if they already exist and the setIronAudioplayers function is executed from sr-scripts.js
    }
  } else {
    var playerSelector = jQuery(".iron-audioplayer");
    IRON.players = [];
  }
  playerSelector.each(function () {
    if (!jQuery(this).parents(".elementor-html").length && jQuery(this).parents(".elementor-location-popup").length) return; //Return if the audioplayer is in a elementor popup in the frontend

    if (typeof specificParentSelector == "undefined" && jQuery(this).parents(".elementor-widget-woocommerce-products").length) return;

    if (typeof specificParentSelector == "undefined" && jQuery(this).parents(".elementor-widget-music-player").length) return;
    var player = Object.create(IRON.audioPlayer);
    player.init(jQuery(this));
    IRON.players.push(player);
  });
}
setIronAudioplayers();

/*Load audioplayer in elementor Popup*/
jQuery(document).on("elementor/popup/show", (event, id, instance) => {
  jQuery('.elementor-location-popup[data-elementor-id="' + id + '"] .iron-audioplayer').each(function () {
    var player = Object.create(IRON.audioPlayer);
    player.init(jQuery(this));
    IRON.players.push(player);
  });
});
jQuery(document).on("elementor/popup/hide", (event, id, instance) => {
  jQuery('.elementor-location-popup[data-elementor-id="' + id + '"] .iron-audioplayer').each(function () {
    IRON.players.splice(-1, 1);
  });
});

/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */