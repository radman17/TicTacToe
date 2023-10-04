"use strict";


// 0 means o
// 1 means x

// SELECTING 
// components
const chooseGameModeComp = document.querySelector('.choose-mode-component');
const gameComp = document.querySelector(".game-component");
// elements
const playerModeBtnEl = document.querySelector('.player-mode.btn');
const computerModeBtnEl = document.querySelector('.computer-mode.btn');

const resultEl = document.querySelector(".result");
const [resultChild0El, resultChild1El] = resultEl.children;
const [name0El, score0El] = resultChild0El.children;
const [name1El, score1El] = resultChild1El.children;


// VARIABLES
let mode = null;


// FUNCTIONS
const goToGamePage = function () {
    chooseGameModeComp.classList.add("hidden");
    gameComp.classList.remove("hidden");
}





playerModeBtnEl.addEventListener("click", function () {
    mode = 'player';
    goToGamePage();
    name0El.textContent = "PLAYER-1";
    name1El.textContent = "PLAYER-2";

})
computerModeBtnEl.addEventListener("click", function () {
    mode = "computer";
    goToGamePage();
    name0El.textContent = "PLAYER";
    name1El.textContent = 'COMPUTER';
})

































// const playersScore = [];
// let tieTimes;
// let playerTurn;
// let winner;
// let playing;


// const playersScoreEls = document.querySelectorAll("[class^=score-player-]");
// const tieTimesEl = document.querySelector(".tie-times");
// const cellEls = document.querySelectorAll("[class^=cell-]");
// const displayTurnEl = document.querySelector(".display-turn");
// const playerTurnEl = document.querySelector(".player-turn");
// const turnMessageEl = document.querySelector(".turn-message");
// const newRoundBtn = document.querySelector('.new-round');

// // reset
// const int = function () {
//     playing = true;

//     playersScore[0] = 0;
//     playersScoreEls[0].textContent = playersScore[0];

//     tieTimes = 0;
//     tieTimesEl.textContent = tieTimes;

//     playersScore[1] = 0;
//     playersScoreEls[1].textContent = playersScore[1];

//     playerTurn = 0;
//     playerTurnEl.textContent = playerTurn === 0 ? "O" : "X";
// }
// const resetBoard = function () {
//     playing = true;
//     for (let i = 0; i < cellEls.length; i++) {
//         cellEls[i].textContent = '';
//         cellEls[i].classList.remove("winning-on");
//         cellsState[i] = null;
//     }
//     displayTurnEl.classList.remove('winning-on');
//     playerTurnEl.style.display = "inline";
//     playerTurnEl.textContent = playerTurn === 0 ? "O" : "X";
//     turnMessageEl.textContent = "TURN";
//     newRoundBtn.classList.remove('beat-animation');
// }
// int();


// const cellsState = [
//     null, null, null,
//     null, null, null,
//     null, null, null
// ];
// // 0 means o
// // 1 means x
// // null means empty
// const patternsToWin = [
//     [0, 1, 2],
//     [0, 4, 8],
//     [0, 3, 6],
//     [8, 5, 2],
//     [8, 7, 6],
//     [2, 4, 6],
//     [3, 4, 5],
//     [1, 4, 7],
// ]


// for (let i = 0; i < cellEls.length; i++) {
//     cellEls[i].addEventListener("click", function () {
//         if (playing) {
//             if (cellsState[i] === null) {
//                 cellEls[i].textContent = playerTurn === 0 ? "O" : "X";
//                 cellsState[i] = playerTurn;
//                 playerTurn = playerTurn === 0 ? 1 : 0;
//                 playerTurnEl.textContent = playerTurn === 0 ? "O" : "X";
//                 for (let j = 0; j < patternsToWin.length; j++) {
//                     const first = patternsToWin[j][0];
//                     const second = patternsToWin[j][1];
//                     const third = patternsToWin[j][2];
//                     // when a player wins
//                     if (cellsState[first] !== null && cellsState[first] === cellsState[second] && cellsState[second] === cellsState[third]) {
//                         winner = playerTurn === 0 ? 1 : 0;
//                         playersScore[winner]++;
//                         playersScoreEls[winner].textContent = playersScore[winner];
//                         cellEls[first].classList.add("winning-on");
//                         cellEls[second].classList.add("winning-on");
//                         cellEls[third].classList.add("winning-on");
//                         displayTurnEl.classList.add('winning-on');
//                         playerTurnEl.style.display = "none";
//                         turnMessageEl.textContent = `PLAYER-${winner === 0 ? "O" : "X"} WON THIS ROUND`
//                         newRoundBtn.classList.add("beat-animation");
//                         playing = false;
//                         return 0;
//                     }
//                 }
//                 // when the result is draw
//                 if (!cellsState.includes(null)) {
//                     tieTimes++;
//                     tieTimesEl.textContent = tieTimes;
//                     playerTurnEl.style.display = "none";
//                     turnMessageEl.textContent = `TIE`
//                     newRoundBtn.classList.add("beat-animation");
//                     playing = false;
//                     return 0;
//                 }

//             }
//         }
//     })
// }

// newRoundBtn.addEventListener("click", resetBoard)