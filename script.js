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

const aiSequence = [4, 2, 6, 8];

let aiStep = 0;

function aiMove(){

    if(gameOver) return;

    while(aiStep < aiSequence.length){

        const move = aiSequence[aiStep];

        aiStep++;

        if(board[move] === ""){

            board[move] = "O";

            drawO(cells[move]);

            checkWinner();

            return;

        }

    }

}

/* ==========================================
   CHECK WINNER
========================================== */

function checkWinner(){

    for(const combo of winningCombinations){

        const a = combo[0];
        const b = combo[1];
        const c = combo[2];

        if(
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ){

            gameOver = true;

            drawWinningLine(combo);

            setTimeout(()=>{

                showWinPopup(board[a]);

            },800);

            return;

        }

    }

    if(!board.includes("")){

        gameOver = true;

        setTimeout(()=>{

            resetGame();

        },1000);

    }

}


/* ==========================================
   WIN POPUP
========================================== */

function showWinPopup(playerWon){

    winSound.currentTime = 0;
    winSound.play();

    fireworkSound.currentTime = 0;
    fireworkSound.play();

    startFireworks();

    winPopup.style.display = "flex";

}


/* ==========================================
   PLAY AGAIN
========================================== */

playAgainBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
    clickSound.play();

    stopFireworks();

    resetGame();

});


/* ==========================================
   EXIT
========================================== */

exitBtn.addEventListener("click",()=>{

    clickSound.currentTime = 0;
    clickSound.play();

    stopFireworks();

    sendCompletedMail();
    
    winPopup.style.display = "none";

    exitPopup.style.display = "flex";

});


/* ==========================================
   RESET GAME
========================================== */

function resetGame(){

    board = [

        "","","",
        "","","",
        "","",""

    ];

    gameOver = false;

    aiStep = 0;

    stopFireworks();

    winPopup.style.display = "none";

    exitPopup.style.display = "none";

    winningLine.style.display = "none";

    winningLine.style.width = "0px";

    cells.forEach((cell)=>{

        cell.innerHTML = "";

    });

}

/* ==========================================
   WINNING LINE
========================================== */

function drawWinningLine(combo){

    winningLine.style.position = "absolute";

    winningLine.style.height = "6px";

    winningLine.style.background = "#ff66ff";

    winningLine.style.boxShadow =
        "0 0 15px #ff66ff";

    winningLine.style.borderRadius = "20px";

    winningLine.style.transition = ".5s";

    /* Position animation Part 6-la complete pannuvom */

}

/* ==========================================
   PART 6
   WINNING LINE + SIMPLE FIREWORKS
========================================== */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = null;

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


/* ==========================================
   WINNING LINE
========================================== */

function drawWinningLine(combo){

    const boardRect = document.getElementById("board").getBoundingClientRect();

    const centers = [];

    cells.forEach(cell=>{

        const r = cell.getBoundingClientRect();

        centers.push({

            x:r.left+r.width/2,
            y:r.top+r.height/2

        });

    });

    const start = centers[combo[0]];
    const end = centers[combo[2]];

    const length = Math.hypot(
        end.x-start.x,
        end.y-start.y
    );

    const angle = Math.atan2(
        end.y-start.y,
        end.x-start.x
    )*180/Math.PI;

    winningLine.style.display="block";

    winningLine.style.left=start.x+"px";
    winningLine.style.top=start.y+"px";

    winningLine.style.transformOrigin="left center";

    winningLine.style.transform=`rotate(${angle}deg)`;

    winningLine.style.width="0px";

    requestAnimationFrame(()=>{

        winningLine.style.width=length+"px";

    });

}


/* ==========================================
   FIREWORKS
========================================== */

function startFireworks(){

    canvas.style.display="block";

    particles=[];

    for(let i=0;i<180;i++){

        particles.push({

            x:canvas.width/2,
            y:canvas.height/2,

            dx:(Math.random()-0.5)*12,
            dy:(Math.random()-0.5)*12,

            r:Math.random()*4+2,

            life:100

        });

    }

    animateFireworks();

}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        ctx.beginPath();

        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

        ctx.fillStyle=
        `hsla(${Math.random()*360},100%,70%,${p.life/100})`;

        ctx.fill();

        p.x+=p.dx;
        p.y+=p.dy;

        p.dy+=0.05;

        p.life--;

    });

    particles=particles.filter(p=>p.life>0);

    if(particles.length){

        animationId=requestAnimationFrame(animateFireworks);

    }

}

function stopFireworks(){

    cancelAnimationFrame(animationId);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    canvas.style.display="none";

}

function sendCompletedMail(){

    emailjs.send(
        "service_9cctalc",
        "template_7mk4qih",
        {
            subject: "🎮 Bharathi Priya Played Your Tic Tac Toe Game ❤️",

            message: `Hi Rithish,

Bharathi Priya has successfully completed your Tic Tac Toe game.

Game Status: Completed ✅

Thank you for creating this beautiful memory.

With Love,
Memory Game ❤️`
        }
    )
    .then(()=>{
        console.log("Mail Sent");
    })
    .catch((error)=>{
        console.log(error);
    });

}
