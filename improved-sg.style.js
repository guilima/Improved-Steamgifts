// ==UserScript==
// @name         Improved Steamgifts - Styles
// @namespace    improvedSteamgifts_styles.js
// @version      0.1
// @description  Improves steamgifts.com user experience
// @author       Guilherme Lima
// @match        *steamgifts.com*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
	'use strict';
	const style = document.createElement('style'),
				css = `
					.is-faded { display: none!important }

					body > header {
						position: fixed;
						width: 100%;
						z-index: 100;
						top: 0px;
					}

					.featured__container { margin-top: 38px; }

					.b-modal { background-color: transparent!important; }

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
