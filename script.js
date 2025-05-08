const ply_game = document.querySelector(".ply-btn");
const about_game = document.querySelector(".about-btn");
const back_btn = document.querySelector(".back-btn");
const backgame_btn = document.querySelector(".backgame-btn");
const main_container = document.querySelector(".main-container");
const first_container = document.querySelector(".first-container");
const about_inf = document.querySelector(".about-inf");
const pause_music = document.querySelector(".pause-btn");
const go_btn = document.querySelector(".go-btn");
const load_img = document.querySelector(".load-img");
const rupee_container = document.querySelector(".rupee-container");
const rupee_msg = document.querySelector(".rupee-msg p");

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Zebra", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: "Who was our first Prime Minister?",
        answers: [
            {text: "Shahbaz Shareef", correct: false},
            {text: "Benazeer Bhutto", correct: false},
            {text: "Liaquat Ali Khan", correct: true},
            {text: "Parwaiz Musharraf", correct: false},
        ]
    },
    {
        question: "What is the name of the Indian currency?",
        answers: [
            {text: "Rupee", correct: true},
            {text: "Dollar", correct: false},
            {text: "Riyal", correct: false},
            {text: "Takka", correct: false},
        ]
    },
    {
        question: "Which word can mean both a sport and an insect?",
        answers: [
            {text: "Ant", correct: false},
            {text: "Gnat", correct: false},
            {text: "Hockey", correct: false},
            {text: "Cricket", correct: true},
        ]
    },
    {
        question: "What is the name of the Bangladesh currency?",
        answers: [
            {text: "Rupee", correct: false},
            {text: "Dollar", correct: false},
            {text: "Riyal", correct: false},
            {text: "Takka", correct: true},
        ]
    }
];

const questionElement = document.querySelector(".question h1");
const btn_option = document.querySelector(".btn-option");
const next = document.querySelector("#next");

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffle(questions);
    currentQuestionIndex = 0;
    score = 0;
    next.textContent = "Next";
    let timeLeft = 15;

    // Select the timer display element
    const timerDisplay = document.querySelector('.timer');

    // Function to update the countdown
    const countdown = setInterval(() => {
        // Update the display
        timerDisplay.textContent = timeLeft;

        // Decrease the time left
        timeLeft--;

        // Stop the countdown at 0
        if (timeLeft < 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "Time's up!";
            next.style.display = "block";
            rupee_msg.textContent = "Sorry, Times Up. Better luck next time!";
        next.textContent = "Restart";
        next.addEventListener("click", startQuiz);
            setTimeout(() => {
                rupee_container.classList.remove("hide4");
                main_container.classList.add("hide3");
            }, 1500);
        }
    }, 1000); // 1000 ms = 1 second
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("option");
        btn_option.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    next.style.display = "none";
    while (btn_option.firstChild) {
        btn_option.removeChild(btn_option.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.style.backgroundColor = "green";
        selectedBtn.style.color = "white";
        correctmusic();
        score++;
        rupee_msg.textContent = `Congratulations, You Won ${score * 1000} Rupees!`;
    } else {
        selectedBtn.style.backgroundColor = "red";
        selectedBtn.style.color = "white";
        wrongmusic();
        rupee_msg.textContent = "Sorry, that's incorrect. Better luck next time!";
        next.textContent = "Restart";
        next.addEventListener("click", startQuiz);
    }

    Array.from(btn_option.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        }
    });
    next.style.display = "block";
    setTimeout(() => {
        rupee_container.classList.remove("hide4");
        main_container.classList.add("hide3");
    }, 3000);
}
next.addEventListener("click", () => {
    rupee_container.classList.add("hide4");
    main_container.classList.remove("hide3");
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        next.textContent = "Restart";
        next.addEventListener("click", startQuiz);
    }
});

function startLoading() {
    let loadingBar = document.getElementById('loading-bar');
    loadingBar.style.animation = 'none';
    void loadingBar.offsetWidth;
    loadingBar.style.animation = 'load 5s linear forwards';
}

load_img.classList.remove("hide");

go_btn.addEventListener("click", () => {
    load_img.classList.add("hide");
    first_container.classList.remove("hide1");
    music();
});

about_game.addEventListener("click", () => {
    about_inf.classList.remove("hide2");
    first_container.classList.add("hide1");
});

back_btn.addEventListener("click", () => {
    first_container.classList.remove("hide1");
    about_inf.classList.add("hide2");
});

backgame_btn.addEventListener("click", () => {
    main_container.classList.add('hide3');
    first_container.classList.remove("hide1");
});

function music() {
    let audio = new Audio("img/intro.mpeg");
    audio.play();
    audio.loop = true;
    ply_game.addEventListener("click", () => {
        main_container.classList.remove('hide3');
        first_container.classList.add("hide1");
        audio.pause();
        startQuiz();
        timemusic();
    });
    pause_music.addEventListener("click", () => {
        if (pause_music.textContent === '🔊') {
            pause_music.textContent = '🔇';
            audio.pause();
        } else {
            pause_music.textContent = '🔊';
            audio.play();
        }
    });
}
function timemusic() {
    let tmusic = new Audio("img/timer.mpeg");
    tmusic.play();
    tmusic.loop = true;
    
backgame_btn.addEventListener("click", () => {
    main_container.classList.add('hide3');
    first_container.classList.remove("hide1");
    tmusic.pause();
    music();
});

}
function correctmusic() {
    let cmusic = new Audio("img/correct.mp3");
    cmusic.play();
}
function wrongmusic() {
    let wmusic = new Audio("img/wrong.mp3");
    wmusic.play();
}