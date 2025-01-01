const questions = [
    {
        Question: "Which is the largest animal in the world?",
        answers: [
            {
                text: "Shark", correct: false
            },
            {
                text: "Elephant", correct: false
            },
            {
                text: "Blue Whale", correct: true
            },
            {
                text: "Giraffe", correct: false
            }
        ]
    },
    {
        Question: "Which is the smallest country in the world?",
        answers: [
            {
                text: "Vatican City", correct: true
            },
            {
                text: "Bhutan", correct: false
            },
            {
                text: "Nepal", correct: false
            },
            {
                text: "Shri Lanka", correct: false
            }
        ]
    },
    {
        Question: "Which is the largest desert in the world?",
        answers: [
            {
                text: "Gobi", correct: false
            },
            {
                text: "Kalahari", correct: false
            },
            {
                text: "Sahara", correct: true
            },
            {
                text: "Antartica", correct: false
            }
        ]
    },
    {
        Question: "Which is the smallest continent in the world?",
        answers: [
            {
                text: "Asia", correct: false
            },
            {
                text: "Australia", correct: true
            },
            {
                text: "Arctic", correct: false
            },
            {
                text: "Africa", correct: false
            }
        ]
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questioNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questioNo + ". " + currentQuestion.Question;

    currentQuestion.answers.forEach(answer => {
        const buttton = document.createElement("button");
        buttton.innerHTML = answer.text;
        buttton.classList.add("btn");
        answerButtons.appendChild(buttton);
        if (answer.correct) {
            buttton.dataset.correct = answer.correct;
        }
        buttton.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(buttton => {
        if (buttton.dataset.correct === "true") {
            buttton.classList.add("correct");
        }
        buttton.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();