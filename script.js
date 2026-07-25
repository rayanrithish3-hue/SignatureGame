/* ==========================================
   ELEMENTS
========================================== */

const welcomeTitle = document.getElementById("welcome-title");
const welcomeSubtitle = document.getElementById("welcome-subtitle");

const startBtn = document.getElementById("start-btn");

const welcomeScreen = document.getElementById("welcome-screen");
const loadingScreen = document.getElementById("loading-screen");
const gameScreen = document.getElementById("game-screen");

const bgMusic = document.getElementById("bgmusic");
const clickSound = document.getElementById("clickSound");


/* ==========================================
   TEXT
========================================== */

const titleText = "Welcome to the Game";
const subtitleText =
"Please click the Start button to start the game Bharathi Priya ❤️";


/* ==========================================
   TYPEWRITER
========================================== */

let titleIndex = 0;
let subtitleIndex = 0;

function typeTitle(){

    if(titleIndex < titleText.length){

        welcomeTitle.textContent += titleText.charAt(titleIndex);

        titleIndex++;

        setTimeout(typeTitle,80);

    }

    else{

        setTimeout(typeSubtitle,300);

    }

}


function typeSubtitle(){

    if(subtitleIndex < subtitleText.length){

        welcomeSubtitle.textContent +=
        subtitleText.charAt(subtitleIndex);

        subtitleIndex++;

        setTimeout(typeSubtitle,35);

    }

}


/* ==========================================
   START
========================================== */

startBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
    clickSound.play();

    bgMusic.volume = 0.35;

    bgMusic.play().catch(()=>{});

    welcomeScreen.style.display = "none";

    loadingScreen.style.display = "flex";

    setTimeout(()=>{

        loadingScreen.style.display = "none";

        gameScreen.style.display = "flex";

    },2000);

});


/* ==========================================
   INITIALIZE
========================================== */

window.onload=()=>{

    typeTitle();

};


/* ==========================================
   GAME VARIABLES
========================================== */

const cells = document.querySelectorAll(".cell");

const pencilSound = document.getElementById("pencilSound");
const winSound = document.getElementById("winSound");
const fireworkSound = document.getElementById("fireworkSound");

const playAgainBtn = document.getElementById("play-again");
const exitBtn = document.getElementById("exit-game");

const winPopup = document.getElementById("win-popup");
const exitPopup = document.getElementById("exit-popup");

const winningLine = document.getElementById("winning-line");


let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let player = "X";
let gameOver = false;


/* ==========================================
   WINNING COMBINATIONS
========================================== */

const winningCombinations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];


/* ==========================================
   CLICK EVENTS
========================================== */

cells.forEach((cell)=>{

    cell.addEventListener("click",playerMove);

});


/* ==========================================
   PLAYER MOVE
========================================== */

function playerMove(e){

    if(gameOver) return;

    const cell = e.target;

    const index = Number(cell.dataset.index);

    if(board[index] !== "") return;

    drawX(cell);

    board[index] = "X";

    checkWinner();

    if(gameOver) return;

    setTimeout(aiMove,700);

}


/* ==========================================
   DRAW X
========================================== */

function drawX(cell){

    pencilSound.currentTime = 0;
    pencilSound.play();

    cell.innerHTML = "";

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox","0 0 100 100");
    svg.setAttribute("width","80%");
    svg.setAttribute("height","80%");

    const line1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line1.setAttribute("x1","20");
    line1.setAttribute("y1","20");
    line1.setAttribute("x2","80");
    line1.setAttribute("y2","80");

    line1.setAttribute("stroke","white");
    line1.setAttribute("stroke-width","8");
    line1.setAttribute("stroke-linecap","round");

    line1.style.strokeDasharray = 100;
    line1.style.strokeDashoffset = 100;
    line1.style.transition = ".25s";

    const line2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line2.setAttribute("x1","80");
    line2.setAttribute("y1","20");
    line2.setAttribute("x2","20");
    line2.setAttribute("y2","80");

    line2.setAttribute("stroke","white");
    line2.setAttribute("stroke-width","8");
    line2.setAttribute("stroke-linecap","round");

    line2.style.strokeDasharray = 100;
    line2.style.strokeDashoffset = 100;
    line2.style.transition = ".25s";

    svg.appendChild(line1);
    svg.appendChild(line2);

    cell.appendChild(svg);

    requestAnimationFrame(()=>{

        line1.style.strokeDashoffset = 0;

    });

    setTimeout(()=>{

        line2.style.strokeDashoffset = 0;

    },180);

}


/* ==========================================
   DRAW O
========================================== */

function drawO(cell){

    pencilSound.currentTime = 0;
    pencilSound.play();

    cell.innerHTML = "";

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox","0 0 100 100");
    svg.setAttribute("width","80%");
    svg.setAttribute("height","80%");

    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    circle.setAttribute("cx","50");
    circle.setAttribute("cy","50");
    circle.setAttribute("r","30");

    circle.setAttribute("fill","black");

    circle.setAttribute("stroke","#b100ff");
    circle.setAttribute("stroke-width","8");

    circle.style.filter =
        "drop-shadow(0 0 8px #d96cff) drop-shadow(0 0 16px #b100ff)";

    circle.style.strokeDasharray = 190;
    circle.style.strokeDashoffset = 190;

    circle.style.transition = ".35s";

    svg.appendChild(circle);

    cell.appendChild(svg);

    requestAnimationFrame(()=>{

        circle.style.strokeDashoffset = 0;

    });

}


/* ==========================================
   AI MOVE
========================================== */

function aiMove(){

    if(gameOver) return;

    const empty = [];

    board.forEach((value,index)=>{

        if(value===""){

            empty.push(index);

        }

    });

    if(empty.length===0) return;

    const randomIndex =
        empty[Math.floor(Math.random()*empty.length)];

    board[randomIndex]="O";

    drawO(cells[randomIndex]);

    checkWinner();

}
