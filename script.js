const myList = [
    {
        tanong: "What is my Favorite Anime? ",
        answer: [
            {text: "One Piece" , correct: false},
            {text: "Baki" , correct: false},
            {text: "My Hero Acadamia" , correct: false}, 
            {text: "Demon Slayer" , correct: true}
        ]
    },
    {
        tanong: "How Old am I? ",
        answer: [
            {text: "18" , correct: false},
            {text: "19" , correct: false},
            {text: "20" , correct: true},
            {text: "21" , correct: false}
        ]
    },
    {
        tanong: "What is my Gender? ",
        answer: [
            {text: "Male", correct: true},
            {text: "Female" , correct: false},
        ]
    },
    {
        tanong: "What's my phone Brand?",
        answer: [
            {text: "RealMe" , correct: true},
            {text: "Apple" , correct: false},
            {text: "Infinix" , correct: false},
            {text: "Samsung" , correct: false}
        ]
    },
    {
        tanong: "How many is my Cat? ",
        answer: [
            {text: "2" , correct: false},
            {text: "4" , correct: true},
            {text: "6" , correct: false},
            {text: "8" , correct: false}
        ]
    },
];
const title = document.getElementById("quizTable");
const answerBtn = document.getElementById("buttons");
const nextBtn = document.getElementById("next");

let questionsIndex = 0;
let score = 0;

function startQuestion(){
    questionsIndex = 0;
    score  = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState()
    let currentQuestion = myList[questionsIndex];
    let questionNo = questionsIndex + 1;
    title.innerHTML = questionNo + ". " + currentQuestion.tanong;   

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState(){
    nextBtn.style.display = 'none';
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";
    if(isCorrect){
        selected.classList.add("correct");
        score++;
    }
    else{
        selected.classList.add("inCorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";    
}

function showScore(){
    resetState();
    title.innerHTML = `You scored ${score} out of ${myList.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    questionsIndex++;
    if(questionsIndex < myList.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextBtn.addEventListener("click", ()=>{
    if(questionsIndex < myList.length){
        handleNextBtn();
    }
    else{
        startQuestion();
    }
})
startQuestion();