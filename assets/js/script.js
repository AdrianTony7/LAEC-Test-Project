// 1. Get references to our HTML elements
const welcomeScreen = document.getElementById('welcome-screen');
const userNameInput = document.getElementById('userName');
const quizSubjectSelect = document.getElementById('quizSubject');
const startQuizButton = document.getElementById('start-quiz-btn');

const quizContent = document.getElementById('quiz-content');
const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

const resultsScreen = document.getElementById('results-screen');
const finalScoreElement = document.getElementById('final-score');
const highScoresList = document.getElementById('high-scores-list');
const restartQuizButton = document.getElementById('restart-quiz-btn');

let currentUserName = ''; // Stores the user's name
let selectedQuizSubject = ''; // Stores the chosen quiz subject
let shuffledQuestions = []; // Array to hold questions for the current quiz
let currentQuestionIndex = 0; // Tracks which question we're on
let score = 0; // Tracks the user's score
const QUESTION_LIMIT = 10; // You can change this number for different quiz lengths

// 2. Define our Quiz Questions (Array of Objects)
// This is where we'll store all our quiz data.
// Each element in the 'questions' array is an OBJECT.
// Each object has properties like 'question', 'subject', and 'answers'.
// The 'answers' property is itself an ARRAY of objects.
// Each answer object has 'text' and 'correct' (boolean) properties.

