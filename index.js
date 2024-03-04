var questionsArr = [
    {
      question: '
      How many bones are in the human body?',
      answer: '206',
      options: [
        '355',
        '200',
        '206',
        '500',
      ]
    },
    {
        question: 'What Galaxy do we live in?',
        answer: 'The Milky Way',
        options: [
          'Samsung Galaxy',
          'Comet Galaxy',
          'The Milky Way',
          'Andromeda',
        ]
      },
    {
        question: 'What is the largest Ocean on Earth?',
        answer: 'The Pacific Ocean',
        options: [
          'The Atlantic Ocean',
          'The Arctic Ocean ',
          'The Indian Ocean',
          'The Pacific Ocean',
        ]
      },
    {
        question: 'In what year did World War II end?',
        answer: '1945',
        options: [
          '1945',
          '1929',
          '1942',
          '1917',
        ]
      },
    {
        question: 'What is the deepest part of the ocean ?',
        answer: 'The Mariana Trench',
        options: [
          'South Sandwich Trench',
          'The Mariana Trench',
          'Mollay Hole',
          'Indian Ocean Trench',
        ]
      },
]

  var quizEl = document.getElementById('quiz')

  // Create elements
  var btn = document.createElement('button')
  var questionP = document.createElement('p')
  var answerDiv = document.createElement('div')
  // var answerBtn = document.createElement('button')
  var timerP = document.createElement('p')
  var scoreEl = document.createElement('p')

   // Keep track of these
  var currentQues = 0
  var correctAns = 0
  var ques = 0
  // Timer
  var CountTimer
  var timeLeft = 30
  // Score

// Add ids
  btn.setAttribute("id", "start-quiz")



  // Text Content
  btn.textContent = "Start Quiz"



function setupQuiz() {

  quizEl.innerHTML = ""

  // Append elements
  quizEl.appendChild(btn)

  // Load previous score if there is one
  var score = localStorage.getItem('previous-score')
  if (score) {
    scoreEl.textContent = "Previous Score: " + score
    quizEl.appendChild(scoreEl)
  }

}

btn.onclick = function() {
  startQuiz()

}

function startQuiz() {
  // Append elements
  quizEl.innerHTML = ""


  quizEl.appendChild(questionP)
  quizEl.appendChild(answerDiv)
  quizEl.appendChild(timerP)

  var currentQuesEl = questionsArr[currentQues]
  questionP.textContent = currentQuesEl.question

  answerDiv.innerHTML = ""

  for (var i = 0; i < currentQuesEl.options.length; i++) {
    var answerBtn = document.createElement("button")
    answerBtn.textContent = currentQuesEl.options[i]
    answerBtn.addEventListener('click', checkAns)
    answerDiv.appendChild(answerBtn)
  }
  timerCount()
}

function checkAns(e) {
  var selectedChoice = e.target.textContent
  var currentQuesEl = questionsArr[currentQues]
  if (selectedChoice === currentQuesEl.answer) {
    correctAns++
  } 

  currentQues++
  clearInterval(CountTimer)
  if (currentQues < questionsArr.length) {
    startQuiz()
  } else {
    displayResults()
  }
}





  function displayResults() {
    quizEl.innerHTML = ""
    var score = Math.round(correctAns / questionsArr.length * 100) + "%"
    scoreEl.textContent = "Score: " + score
    quizEl.appendChild(scoreEl)
    // Local storage holds score
    localStorage.setItem('previous-score', score)
    //Reset variables 
    currentQues = 0
    correctAns = 0

    quizEl.appendChild(btn)
  }



  function timerCount() {
    timeLeft = 30
    timerP.textContent = timeLeft
    CountTimer = setInterval(function() {
      timeLeft--
      if (timeLeft >= 0) {
        timerP.textContent = timeLeft;
      } else {
        clearInterval(CountTimer)
        currentQues++
        if (currentQues < questionsArr.length) {
          startQuiz()
        } else {
          displayResults()
        }
      }


    }, 1000)   

  }

  setupQuiz()