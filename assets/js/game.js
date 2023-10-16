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
                    let winner = turn === 0 ? 1 : 0;
                    scoreEls[winner].textContent = ++scores[winner];
                    cellsEl[firstCell].classList.add("winning-on");
                    cellsEl[secondCell].classList.add("winning-on");
                    cellsEl[thirdCell].classList.add("winning-on");
                    resultChildren[winner].classList.add('winning-on');
                    resetBoardBtnEl.classList.add("beat-animation")
                    playing = false;
                    resultChildren[turn].classList.remove('turn-on');
                    return 0;
                }
            }
        }
    })
}


resetBoardBtnEl.addEventListener("click", function () {

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