// ==UserScript==
// @name         YT Shorts Control
// @version      1.1
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

    // Change me
    const ff_time = 3;

    function GetCurrentVideo() { // There is 10 (0-9) DIVs with class="reel-video-in-sequence style-scope ytd-shorts"
        for (let i = 0; i < 10; i++) { // So we need to iterate throw them
            let reel = document.getElementsByClassName("reel-video-in-sequence")[i];
            if (!reel) {
                continue;
            }

            let isActive = reel.hasAttribute("is-active"); // To find active one
            if (!isActive) {
                continue;
            }

            let video = reel.querySelector("#shorts-player > div.html5-video-container > video"); // An actual HTML5-video
            if (!video) {
                continue;
            }

            return video;
        }

        return undefined; // Nothing has found (just in case)
    }

    function SetTime(time) {
        let video = GetCurrentVideo();
        if (!video) {
            return;
        }

        // Pretty much self described
        let currentTime = video.currentTime; // Default HTML5 Video\Audio API -- https://www.w3schools.com/tags/ref_av_dom.asp
        video.currentTime = currentTime + time;
    }

    function IsValidURL() { // Tampermonkey's @match is such a headache
        let href = location.href;
        if (!href || !href.includes("/shorts/")) { // https://www.youtube.com/shorts/XXXX
            return false;
        }

        return true;
    }

    function onKeydown(key) {
        if (!IsValidURL()) {
            return;
        }

        if (key.code == "ArrowRight") {
            SetTime(+ ff_time);
        }
        else if (key.code == "ArrowLeft") {
            SetTime(- ff_time);
        }
    }

    document.addEventListener('keydown', onKeydown, true);
})();
