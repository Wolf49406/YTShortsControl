// ==UserScript==
// @name         YT Shorts Control
// @version      0.1
// @description  Youtube Shorts Arrows Control
// @author       https://github.com/Wolf49406
// @match        https://www.youtube.com/shorts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @homepageURL  https://github.com/Wolf49406/YTShortsControl
// @updateURL    https://github.com/Wolf49406/YTShortsControl/raw/main/YTShortsControl.user.js
// @downloadURL  https://github.com/Wolf49406/YTShortsControl/raw/main/YTShortsControl.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function SetTime(forward) {
        const video = document.getElementsByClassName("html5-main-video")[0];
        const movie_player = document.getElementById("movie_player");
        if (video == undefined || movie_player == undefined) {
            return;
        }

        let currentTime = video.currentTime;

        if (forward) {
            video.currentTime = currentTime + 5;
        }
        else {
            video.currentTime = currentTime - 5;
        }
    }

    function onKeydown(key) {
        if (key.code == "ArrowRight") {
            SetTime(true);
        }
        else if (key.code == "ArrowLeft") {
            SetTime(false);
        }
    }

    document.addEventListener('keydown', onKeydown, true);
})();
