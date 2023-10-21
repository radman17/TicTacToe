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
const resetScoreEls = function () {
    scoreEls[0].textContent = scores[0];
    scoreEls[1].textContent = scores[1];
}
const changeTurn = function () {
    resultChildren[turn].classList.remove("turn-on")
    turn = turn === 0 ? 1 : 0;
    resultChildren[turn].classList.add("turn-on")
}



// choose game mode
playerModeBtnEl.addEventListener("click", function () {
    mode = 'player';
    playing = true;
    turn = Math.trunc(Math.random() * 10) % 2 === 0 ? 0 : 1;
    resultChildren[turn].classList.add("turn-on")
    goToGamePage();
    nameEls[0].textContent = "PLAYER-1";
    nameEls[1].textContent = "PLAYER-2";
    resetScoreEls()

})
computerModeBtnEl.addEventListener("click", function () {
    mode = "computer";
    playing = true;
    turn = Math.trunc(Math.random() * 10) % 2 === 0 ? 0 : 1;
    resultChildren[turn].classList.add("turn-on")
    goToGamePage();
    nameEls[0].textContent = "PLAYER";
    nameEls[1].textContent = 'COMPUTER';
    resetScoreEls()
})

for (let i = 0; i < cellsEl.length; i++) {
    cellsEl[i].addEventListener("click", function () {
        if (playing && mode === "player" && cellsArr[i] === null) {
            cellsEl[i].insertAdjacentHTML("afterbegin", `<span class="sign-${turn}"></span>`);
            cellsArr[i] = turn;
            changeTurn()
            // check if someone wins
            for (let j = 0; j < patternsToWin.length; j++) {
                const [firstCell, secondCell, thirdCell] = patternsToWin[j];
                if (cellsArr[firstCell] !== null && cellsArr[firstCell] === cellsArr[secondCell] && cellsArr[secondCell] === cellsArr[thirdCell]) {
                    winner = turn === 0 ? 1 : 0;
                    scoreEls[winner].textContent = ++scores[winner];
                    cellsEl[firstCell].classList.add("winning-on");
                    cellsEl[secondCell].classList.add("winning-on");
                    cellsEl[thirdCell].classList.add("winning-on");
                    resultChildren[winner].classList.add('winning-on');
                    resetBoardBtnEl.classList.add("beat-animation")
                    playing = false;
                    resultChildren[turn].classList.remove('turn-on');
                    return 0;
                } else if (!cellsArr.includes(null)) {
                    playing = false;
                    resultChildren[turn].classList.remove('turn-on');
                    resetBoardBtnEl.classList.add("beat-animation");
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
