// ==UserScript==
// @name         login
// @namespace    login
// @version      1
// @description  auto login
// @author       arwinthoriq
// @match        https://www.youlikehits.com/login.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
setTimeout(function() {
var name = ""
var pass = ""
document.getElementById('username').value = name
document.getElementById('password').value = pass
 document.getElementsByTagName('form')[0].submit();
}, 1000 * 1);
})();
