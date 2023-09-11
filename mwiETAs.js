// ==UserScript==
// @name         Milky Way Idle - ETAs
// @version      0.5
// @description  MWI ETAs added
// @author       DevSwitch
// @match        https://www.milkywayidle.com/game
// @icon         https://www.google.com/s2/favicons?sz=64&domain=milkywayidle.com
// @downloadURL  https://raw.githubusercontent.com/switchlove/Milky-Way-Idle-Scripts/main/mwiETAs.js
// @updateURL    https://raw.githubusercontent.com/switchlove/Milky-Way-Idle-Scripts/main/mwiETAs.js
// @grant        none
// ==/UserScript==

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

String.prototype.toDDHHMMSS = function () {
    let sec_num = parseInt(this, 10);
    var days = Math.floor(sec_num / 3600 / 24);
    sec_num = sec_num - days * 24 * 3600;
    var hours = Math.floor(sec_num / 3600);
    sec_num = sec_num - hours * 3600;
    var minutes = Math.floor(sec_num / 60);
    sec_num = sec_num - minutes * 60;
    var seconds = sec_num;

    if (days == 0) {
        days = "";
    } else if (days == 1) {
        days = "0" + days + " Day ";
    } else if (days < 10) {
        days = "0" + days + " Days ";
    } else {
        days = days + " Days ";
    }

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return days + hours + ":" + minutes + ":" + seconds;
};


function winLoad(callback, timeout = 200) {
    let called = false;
    window.addEventListener("load", () => {
        if (!called) {
            called = true;
            callback();
        }
    });
    setTimeout(() => {
        if (!called && document.readyState === 'complete') {
            called = true;
            callback();
        }
    }, timeout);
}

winLoad(function() {
    setTimeout(function(){
        main();
    }, 2500);
});


function main() {
    setInterval(function(){
        getEta();
        roughEta();
    }, 250);
}

function getEta() {
    var trueEta;
    var progressBarHead = document.querySelector("#root > div > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div > div.Header_actionName__31-L2 > div");
    var progressBarText = progressBarHead.innerText;

    var myContainer = document.querySelector("#automationContainer");
    if (myContainer === null) {
        document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div.Header_currentAction__3IaOm > div.Header_actionName__31-L2").style.height = '40px';

        var mainDiv = document.createElement('div');
        mainDiv.id = 'automationContainer';
        mainDiv.style = 'text-align: left;';
        mainDiv.appendAfter( progressBarHead );

        var etaText = document.createElement('span');
        etaText.className = 'Header';
        etaText.textContent = '';
        document.querySelector("#automationContainer").append(etaText);
    }

    if (progressBarText.includes('Doing nothing...') != true) {
        if (progressBarText.includes('Combat') != true) {
            if (progressBarText.includes('(') == true) {
                if (document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div.Header_currentAction__3IaOm > div.Header_actionName__31-L2").style.height != '40px') {
                    document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div.Header_currentAction__3IaOm > div.Header_actionName__31-L2").style.height = '40px';
                }
                var timePer = document.querySelector("#root > div > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div > div.Header_progressBarAndButton__3yfVI > div.Header_progressBarContainer__2NXUU > div > div.ProgressBar_text__102Yn > span:nth-child(1)").innerText.split('s')[0];
                var actionsLeft = progressBarHead.innerText.split('(')[1].split(')')[0];

                if (actionsLeft.includes("K") == true) {
                    actionsLeft = actionsLeft.split('K')[0] * 1000;
                    trueEta = '~' + String(timePer * actionsLeft).toDDHHMMSS();
                } else {
                    trueEta = String(timePer * actionsLeft).toDDHHMMSS();
                }

                document.querySelector("#automationContainer > span").innerHTML = `ETA: ${trueEta}`;
            }
        } else {
            document.querySelector("#automationContainer > span").innerHTML = ``;
            document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div.Header_currentAction__3IaOm > div.Header_actionName__31-L2").style.height = '20px';
        }
    } else {
        document.querySelector("#automationContainer > span").innerHTML = ``;
        document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_headerPanel__1T_cA > div > div.Header_leftHeader__PkRWX > div.Header_actionInfo__1iIAQ > div.Header_myActions__3rlBU > div.Header_currentAction__3IaOm > div.Header_actionName__31-L2").style.height = '20px';
    }
}

function roughEta() {
    var queueAmount = document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_gamePanel__3uNKN > div.GamePage_contentPanel__Zx4FH > div.GamePage_middlePanel__uDts7 > div.GamePage_mainPanel__2njyb > div > div:nth-child(1) > div > div.Modal_modalContainer__3B80m > div.Modal_modal__1Jiep > div.SkillActionDetail_skillActionDetail__1jHU4 > div > div.SkillActionDetail_actionContainer__22yYX > div.SkillActionDetail_maxActionCountInput__1C0Pw > input");
    if (queueAmount != undefined || queueAmount != null) {
        var myContainer = document.querySelector("#roughEtaContainer");
        if (myContainer === null) {
            var mainDiv = document.createElement('div');
            mainDiv.id = 'roughEtaContainer';
            mainDiv.style = 'text-align: left;';
            mainDiv.appendAfter( document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_gamePanel__3uNKN > div.GamePage_contentPanel__Zx4FH > div.GamePage_middlePanel__uDts7 > div.GamePage_mainPanel__2njyb > div > div:nth-child(1) > div > div.Modal_modalContainer__3B80m > div.Modal_modal__1Jiep > div.SkillActionDetail_skillActionDetail__1jHU4 > div > div.SkillActionDetail_actionContainer__22yYX > div.SkillActionDetail_maxActionCountInput__1C0Pw") );

            var etaText = document.createElement('span');
            etaText.textContent = '';
            document.querySelector("#roughEtaContainer").append(etaText);
        }

        if (queueAmount.value != 'unlimited') {
            if (queueAmount.value != '') {
                var toDoAmount = queueAmount.value;
                var timeTaken = Number(document.querySelector("#root > div.App_app__3-YeL > div > div.GamePage_gamePanel__3uNKN > div.GamePage_contentPanel__Zx4FH > div.GamePage_middlePanel__uDts7 > div.GamePage_mainPanel__2njyb > div > div:nth-child(1) > div > div.Modal_modalContainer__3B80m > div.Modal_modal__1Jiep > div.SkillActionDetail_skillActionDetail__1jHU4 > div > div.SkillActionDetail_content__1MbXv > div > div:nth-child(8)").innerText.split('s')[0]);
                var estimatedEta = String(toDoAmount * timeTaken).toDDHHMMSS();
                document.querySelector("#roughEtaContainer > span").innerHTML = `ETA: ${estimatedEta}`;
            } else {
            document.querySelector("#roughEtaContainer > span").innerHTML = ``;
            }
        } else {
            document.querySelector("#roughEtaContainer > span").innerHTML = ``;
        }
    }
}
