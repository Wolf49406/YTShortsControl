// ==UserScript==
// @name         YT Shorts Control
// @version      1.3.1
// @description  Youtube Shorts Arrows Control
// @author       https://github.com/Wolf49406
// @match        http*://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @homepageURL  https://github.com/Wolf49406/YTShortsControl
// @updateURL    https://github.com/Wolf49406/YTShortsControl/raw/main/YTShortsControl.user.js
// @downloadURL  https://github.com/Wolf49406/YTShortsControl/raw/main/YTShortsControl.user.js
// @grant        none
// ==/UserScript==

// Change me
const g_seekTime = 3;

(function() {
    'use strict';

    // There is a bunch of DIVs with class="reel-video-in-sequence style-scope ytd-shorts";
    function GetCurrentVideo() {
        let reels = document.getElementsByClassName("reel-video-in-sequence");
        if (!reels) { return undefined };

        for (let i = 0; i < reels.length; i++) { // So we need to iterate throw them;
            let isActive = reels[i].hasAttribute("is-active"); // To find active one.
            if (!isActive) { continue };

            let video = reels[i].querySelector("#shorts-player > div.html5-video-container > video"); // An actual HTML5-video
            if (!video) { continue };

            return video;
        }

        return undefined;
    }

    function SetTime(time) {
        let video = GetCurrentVideo();
        if (!video) { return };

        let currentTime = video.currentTime; // Default HTML5 Video\Audio API -- https://www.w3schools.com/tags/ref_av_dom.asp
        video.currentTime = currentTime + time;
    }

    // Tampermonkey's @match is such a headache
    function IsValidURL() {
        return location.href.startsWith(`https://www.youtube.com/shorts/`);
    };

    function onKeydown(key) {
        if (!IsValidURL()) { return };

        if (key.code == "ArrowRight") {
            SetTime(+g_seekTime);
        }
        else if (key.code == "ArrowLeft") {
            SetTime(-g_seekTime);
        }
    }

    document.addEventListener('keydown', onKeydown, true);
})();
