"use strict";


// 0 means o
// 1 means x

// SELECTING 
// Components
const chooseGameModeComp = document.querySelector('.choose-mode-component');
const gameComp = document.querySelector(".game-component");
// Elements
const playerModeBtnEl = document.querySelector('.player-mode.btn');
const computerModeBtnEl = document.querySelector('.computer-mode.btn');
const resetBoardBtnEl = document.querySelector('.reset-board');
// result section
const resultEl = document.querySelector(".result");
const resultChildren = document.querySelectorAll('.result-child');
const nameEls = document.querySelectorAll('.result-child h2');
const scoreEls = document.querySelectorAll("[class^=score]");
// cells section
const cellsEl = document.querySelectorAll('[class^=cell-]');



// VARIABLES
let mode = null;
let playing = false;
// 0 means o
// 1 means x
let winner = null;
let turn = null;
const cellsArr = [null, null, null
    , null, null, null
    , null, null, null];
const patternsToWin = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [8, 5, 2],
    [8, 7, 6],
    [2, 4, 6],
    [3, 4, 5],
    [1, 4, 7],
];
const scores = [0, 0];


// FUNCTIONS
const goToGamePage = function () {
    chooseGameModeComp.classList.add("hidden");
    gameComp.classList.remove("hidden");
}
const startPlaying = function () {
    playing = true;
    turn = Math.trunc(Math.random() * 10) % 2 === 0 ? 0 : 1;
    resultChildren[turn].classList.add("turn-on");
}
const stopPlaying = function () {
    playing = false;
    resultChildren[turn].classList.remove('turn-on');
    resetBoardBtnEl.classList.add("beat-animation");
}
const checkForWin = function () {
    for (let i = 0; i < patternsToWin.length; i++) {
        const [firstCell, secondCell, thirdCell] = patternsToWin[i];
        if (cellsArr[firstCell] !== null && cellsArr[firstCell] === cellsArr[secondCell] && cellsArr[secondCell] === cellsArr[thirdCell]) {
            stopPlaying();
            winner = turn === 0 ? 1 : 0;
            scoreEls[winner].textContent = ++scores[winner];
            cellsEl[firstCell].classList.add("winning-on");
            cellsEl[secondCell].classList.add("winning-on");
            cellsEl[thirdCell].classList.add("winning-on");
            resultChildren[winner].classList.add('winning-on');
        } else if (!cellsArr.includes(null)) {
            stopPlaying();
        }
    }
}
const resetScoreEls = function () {
    scoreEls[0].textContent = scores[0];
    scoreEls[1].textContent = scores[1];
}
// must be used befor switching turn
const markCell = function (cellIndex) {
    cellsArr[cellIndex] = turn;
    cellsEl[cellIndex].insertAdjacentHTML("afterbegin", `<span class="sign-${turn}"></span>`);
}
const changeTurn = function () {
    resultChildren[turn].classList.remove("turn-on")
    turn = turn === 0 ? 1 : 0;
    resultChildren[turn].classList.add("turn-on")
}



// choose game mode
playerModeBtnEl.addEventListener("click", function () {
    mode = 'player';
    goToGamePage();
    startPlaying();
    resetScoreEls();
    nameEls[0].textContent = "PLAYER-1";
    nameEls[1].textContent = "PLAYER-2";


})
computerModeBtnEl.addEventListener("click", function () {
    mode = "computer";
    goToGamePage();
    startPlaying();
    resetScoreEls()
    nameEls[0].textContent = "PLAYER";
    nameEls[1].textContent = 'COMPUTER';
    if (turn === 1) {
        let randomCell = Math.trunc(Math.random() * 9);
        markCell(randomCell);
        changeTurn();
    }
})

for (let i = 0; i < cellsEl.length; i++) {
    cellsEl[i].addEventListener("click", function () {
        // player mode
        if (playing && cellsArr[i] === null) {
            if (mode === "player") {
                markCell(i);
                changeTurn();
                // check for win
                checkForWin();
            } else if (mode === "computer") {
                if (turn === 0) {
                    markCell(i);
                    changeTurn();
                    checkForWin();
                }
                // computer decides where to cell :


                for (let j = 0; j < patternsToWin.length; j++) {
                    const threeCellsIndex = patternsToWin[j];
                    const threeCellsValue = [cellsArr[threeCellsIndex[0]], cellsArr[threeCellsIndex[1]], cellsArr[threeCellsIndex[2]]];
                    if (threeCellsValue.filter(cell => cell === 0).length === 2 && threeCellsValue.includes(null)) {
                        markCell(threeCellsIndex[threeCellsValue.indexOf(null)]);
                        changeTurn();
                        checkForWin();
                        return 0;
                    }
                }

                for (let j = 0; j < patternsToWin.length; j++) {
                    const threeCellsIndex = patternsToWin[j];
                    const threeCellsValue = [cellsArr[threeCellsIndex[0]], cellsArr[threeCellsIndex[1]], cellsArr[threeCellsIndex[2]]];
                    if (threeCellsValue.filter(cell => cell === 1).length === 2 && threeCellsValue.includes(null)) {
                        markCell(threeCellsIndex[threeCellsValue.indexOf(null)]);
                        changeTurn();
                        checkForWin();
                        return 0;
                    }
                }

                for (let j = 0; j < patternsToWin.length; j++) {
                    const threeCellsIndex = patternsToWin[j];
                    const threeCellsValue = [cellsArr[threeCellsIndex[0]], cellsArr[threeCellsIndex[1]], cellsArr[threeCellsIndex[2]]];
                    if (threeCellsValue.filter(cell => cell === 1).length === 1 && threeCellsValue.includes(null)) {
                        markCell(threeCellsIndex[threeCellsValue.indexOf(null)]);
                        changeTurn();
                        checkForWin();
                        return 0;
                    }
                }

                if (cellsArr.includes(null)) {
                    let randomCell = Math.trunc(Math.random() * 9);
                    while (cellsArr[randomCell] !== null) {
                        randomCell = Math.trunc(Math.random() * 9);
                    }
                    markCell(randomCell);
                    changeTurn();
                    checkForWin();
                }



            }
        }
    })
}


resetBoardBtnEl.addEventListener("click", function () {
    playing = true;
    for (let i = 0; i < 9; i++) {
        cellsArr[i] = null;
        cellsEl[i].innerHTML = '';
        cellsEl[i].classList.remove("winning-on");
    }
    resultChildren[0].classList.remove('winning-on');
    resultChildren[1].classList.remove('winning-on');
    resultChildren[turn].classList.add('turn-on');
    resetBoardBtnEl.classList.remove("beat-animation");
})