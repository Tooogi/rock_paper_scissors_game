//Game
const user = document.querySelector("#user");
const computer = document.querySelector("#computer");
const winner = document.querySelector("#winner");
const yourScore = document.querySelector(".yourScore");
const computerScore = document.querySelector(".computerScore");
let player;
let opponent;
let win;
let your_Score = 1;
let computer_Score = 1;

//Get rock, paper or scissors from user selection
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const player = button.value;

        //Random computer choice
        computerSelect();

        //User choice
        user.innerHTML = player;

        //Winner
        winner.innerHTML = isWinner();

        //Mark up winner
        function isWinner() {
            if (opponent === "Rock" && player === "Rock" || opponent === "Paper" && player === "Paper" || opponent === "Scissors" && player === "Scissors") {
                return "Draw";
            } else if (opponent === "Rock" && player === "Scissors" || opponent === "Paper" && player === "Rock" || opponent === "Scissors" && player === "Paper") {
                let text = "Computer win";
                let cScore = computer_Score++;
                computerScore.innerHTML = cScore;

                return text;
                
            } else if (opponent === "Scissors" && player === "Rock" || opponent === "Rock" && player === "Paper" || opponent === "Paper" && player === "Scissors") {
                let text1 = "You win";
                let uScore = your_Score++;
                yourScore.innerHTML = uScore;

                return text1;
            }
        }
    });
});

//Random selection from computer
function computerSelect() {
    const compSelect = Math.floor(Math.random() * 3);

    if (compSelect === 0) {
        opponent = "Rock";
    }
    if (compSelect === 1) {
        opponent = "Paper";
    }
    if (compSelect === 2) {
        opponent = "Scissors";
    }

    //Computer choice
    computer.innerHTML = opponent;

}

//Localstorage input and store username with their score
//Get a username
const nameInput = document.querySelector("#uname");
const leaderBoard = document.querySelector("#leaderboard");
const playBtn = document.querySelector("#submitBtn");
const storedInput = localStorage.getItem("username");
//const leaderboardList = document.getElementById("leaderboard");
const storedScore = JSON.parse(localStorage.getItem("score")) || [];

if (nameInput) {
    leaderBoard.textContent = storedInput;
}

//Add username to the leaderboard
nameInput.addEventListener('input', txt => {
    leaderBoard.textContent = txt.target.value;
});

//Save username into the leaderboard
const saveToLocalStorage = () => {
    localStorage.setItem('username', leaderBoard.textContent);
    localStorage.setItem('score', JSON.stringify(storedScore));
};

//Save to the localstorage
playBtn.addEventListener('click', saveToLocalStorage);

//Save score and name in localstorage
saveScore = () => {
    const score = {
        score: Math.floor(Math.random() *100),
        uname: nameInput.value
    };

    storedScore.push(score);
    
    storedScore.sort((a, b) => b.score - a.score);

    storedScore.splice(5);
}

leaderBoard.innerHTML = storedScore.map(score => {
    return `<li>${score.uname} - ${score.score}</li>`;
}).join("");