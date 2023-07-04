let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const player1 = "X";
const botPlayer = "O";
let isBotPlaying = false;

let currentPlayer = player1;

function checkWinner(player) {
    for (let col in [0, 1, 2]) {
        if (board[0][col] == player && board[1][col] == player && board[2][col] == player) return true;
    }
    for (let col in [0, 1, 2]) {
        if (board[col][0] == player && board[col][1] == player && board[col][2] == player) return true;
    }
    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true;
    if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true;
    return false;
}

function checkTie() {
    if (board[0].every(e => e != "") && board[1].every(e => e != "") && board[2].every(e => e != "")) return true;
    else return false;
}

function setListeners() {
    const cols = Array.from(document.getElementsByClassName("column"));
    cols.forEach(col => {
        col.addEventListener('click', () => {
            let column = col.id;
            let row = parseInt(col.parentElement.id.charAt(4));
            if (col.innerHTML != "-") return;
            col.innerHTML = currentPlayer;
            game(row, column);
        }, { once: false })
    });
}
setListeners();

function game(row, col) {
    if (board[row][col]) return;
    board[row][col] = currentPlayer;

    if (checkWinner(currentPlayer)) {
        playerWonScreen(currentPlayer);
        return;
    }
    if (checkTie()) return tieScreen();

    togglePlayer();
}

function togglePlayer() {
    //currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log("toggled")
    if (currentPlayer === player1) {
        currentPlayer = botPlayer;
        document.getElementById("p1").classList.remove("active");
        document.getElementById("p2").classList.add("active");

        if (isBotPlaying) {
            const overlay = document.getElementById('overlay');
            overlay.style.pointerEvents = 'all';
            setTimeout(() => {
                let [rowPos, colPos] = getBotMove();
                overlay.style.pointerEvents = 'none';
                document.getElementById(`row-${rowPos}`).children[colPos].click();
            }, 800);
        }
    } else {
        currentPlayer = player1;
        document.getElementById("p2").classList.remove("active");
        document.getElementById("p1").classList.add("active");
    }
}

function playerWonScreen(player) {
    if (player == botPlayer && isBotPlaying) player = "Bot";
    document.getElementById("wonPlayerTitle").innerHTML = `Player ${player} Won!`;
    setTimeout(() => {
        document.getElementById("game-end").style.display = "grid";
        document.getElementById("mc").style.display = "none";
    }, 500)
    //const overlay = document.getElementById('overlay');
    //overlay.style.pointerEvents = 'none';
}
function tieScreen() {
    document.getElementById("wonPlayerTitle").innerHTML = `It's a tie!`;
    document.getElementById("game-end").style.display = "grid";
    document.getElementById("mc").style.display = "none";
    //const overlay = document.getElementById('overlay');
    //overlay.style.pointerEvents = 'none';
}

function getBotMove() {
    if (board[1][1] == "") {
        //console.log(board[1][1])
        console.log("here 0");
        return [1, 1];
    };

    for (let row in board) {
        for (let col in board[row]) {
            if (board[row][col] == "") {
                board[row][col] = botPlayer;
                if (checkWinner(botPlayer)) {
                    board[row][col] = "";
                    console.log("here 1")
                    return [row, col];
                }
                board[row][col] = "";
            }
        }
    }

    for (let row in board) {
        for (let col in board[row]) {
            if (board[row][col] == "") {
                board[row][col] = player1;
                if (checkWinner(player1)) {
                    board[row][col] = "";
                    console.log("here 2")
                    return [row, col];
                }
                board[row][col] = "";
            }
        }
    }

    while (true) {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);

        //console.log(row, col);
        if (board[row][col] == "") {
            console.log("here 3")
            return [row, col];
        }
    }
}

function botPlaying(v) {
    isBotPlaying = v;
    document.getElementById("menu").style.display = "none";
    document.getElementById("mc").style.display = "grid";
}

function resetBoxes() {

    Array.from(document.getElementsByClassName("row")).forEach(element => {
        Array.from(element.children).forEach(ele => {
            ele.innerHTML = "-";
        })
    });
}
resetBoxes();


function reload() {

    document.getElementById("menu").style.display = "grid";
    document.getElementById('mc').style.display = "none";
    document.getElementById('game-end').style.display = "none";
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    isBotPlaying = false;
    currentPlayer = player1;

    document.getElementById("p2").classList.remove("active");
    document.getElementById("p1").classList.add("active");

    //setListeners();
    resetBoxes();

    //location.reload(true)
    //location = location;
}
