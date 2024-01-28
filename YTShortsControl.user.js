// ==UserScript==
// @name         YT Shorts Control
// @version      0.3
// @description  Youtube Shorts Arrows Control
// @author       https://github.com/Wolf49406
// @match        http*://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @homepageURL  https://github.com/Wolf49406/YTShortsControl
// @updateURL    https://github.com/Wolf49406/YTShortsControl/raw/main/YTShortsControl.user.js
// @downloadURL  https://github.com/Wolf49406/YTShortsControl/raw/main/YTShortsControl.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function GetCurrentVideo() {
        for (let i = 0; i < 10; i++) {
            let reel = document.getElementsByClassName("reel-video-in-sequence")[i];
            if (reel == undefined) {
                continue;
            }

            let isActive = reel.hasAttribute("is-active");
            if (!isActive) {
                continue;
            }

            let video = reel.querySelector("#shorts-player > div.html5-video-container > video")
            if (video == undefined) {
                continue;
            }

            return video;
        }

        return undefined;
    }

    function SetTime(forward) {
        let video = GetCurrentVideo();
        if (video == undefined) {
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

    function IsValidURL() {
        const loc = location.href;
        if (loc == undefined || !loc.includes("/shorts/")) {
            return false;
        }

        return true;
    }

    function onKeydown(key) {
        if (!IsValidURL()) {
            return;
        }

        if (key.code == "ArrowRight") {
            SetTime(true);
        }
        else if (key.code == "ArrowLeft") {
            SetTime(false);
        }
    }

    document.addEventListener('keydown', onKeydown, true);
})();
