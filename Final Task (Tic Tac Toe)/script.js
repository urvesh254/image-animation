let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const BOARD_LENGTH = 3;
const WIDTH = 500;
const HEIGHT = 500;
const SOURCE = {
    X: "assets/X.png",
    O: "assets/O.png",
    blank: "assets/blank.png",
};
const WIN_POSITIONS = [
    (0, 1, 2),
    (3, 4, 5),
    (6, 7, 8),
    (0, 3, 6),
    (1, 4, 7),
    (2, 5, 8),
    (0, 4, 8),
    (2, 4, 6),
];
let board;

class Img {
    constructor(name, src, y, x) {
        this.name = name;
        this.x = x;
        this.y = y;

        this.image = new Image(WIDTH / 3, WIDTH / 3);
        this.image.src = src;
        this.image.onload = () => {
            x = x * (WIDTH / 3);
            y = y * (HEIGHT / 3);
            ctx.drawImage(this.image, x, y);
        };
    }
}

let resetGame = () => {
    board = [];
    for (let row = 0; row < BOARD_LENGTH; row++) {
        let temp = [];
        for (let col = 0; col < BOARD_LENGTH; col++) {
            temp.push("");
        }
        board.push(temp);
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawLines();
};

let drawLine = (x1, y1, x2, y2, color = "black", lineWidth = 5) => {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
};

let drawLines = () => {
    drawLine(WIDTH / 3, 0, WIDTH / 3, HEIGHT);
    drawLine((WIDTH / 3) * 2, 0, (WIDTH / 3) * 2, HEIGHT);
    drawLine(0, HEIGHT / 3, WIDTH, HEIGHT / 3);
    drawLine(0, (HEIGHT / 3) * 2, WIDTH, (HEIGHT / 3) * 2);
};

let checkWinCondition = () => {
    // Check win for all rows.
    for (let row = 0; row < BOARD_LENGTH; row++) {
        if (
            board[row][0] &&
            board[row][0] == board[row][1] &&
            board[row][1] == board[row][2]
        ) {
            drawLine(
                0,
                row * (HEIGHT / 3) + HEIGHT / 6,
                WIDTH,
                row * (HEIGHT / 3) + HEIGHT / 6,
                "red",
                10
            );
            return true;
        }
    }

    // Check win for all colums.
    for (let col = 0; col < BOARD_LENGTH; col++) {
        if (
            board[0][col] &&
            board[0][col] == board[1][col] &&
            board[1][col] == board[2][col]
        ) {
            drawLine(
                col * (WIDTH / 3) + WIDTH / 6,
                0,
                col * (WIDTH / 3) + WIDTH / 6,
                HEIGHT,
                "red",
                10
            );
            return true;
        }
    }

    // Check For two diagonals.
    if (
        board[0][0] &&
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2]
    ) {
        drawLine(0, 0, WIDTH, HEIGHT, "red", 10);
        return true;
    }
    if (
        board[0][2] &&
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0]
    ) {
        drawLine(0, HEIGHT, WIDTH, 0, "red", 10);
        return true;
    }
    return false;
};

let winMessage = (msg) => {
    console.log(msg);
};

let computerTurn = () => {};

canvas.addEventListener("click", () => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let row = Math.floor(y / (HEIGHT / 3));
    let col = Math.floor(x / (WIDTH / 3));

    console.log(row, col);
    if (board[row][col]) {
        alert("This placed is filled, Try another.");
        return;
    }

    board[row][col] = "X";
    new Img("X", SOURCE["X"], row, col);
    console.log(checkWinCondition());
    // if (checkWinCondition()) {
    //     winMessage("You Win!");
    // return;
    // }

    // computerTurn();
    // if (checkWinCondition()) {
    //     winMessage("You Lost!");
    // return;
    // }
});

window.onload = resetGame();
