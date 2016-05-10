// ==UserScript==
// @name         Steam Early Access Watcher
// @namespace    http://nielk1.com/
// @version      0.4
// @description  Add Early Access Watcher markers to games
// @author       Nielk1
// @match        *://store.steampowered.com/*
// @updateURL	https://raw.githubusercontent.com/nielk1/steam-early-access-watcher/gh-pages/early_access_watcher.user.js
// @downloadURL	https://raw.githubusercontent.com/nielk1/steam-early-access-watcher/gh-pages/early_access_watcher.user.js
// @grant        none
// ==/UserScript==

/*jshint multistr: true */

(function() {
    'use strict';

    var imgHiatus = "http://nielk1.github.io/steam-early-access-watcher/images/early_access_hiatus.png";
    var imgAbandoned = "http://nielk1.github.io/steam-early-access-watcher/images/early_access_abandoned.png";

    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('.seaw_overlay { position: absolute; z-index: 4; }');

    addGlobalStyle(
'div.seaw_abandoned_header {\
    border: 1px solid #ae4e4e;\
    margin: 0 0 20px 0;\
}\
\
div.seaw_abandoned_header .heading {\
    padding: 10px 10px;\
    color: #fdb8b8;\
    font-size: 13px;\
    background: rgb(208, 87, 87);\
}\
\
div.seaw_abandoned_header .inset {\
    text-shadow: -1px -1px 0px rgba(0,0,0,0.2);\
}\
\
div.seaw_abandoned_header .heading h1 {\
    font-family: "Motiva Sans Light", "Motiva Sans", arial, tahoma, sans-serif;\
    font-size: 30px;\
    font-weight: normal;\
    font-style: normal;\
    color: #fff;\
}\
\
div.seaw_abandoned_header .heading h2 {\
    font-family: "Motiva Sans Light", "Motiva Sans", arial, tahoma, sans-serif;\
    font-size: 15px;\
    font-weight: normal;\
    font-style: normal;\
    background-image: none;\
    height: auto;\
    margin-bottom: 2px;\
    color: #fff;\
}\
\
div.seaw_abandoned_header .heading a {\
    color: inherit;\
    text-decoration: underline;\
}\
\
div.seaw_hiatus_header {\
    border: 1px solid #A5AE4E;\
    margin: 0 0 20px 0;\
}\
\
div.seaw_hiatus_header .heading {\
    padding: 10px 10px;\
    color: #F5FDB8;\
    font-size: 13px;\
    background: rgb(208, 194, 87);\
}\
\
div.seaw_hiatus_header .inset {\
    text-shadow: -1px -1px 0px rgba(0,0,0,0.2);\
}\
\
div.seaw_hiatus_header .heading h1 {\
    font-family: "Motiva Sans Light", "Motiva Sans", arial, tahoma, sans-serif;\
    font-size: 30px;\
    font-weight: normal;\
    font-style: normal;\
    color: #fff;\
}\
\
div.seaw_hiatus_header .heading h2 {\
    font-family: "Motiva Sans Light", "Motiva Sans", arial, tahoma, sans-serif;\
    font-size: 15px;\
    font-weight: normal;\
    font-style: normal;\
    background-image: none;\
    height: auto;\
    margin-bottom: 2px;\
    color: #fff;\
}\
\
div.seaw_hiatus_header .heading a {\
    color: inherit;\
    text-decoration: underline;\
}');
    
    function update_eaw() {
        for(var gameidx = 0; gameidx < early_access_watcher_games.length; gameidx++) {
            var game = early_access_watcher_games[gameidx];
            if(game.appid !== null && (game.hiatus || game.abandoned)) {
                {
                    var element = document.querySelectorAll('a[data-ds-appid="' + game.appid + '"]:not([data-seaw-marked="true"])');
                    if(element !== null && element.length > 0) {
                        for(var elementidx = 0; elementidx < element.length; elementidx++) {
                            var marker = document.createElement('img');
                            //marker.addClassName('es_overlay');
                            marker.setAttribute('class','seaw_overlay');
                            if(game.hiatus) marker.src = imgHiatus;
                            if(game.abandoned) marker.src = imgAbandoned;
                            marker.style = "height: 28.125px; width: 28.125px; bottom: 0;";
                            var capsl = element[elementidx].getElementsByClassName('search_capsule');
                            if(capsl !== null && capsl.length > 0) {
                                capsl[0].insertBefore(marker, capsl[0].firstChild);
                                element[elementidx].setAttribute('data-seaw-marked','true');
                            }
                            var caps2 = element[elementidx].getElementsByClassName('match_img');
                            console.log('tmp');
                            if(caps2 !== null && caps2.length > 0) {
                                caps2[0].insertBefore(marker, caps2[0].firstChild);
                                element[elementidx].setAttribute('data-seaw-marked','true');
                            }
                        }
                    }
                }
                {
                    var pathBits = document.location.pathname.split('/').filter(function(el) { return el.length !== 0; });
                    if(pathBits[0] == 'app' && pathBits[1] == game.appid) {
                        var descriptionarea = document.querySelectorAll('div.game_description_column:not([data-seaw-marked="true"])');
                        if(descriptionarea !== null && descriptionarea.length > 0) {
                            var newsection = document.createElement('div');
                            if(game.hiatus) {
                                newsection.setAttribute('class','seaw_hiatus_header');
                                newsection.innerHTML = '<div class="heading"><h1 class="inset">Early Access Watcher</h1><h2 class="inset">This game is on the Early Access Watcher <a href="http://steamcommunity.com/groups/earlyaccesswatcher/discussions/1/385428458179286616/">Hiatus List</a>.</h2><p>Last Checked: ' + new Date(game.updated).toLocaleString() + '</p></div>';
                            }
                            if(game.abandoned){
                                newsection.setAttribute('class','seaw_abandoned_header');
                                newsection.innerHTML = '<div class="heading"><h1 class="inset">Early Access Watcher</h1><h2 class="inset">This game is on the Early Access Watcher <a href="http://steamcommunity.com/groups/earlyaccesswatcher/discussions/1/385428458179603991/">Abandoned List</a>.</h2><p>Last Checked: ' + new Date(game.updated).toLocaleString() + '</p></div>';
                            }
                            descriptionarea[0].insertBefore(newsection, descriptionarea[0].firstChild);
                            descriptionarea[0].setAttribute('data-seaw-marked','true');
                        }
                    }
                }
            }
        }
    }

    (function(d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function(){
            update_eaw();
            setInterval(function(){ update_eaw(); }, 3000);
        };
        script.src = 'http://nielk1.github.io/steam-early-access-watcher/scripts/games.js';
        d.getElementsByTagName('head')[0].appendChild(script);
    }(document));
})();