const allQuestions = [
    // HTML Questions
    {
        question: "What does HTML stand for?",
        subject: "html",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "High-level Text Management Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which tag is used to create a hyperlink?",
        subject: "html",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        subject: "html",
        answers: [
            { text: "<lb>", correct: false },
            { text: "<break>", correct: false },
            { text: "<br>", correct: true },
            { text: "<newline>", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        subject: "html",
        answers: [
            { text: "<bottom>", correct: false },
            { text: "<footer>", correct: true },
            { text: "<end>", correct: false },
            { text: "<section footer>", correct: false }
        ]
    },
    {
        question: "Which HTML element is used for the largest heading?",
        subject: "html",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<head>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<heading>", correct: false }
        ]
    },
    {
        question: "What is the correct HTML for adding a background color?",
        subject: "html",
        answers: [
            { text: "<body bg='yellow'>", correct: false },
            { text: "<background>yellow</background>", correct: false },
            { text: "<body style='background-color:yellow;'>", correct: true },
            { text: "<body color='yellow'>", correct: false }
        ]
    },
    {
        question: "Choose the correct HTML element to define important text",
        subject: "html",
        answers: [
            { text: "<i>", correct: false },
            { text: "<b>", correct: false },
            { text: "<strong>", correct: true },
            { text: "<important>", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to display a scalar measurement within a known range?",
        subject: "html",
        answers: [
            { text: "<range>", correct: false },
            { text: "<meter>", correct: true },
            { text: "<gauge>", correct: false },
            { text: "<measure>", correct: false }
        ]
    },
    {
        question: "Which input type defines a slider control?",
        subject: "html",
        answers: [
            { text: "range", correct: true },
            { text: "slider", correct: false },
            { text: "controls", correct: false },
            { text: "track", correct: false }
        ]
    },
    {
        question: "What is the purpose of the <head> element in HTML?",
        subject: "html",
        answers: [
            { text: "To contain the main content of the document", correct: false },
            { text: "To define the document's body", correct: false },
            { text: "To contain meta-information about the document, like title and links to stylesheets", correct: true },
            { text: "To create a header for the webpage", correct: false }
        ]
    },

    // CSS Questions
    {
        question: "What does CSS stand for?",
        subject: "css",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Suggestions", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        subject: "css",
        answers: [
            { text: "text-style", correct: false },
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "font-style", correct: false }
        ]
    },
    {
        question: "How do you select an element with id 'header' in CSS?",
        subject: "css",
        answers: [
            { text: ".header", correct: false },
            { text: "#header", correct: true },
            { text: "header", correct: false },
            { text: "*header", correct: false }
        ]
    },
    {
        question: "Which property is used to change the background color?",
        subject: "css",
        answers: [
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "background", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the font of an element?",
        subject: "css",
        answers: [
            { text: "font-family", correct: true },
            { text: "font-name", correct: false },
            { text: "font-style", correct: false },
            { text: "typeface", correct: false }
        ]
    },
    {
        question: "How do you make the text bold in CSS?",
        subject: "css",
        answers: [
            { text: "font-weight: bold;", correct: true },
            { text: "text-decoration: bold;", correct: false },
            { text: "font-style: bold;", correct: false },
            { text: "text-weight: bold;", correct: false }
        ]
    },
    {
        question: "Which property is used to set the left margin of an element?",
        subject: "css",
        answers: [
            { text: "padding-left", correct: false },
            { text: "margin-left", correct: true },
            { text: "indent", correct: false },
            { text: "left-margin", correct: false }
        ]
    },
    {
        question: "How do you display a border like this: top: 10px, right: 5px, bottom: 15px, left: 20px?",
        subject: "css",
        answers: [
            { text: "border-width: 10px 20px 15px 5px;", correct: false },
            { text: "border-width: 10px 5px 15px 20px;", correct: true },
            { text: "border-width: 15px 10px 20px 5px;", correct: false },
            { text: "border-width: 5px 10px 15px 20px;", correct: false }
        ]
    },
    {
        question: "Which CSS property is used for controlling the layout of elements using a grid-based system?",
        subject: "css",
        answers: [
            { text: "flexbox", correct: false },
            { text: "position", correct: false },
            { text: "grid", correct: true },
            { text: "layout", correct: false }
        ]
    },
    {
        question: "What is the correct CSS syntax for making all the <p> elements bold?",
        subject: "css",
        answers: [
            { text: "p {text-size:bold;}", correct: false },
            { text: "p {font-weight:bold;}", correct: true },
            { text: "<p style='font-size:bold;'>", correct: false },
            { text: "<p style='text-size:bold;'>", correct: false }
        ]
    },

    // JavaScript Questions
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        subject: "javascript",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        subject: "javascript",
        answers: [
            { text: "var colors = (1:'red', 2:'green')", correct: false },
            { text: "var colors = ['red', 'green', 'blue']", correct: true },
            { text: "var colors = 'red', 'green', 'blue'", correct: false },
            { text: "var colors = <'red'>, <'green'>", correct: false }
        ]
    },
    {
        question: "Which operator is used for strict equality (value and type)?",
        subject: "javascript",
        answers: [
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "=", correct: false },
            { text: "!=", correct: false }
        ]
    },
    {
        question: "How do you write a 'Hello World' message in an alert box?",
        subject: "javascript",
        answers: [
            { text: "msg('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true },
            { text: "msgBox('Hello World');", correct: false }
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        subject: "javascript",
        answers: [
            { text: "The <head> section", correct: false },
            { text: "The <body> section", correct: false },
            { text: "Both the <head> section and the <body> section are correct", correct: true },
            { text: "The <script> section", correct: false }
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        subject: "javascript",
        answers: [
            { text: "<script name='xxx.js'>", correct: false },
            { text: "<script href='xxx.js'>", correct: false },
            { text: "<script src='xxx.js'>", correct: true },
            { text: "<script file='xxx.js'>", correct: false }
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        subject: "javascript",
        answers: [
            { text: "call myFunction()", correct: false },
            { text: "myFunction()", correct: true },
            { text: "call function myFunction()", correct: false },
            { text: "run myFunction()", correct: false }
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        subject: "javascript",
        answers: [
            { text: "if i = 5 then", correct: false },
            { text: "if (i == 5)", correct: true },
            { text: "if i == 5", correct: false },
            { text: "if i = 5", correct: false }
        ]
    },
    {
        question: "How does a WHILE loop start?",
        subject: "javascript",
        answers: [
            { text: "while (i <= 10; i++)", correct: false },
            { text: "while i = 1 to 10", correct: false },
            { text: "while (i <= 10)", correct: true },
            { text: "while (i < 10; ++i)", correct: false }
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        subject: "javascript",
        answers: [
            { text: "onchange", correct: false },
            { text: "onmouseover", correct: false },
            { text: "onclick", correct: true },
            { text: "onmouseclick", correct: false }
        ]
    },

    // Maths Questions
    {
        question: "What is 5 + 7?",
        subject: "maths",
        answers: [
            { text: "10", correct: false },
            { text: "12", correct: true },
            { text: "13", correct: false },
            { text: "11", correct: false }
        ]
    },
    {
        question: "If a triangle has sides of length 3, 4, and 5, what type of triangle is it?",
        subject: "maths",
        answers: [
            { text: "Equilateral", correct: false },
            { text: "Isosceles", correct: false },
            { text: "Right-angled", correct: true },
            { text: "Obtuse", correct: false }
        ]
    },
    {
        question: "What is the square root of 81?",
        subject: "maths",
        answers: [
            { text: "7", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: true },
            { text: "6", correct: false }
        ]
    },
    {
        question: "What is the value of Pi (π) rounded to two decimal places?",
        subject: "maths",
        answers: [
            { text: "3.10", correct: false },
            { text: "3.14", correct: true },
            { text: "3.16", correct: false },
            { text: "3.00", correct: false }
        ]
    },
    {
        question: "How many sides does a hexagon have?",
        subject: "maths",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "8", correct: false }
        ]
    },
    {
        question: "What is 20% of 150?",
        subject: "maths",
        answers: [
            { text: "20", correct: false },
            { text: "30", correct: true },
            { text: "15", correct: false },
            { text: "40", correct: false }
        ]
    },
    {
        question: "What is the perimeter of a square with a side length of 4 cm?",
        subject: "maths",
        answers: [
            { text: "8 cm", correct: false },
            { text: "12 cm", correct: false },
            { text: "16 cm", correct: true },
            { text: "20 cm", correct: false }
        ]
    },
    {
        question: "Which of these is a prime number?",
        subject: "maths",
        answers: [
            { text: "9", correct: false },
            { text: "15", correct: false },
            { text: "17", correct: true },
            { text: "21", correct: false }
        ]
    },
    {
        question: "What is the sum of angles in a straight line?",
        subject: "maths",
        answers: [
            { text: "90 degrees", correct: false },
            { text: "180 degrees", correct: true },
            { text: "270 degrees", correct: false },
            { text: "360 degrees", correct: false }
        ]
    },
    {
        question: "If x + 3 = 10, what is the value of x?",
        subject: "maths",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },

    // English Questions
    {
        question: "Which of the following is a noun?",
        subject: "english",
        answers: [
            { text: "Run", correct: false },
            { text: "Happy", correct: false },
            { text: "Table", correct: true },
            { text: "Quickly", correct: false }
        ]
    },
    {
        question: "What is the plural of 'child'?",
        subject: "english",
        answers: [
            { text: "Childs", correct: false },
            { text: "Children", correct: true },
            { text: "Childes", correct: false },
            { text: "Child's", correct: false }
        ]
    },
    {
        question: "Which of these words is an adjective?",
        subject: "english",
        answers: [
            { text: "Sing", correct: false },
            { text: "Beautiful", correct: true },
            { text: "Jump", correct: false },
            { text: "Softly", correct: false }
        ]
    },
    {
        question: "Complete the sentence: 'She ___ to the store yesterday.'",
        subject: "english",
        answers: [
            { text: "go", correct: false },
            { text: "goes", correct: false },
            { text: "went", correct: true },
            { text: "going", correct: false }
        ]
    },
    {
        question: "What is a synonym for 'happy'?",
        subject: "english",
        answers: [
            { text: "Sad", correct: false },
            { text: "Joyful", correct: true },
            { text: "Angry", correct: false },
            { text: "Tired", correct: false }
        ]
    },
    {
        question: "Which punctuation mark is used to indicate a question?",
        subject: "english",
        answers: [
            { text: ".", correct: false },
            { text: "!", correct: false },
            { text: "?", correct: true },
            { text: ",", correct: false }
        ]
    },
    {
        question: "Identify the verb in the sentence: 'The bird sings beautifully.'",
        subject: "english",
        answers: [
            { text: "Bird", correct: false },
            { text: "Sings", correct: true },
            { text: "Beautifully", correct: false },
            { text: "The", correct: false }
        ]
    },
    {
        question: "What is an antonym for 'cold'?",
        subject: "english",
        answers: [
            { text: "Cool", correct: false },
            { text: "Warm", correct: true },
            { text: "Chilly", correct: false },
            { text: "Freezing", correct: false }
        ]
    },
    {
        question: "Which of the following is a pronoun?",
        subject: "english",
        answers: [
            { text: "Jump", correct: false },
            { text: "He", correct: true },
            { text: "Quick", correct: false },
            { text: "Book", correct: false }
        ]
    },
    {
        question: "What does 'DIY' stand for?",
        subject: "english",
        answers: [
            { text: "Do It Yourself", correct: true },
            { text: "Do It Yearly", correct: false },
            { text: "Daily Important Yarns", correct: false },
            { text: "Directly Involve You", correct: false }
        ]
    },

    // Home Economics Questions
    {
        question: "Which nutrient is primarily responsible for building and repairing tissues?",
        subject: "home economics",
        answers: [
            { text: "Carbohydrates", correct: false },
            { text: "Fats", correct: false },
            { text: "Proteins", correct: true },
            { text: "Vitamins", correct: false }
        ]
    },
    {
        question: "What is the safest way to thaw frozen meat?",
        subject: "home economics",
        answers: [
            { text: "On the kitchen counter", correct: false },
            { text: "In hot water", correct: false },
            { text: "In the refrigerator", correct: true },
            { text: "Under warm running water", correct: false }
        ]
    },
    {
        question: "Which of these is a common method for preserving food?",
        subject: "home economics",
        answers: [
            { text: "Boiling", correct: false },
            { text: "Frying", correct: false },
            { text: "Canning", correct: true },
            { text: "Steaming", correct: false }
        ]
    },
    {
        question: "What is the recommended internal temperature for cooked chicken to be safe to eat?",
        subject: "home economics",
        answers: [
            { text: "145°F (63°C)", correct: false },
            { text: "165°F (74°C)", correct: true },
            { text: "180°F (82°C)", correct: false },
            { text: "190°F (88°C)", correct: false }
        ]
    },
    {
        question: "Which type of fabric is made from sheep's fleece?",
        subject: "home economics",
        answers: [
            { text: "Cotton", correct: false },
            { text: "Silk", correct: false },
            { text: "Wool", correct: true },
            { text: "Linen", correct: false }
        ]
    },
    {
        question: "What is the primary purpose of a budget?",
        subject: "home economics",
        answers: [
            { text: "To spend more money", correct: false },
            { text: "To track income and expenses", correct: true },
            { text: "To avoid saving money", correct: false },
            { text: "To get into debt", correct: false }
        ]
    },
    {
        question: "Which cleaning agent is best for disinfecting surfaces?",
        subject: "home economics",
        answers: [
            { text: "Dish soap", correct: false },
            { text: "Water", correct: false },
            { text: "Bleach", correct: true },
            { text: "Vinegar", correct: false }
        ]
    },
    {
        question: "What is the correct way to store fresh leafy greens to keep them crisp?",
        subject: "home economics",
        answers: [
            { text: "In a sealed plastic bag on the counter", correct: false },
            { text: "Loose in the refrigerator drawer", correct: false },
            { text: "Wrapped in a damp paper towel in a bag in the refrigerator", correct: true },
            { text: "In a bowl of water at room temperature", correct: false }
        ]
    },
    {
        question: "Which cooking method uses dry heat and typically involves an oven?",
        subject: "home economics",
        answers: [
            { text: "Boiling", correct: false },
            { text: "Steaming", correct: false },
            { text: "Baking", correct: true },
            { text: "Frying", correct: false }
        ]
    },
    {
        question: "What is the purpose of a fire extinguisher in the home?",
        subject: "home economics",
        answers: [
            { text: "To start fires safely", correct: false },
            { text: "To put out small fires", correct: true },
            { text: "To cook food quickly", correct: false },
            { text: "To clean kitchen surfaces", correct: false }
        ]
    }
];


// 3. Updated startQuiz function to handle subject selection
function startQuiz() {
    currentUserName = userNameInput.value.trim();
    selectedQuizSubject = quizSubjectSelect.value;

    if (!currentUserName) {
        alert("Please enter your name!");
        return; // Stop the function if no name is entered
    }

    if (!selectedQuizSubject) {
        alert("Please select a quiz subject!");
        return; // Stop the function if no subject is selected
    }

    // Filter questions based on selected subject
    let filteredQuestions;
    if (selectedQuizSubject === 'random') {
        filteredQuestions = [...allQuestions]; // Use all questions for random
    } else {
        filteredQuestions = allQuestions.filter(q => q.subject === selectedQuizSubject);
    }

    // Shuffle the filtered questions (important for random, good for all)
    shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);

    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Hide welcome screen and show quiz content
    welcomeScreen.classList.add('hide');
    quizContent.classList.remove('hide');

    // Display the first question
    showQuestion(); // We'll write this function next!
}

// Event Listeners
startQuizButton.addEventListener('click', startQuiz);
restartQuizButton.addEventListener('click', function() {
    // Reset everything for a new game
    welcomeScreen.classList.remove('hide');
    quizContent.classList.add('hide');
    resultsScreen.classList.add('hide');
    userNameInput.value = ''; // Clear name input
    quizSubjectSelect.value = ''; // Clear subject selection
    currentUserName = '';
    selectedQuizSubject = '';
    shuffledQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    // Potentially clear high score list if you want to regenerate on restart
    highScoresList.innerHTML = '';
});

// Function to display the current question
function showQuestion() {
    // 1. Reset previous state
    resetState();

    // 2. Get the current question from our shuffled list
    let currentQuestion = shuffledQuestions[currentQuestionIndex];

    // 3. Display the question text
    questionTextElement.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    // 4. Create buttons for each answer
    // We use forEach to loop through each answer in the currentQuestion.answers array
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button'); // Create a new <button> element
        button.innerText = answer.text; // Set the button's text to the answer text
        button.classList.add('btn'); // Add the base 'btn' class for styling

        // If the answer is correct, store that information on the button
        if (answer.correct) {
            // Using dataset is a neat way to store custom data on an HTML element
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer); // Add an event listener to each button
        answerButtonsElement.appendChild(button); // Add the button to the answer-buttons container
    });
}

// Function to reset the quiz area for a new question
function resetState() {
    clearStatusClass(document.body); // Clear body status (for correct/wrong background later)
    nextButton.classList.add('hide'); // Hide the 'Next' button initially

    // Remove all existing answer buttons
    // While there is a first child in answerButtonsElement, remove it
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle when an answer button is clicked
function selectAnswer(e) {
    const selectedButton = e.target; // e.target refers to the button that was clicked
    const isCorrect = selectedButton.dataset.correct === "true"; // Check if its dataset.correct is "true"

    if (isCorrect) {
        score++; // Increment score if correct
    }

    // Apply classes for visual feedback (correct/wrong)
    setStatusClass(document.body, isCorrect); // Change background of body
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true"); // Show all correct/wrong answers
    });

    nextButton.classList.remove('hide'); // Show the 'Next' button
}

// Helper function to apply/remove correct/wrong classes
function setStatusClass(element, correct) {
    clearStatusClass(element); // Clear previous status
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Helper function to clear correct/wrong classes
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


// ... (event listeners for startQuizButton and restartQuizButton)
startQuizButton.addEventListener('click', startQuiz);
restartQuizButton.addEventListener('click', function() {
    welcomeScreen.classList.remove('hide');
    quizContent.classList.add('hide');
    resultsScreen.classList.add('hide');
    userNameInput.value = '';
    quizSubjectSelect.value = '';
    currentUserName = '';
    selectedQuizSubject = '';
    shuffledQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    highScoresList.innerHTML = '';
});

// ... (previous code including variable declarations, allQuestions array,
//      startQuiz, showQuestion, resetState, selectAnswer, setStatusClass, clearStatusClass functions)

// Function to move to the next question or end the game
function nextQuestion() {
    currentQuestionIndex++;
    // Check against the QUESTION_LIMIT instead of shuffledQuestions.length
    if (currentQuestionIndex < QUESTION_LIMIT && currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// Function to handle the end of the quiz
function endGame() {
    quizContent.classList.add('hide');
    resultsScreen.classList.remove('hide');

    // Display the final score. Now it's out of QUESTION_LIMIT.
    finalScoreElement.innerText = `Your Score: ${score}/${QUESTION_LIMIT}`;

    // Now we save the high score and display them
    saveHighScore();
    displayHighScores();
}

// Function to save the current score to LocalStorage
function saveHighScore() {
    // Get existing high scores from LocalStorage, or start with an empty array
    // JSON.parse() converts the string from LocalStorage back into a JavaScript array/object
    // || [] provides a default empty array if no data is found (first time running)
    const highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];

    // Create an object for the current score
    const newScore = {
        score: score,
        name: currentUserName,
        subject: selectedQuizSubject,
        date: new Date().toLocaleDateString() // Add current date for context
    };

    // Add the new score to the array
    highScores.push(newScore);

    // Sort scores from highest to lowest. If scores are equal, maybe sort by date (optional).
    // Uses a comparison function with array.sort()
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top 5 scores (or whatever number you prefer)
    // .slice() creates a new array with a portion of the original
    const topScores = highScores.slice(0, 5);

    // Save the updated high scores back to LocalStorage
    // JSON.stringify() converts a JavaScript array/object into a JSON string
    localStorage.setItem('quizHighScores', JSON.stringify(topScores));
}

// Function to display high scores from LocalStorage
function displayHighScores() {
    // Clear any previous list items
    highScoresList.innerHTML = '';

    // Get the saved high scores
    const highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];

    if (highScores.length === 0) {
        highScoresList.innerHTML = '<li>No high scores yet. Play a quiz!</li>';
        return;
    }

    // Loop through each high score and create a list item for it
    highScores.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${index + 1}. ${entry.name} (${entry.subject.toUpperCase()}): ${entry.score}/${QUESTION_LIMIT} on ${entry.date}`;
        highScoresList.appendChild(listItem);
    });
}


// ... (Event Listeners for startQuizButton, nextButton, restartQuizButton)
startQuizButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);

restartQuizButton.addEventListener('click', function() {
    // Reset all state for a new game
    welcomeScreen.classList.remove('hide');
    quizContent.classList.add('hide');
    resultsScreen.classList.add('hide');
    userNameInput.value = '';
    quizSubjectSelect.value = '';
    currentUserName = '';
    selectedQuizSubject = '';
    shuffledQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    highScoresList.innerHTML = ''; // Ensure list is cleared for next display
});

// IMPORTANT: Call displayHighScores() when the page loads so they can see existing scores!
document.addEventListener('DOMContentLoaded', displayHighScores);