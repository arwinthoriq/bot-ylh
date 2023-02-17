 // ==UserScript==
 // @name         YouLikeHits Bot
 // @namespace    https://github.com/arwinthoriq/bot-ylh
 // @version      1
 // @description  anti break
 // @author       arwinthoriq
 // @updateURL    https://raw.githubusercontent.com/arwinthoriq/bot-ylh/main/bot.js
 // @downloadURL  https://raw.githubusercontent.com/arwinthoriq/bot-ylh/main/bot.js
 // @match        *://*.youlikehits.com/stats.php*
 // @match        *://*.youlikehits.com*
 // @match        *://*.youlikehits.com/account.php*
 // @match        *://*.youlikehits.com/addeditsites.php*
 // @match        *://*.youlikehits.com/history.php*
 // @match        *://*.youlikehits.com/soundcloudplays.php*
 // @match        *://*.youlikehits.com/websites.php*
 // @match        *://*.youlikehits.com/viewwebsite.php*
 // @match        *://*.youlikehits.com/youtubenew2.php*
 // @match        *://*.youlikehits.com/bonuspoints.php*
 // @grant        GM.getValue
 // @grant        GM.setValue
 // @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
 // @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
 // ==/UserScript==
 (() => {
 	const J = jQuery.noConflict(true);
 	const globalInterval = 2000;
 	let previousVideo = "";
 	let shownWarnings = [];
 	const mainLoop = setInterval(() => { //AKHIR DARI SCRIPT INI ADALAH SEMUA AKAN DI LOGOUT DAN MASUK KE TAB SELANJUTNYA
 		if (J("*:contains('503 Service Unavailable')").length) {
 			location.reload();
 		} else {
      // setTimeout(function() {
 						//newWin.close();
 					//}, 1000 * 32400);
 					setTimeout(function() {
 						location.href = 'https://www.youlikehits.com/bonuspoints.php';
 					}, 1000 * 11000); //tiap 3 jam ke halaman bonuspoint
 			switch (document.location.pathname) {
 				case "/bonuspoints.php":
                    newWin.close();
                    setTimeout(function() { //dalam waktu 20 detik semua akan di logout
                        location.href = 'https://www.youlikehits.com/logout.php'; //harus ke halaman yg lain, jangan di close karena jika di close maka tidak akan bisa login di tab selanjutnya
                        //window.close()
                        newWin.close();
                    }, 20000);
 					if (J("body:contains('You have made ')").length && J("body:contains(' Hits out of ')").length) {
 						const reloadDelay = randomSeconds(60, 60 * 5);
 						attachNotification(".maintable", "Not enough points. Reloading the website in " + Math.round(reloadDelay / 1000 / 60) + " minutes to check again...");
 						//setTimeout(() => location.reload(), reloadDelay);
                        location.href = 'https://www.youlikehits.com/login.php';
 						clearInterval(mainLoop); //no further checks since we gotta reload anyway
 					} else if (J(".buybutton").length) J(".buybutton")[0].click() //mengambil bonus point
 					break;
                case "/":
                    //setTimeout(function() {
                        //window.close()
                    //}, 1000 * 5);
 					setTimeout(function() {
 						location.href = 'https://www.youlikehits.com/login.php';
 					}, 1000);
 					break;
 				case "/account.php":
 					setTimeout(function() {
 						location.href = 'https://www.youlikehits.com/login.php';
 					}, 1000);
 					break;
 				case "/addeditsites.php":
 					setTimeout(function() {
 						location.href = 'https://www.youlikehits.com/addyoutube.php';
 					}, 1000);
 					break;
 				case "/history.php":
 					setTimeout(function() {
 						window.close();
 					}, 1000); // tiap 1 detik history akan close
 					break;
 				case "/soundcloudplays.php":
 					if (!J(".maintable span[id*='count']").attr("style").includes("display:none;")) return attachNotification(".maintable", "Music already playing...");
 					if (J(".followbutton").length) {
 						J(".followbutton").first().click();
 					} else alert("no followbutton, fix this pls");
 				case "/youtubenew2.php":
 					if (J("body:contains('This video does not have a payout set.')").length) {
 						location.reload();
 					}
 					if (J("body:contains('YouTube Limit')").length) {
 						location.reload();
 					}
 					setTimeout(function() { //tiap 5 menit akan di reload untuk penyegaran agar bug dari ylh dapat diatasi
 						newWin.close();
 						location.reload();
 					}, 1000 * 300);
 					//setTimeout(function() {
 						//window.close();
 					//}, 1000 * 14400);
 					//setTimeout(function() {
 						//location.href = 'https://www.youlikehits.com/bonuspoints.php';
 					//}, 1000 * 14000);
 					if (J("body:contains('There are no videos available to view at this time. Try coming back or refreshing.')").length) {
 						location.reload();
 					}
 					if (J('body:contains("failed")').length) location.reload(); //captcha failed?
 					if (J(".followbutton").length) {
 						let vidID = () => {
 							return J(".followbutton").first().parent().children("span[id*='count']").attr("id")
 						};
 						let patienceKiller = (prev) => {
 							setTimeout(() => {
 								if (vidID() == prev) {
 									J(".followbutton").parent().children("a:contains('Skip')").click();
 									newWin.close();
 								}
 							}, 1000 * 135)
 						};
 						let preload = (prev) => {
 							setTimeout(() => {
 								if (vidID() == prev) {
 									window.location = "https://www.youlikehits.com/youtubenew2.php";
 									newWin.close();
 								}
 							}, 1000 * 135)
 						};
 						if (vidID() != previousVideo) {
 							previousVideo = vidID();
 							if (window.eval("typeof(window.newWin) !== 'undefined'")) {
 								if (newWin.closed) {
 									setTimeout(function() {
 										location.reload();
 									}, 2000); //tiap 2 detik di reload
 								}
 							} else {
 								console.log("Watching one Video!");
 								J(".followbutton")[0].click();
 								//window.minimize();
 								newWin.resizeTo(100, 100);
 								setTimeout(function() {
 									window.open('https://www.youlikehits.com/history.php');
 								}, 25000); //tiap 25 detik ke halaman history dengan tab baru
 								preload(previousVideo)
 							}
 						}
 					}
 					break;
 			}
            GM.getValue("ylh_traffic_tab_open", false).then(state => {
 				switch (document.location.pathname) {
 					case "/websites.php":
 						if (J("*:contains('There are no Websites currently visitable for Points')").length) {
 							alertOnce("All websites were visited. Revisit/reload the page to start surfing again.")
 						} else {
 							if (!state && window.eval("typeof(window.childWindow) !== 'undefined'")) {
 								if (!childWindow.closed) childWindow.close();
 							} else if (state && window.eval("typeof(window.childWindow) == 'undefined'")) {
 								console.log("no child window is actually open. let's create a new tab as if we came here for the very first time!");
 								state = false;
 							}
 							var buttons = J(".followbutton:visible");
 							if (buttons.length) {
 								if (!state) {
 									console.log("setting the tabstate to true...");
 									GM.setValue('ylh_traffic_tab_open', true).then(() => {
 										console.log("Visiting a new page...");
 										buttons[0].onclick();
 									});
 								} else {}
 							} else {
 								console.log("We ran out of buttons! requesting more...");
 								//GM.getValue("ylh_traffic_reloadlimit", false).then(rlimit => {
 								if (window.eval("typeof(window.childWindow) !== 'undefined'") && childWindow.closed) //without this we would not wait for the last link of the page to be visited successfully
 									location.reload();
 								//J("a[title='Refresh']")[0].click();
 							}
 						}
 						break;
 					case "/viewwebsite.php":
 						if (!J("*:contains('been logged out of YouLikeHits')").length) {
 							if (J(".alert:visible:contains('You got'):contains('Points')").length || J('body:contains("We couldn\'t locate the website you\'re attempting to visit.")').length) {
 								console.log("setting the tabstate to false...");
 								GM.setValue('ylh_traffic_tab_open', false).then(() => { //free the way for a new tab
 									/*window.close(); //might not always work in FF
 									setTimeout (window.close, 1000);*/
 								});
 							} else if (J("*:contains('viewing websites too quickly!  Please wait')").length) location.reload();
 						} else alert("Please reload the website list, and make sure you are still logged in.");
 						break;
 				}
 			});
 		}
 	}, globalInterval);
 })();
