/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const resetBtnEl = document.getElementById("reset");

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ["","","","","","","","",""];
    turn = "X";
    winner = false;
    tie = false;
    console.log("int")
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((val, idx) => {
        squareEls[idx].textContent = val;
    });
}

function updateMessage(){
    if( winner === false && tie === false){
        messageEl.textContent =  `player ${turn}`;
    }else if(winner === false && tie === true  ){
        messageEl.textContent = 'It is tie!';
    }else{
        messageEl.textContent = `the winner is ${turn}`;
    }
}


function handleClick(event) {
    const idx = parseInt(event.target.id);
    if (board[idx] || winner) return;
    placePiece(idx);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(idx) {
    board[idx] = turn;
}

function checkForWinner(){
    for(i=0 ; i< winningCombos.length;i++){
        const [a, b, c] = winningCombos[i];
        if(board [a] !== '' && board [a] === board [b] && board[a] === board[c]){
            winner=true;
            return;
        }
    }
}



function checkForTie(){
    if(winner){
        return;
    }else if(board.includes("")){
        tie = false;
    }else{
        tie = true;
    }
}


function switchPlayerTurn(){
    if(winner){
        return;
    }else if(turn === 'X'){
        turn = 'O';
    }else{
        turn = 'X';
    }
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(sqr => sqr.addEventListener("click", handleClick));
resetBtnEl.addEventListener("click", init);

init();
