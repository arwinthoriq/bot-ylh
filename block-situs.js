// ==UserScript==
// @name         blocks-situs
// @namespace    https://github.com/arwinthoriq/blocks-situs
// @version      1
// @description  block situs
// @author       arwinthoriq
// @match        *://*.youtube.com/*
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(() => { //IIFE arrow function
    'use strict';

    const regexToMatchTLD = /\.[^.]+$/;
    const domain = location.hostname.replace(regexToMatchTLD, '');;
    document.body.innerHTML =`
          <div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: red">
            <p style="position: relative; top: 40%; display: block; font-size: 66px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">
              The website ${domain} successfully blocked !
            </p>
          </div>
    `;
})();
