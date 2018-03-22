// ==UserScript==
// @name          Improved Steamgifts - Styles
// @run-at        document-start
// @namespace     improvedSteamgifts_styles.js
// @version       0.2
// @description   Improves steamgifts.com user experience
// @author        Guilherme Lima
// @match         *steamgifts.com*
// @grant         none
// @license       MIT
// ==/UserScript==

(function() {
  'use strict';
  const style = document.createElement('style'),
    css = `
      body > header {
        position: fixed;
        width: 100%;
        z-index: 100;
        top: 0px;
      }

      .featured__container { margin-top: 38px; }

      .b-modal,
      .is-faded,
      .popup--hide-games { display: none!important;}

      .giveaway__heading { margin-bottom: 5px; }

      .entry-giveaway {
        cursor: pointer;
        padding: 4px 6px;
        font-weight:bold;
        background-color: #9ac96a;
        color: #305302;
        border-radius: 2px;
      }

      .load-more-giveaway {
        cursor: pointer;
        padding: 12px;
        font-size: 16px;
        background: #03a7b4;
        color: #fff;
      }`;
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();
