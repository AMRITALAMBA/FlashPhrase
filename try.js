const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const rearrangeButton = document.getElementById("rearrange-button");
const rearrangeByTimeButton = document.getElementById("rearrange-by-time-button");
let editBool = false;

// Load flashcards from local storage when the page loads
window.addEventListener("load", () => {
  loadFlashcards();
});

// Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

// Hide Create flashcard Card
closeBtn.addEventListener(
  "click",
  (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

// Submit Question
cardButton.addEventListener("click", () => {
  editBool = false;
  tempQuestion = question.value.trim();
  tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    container.classList.remove("hide");
    errorMessage.classList.add("hide");
    saveFlashcard(tempQuestion, tempAnswer);
    viewlist(tempQuestion, tempAnswer);
    question.value = "";
    answer.value = "";
  }
});

// Card Generate
function viewlist(questionValue, answerValue) {
  var listCard = document.getElementsByClassName("card-list-container");
  var div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("draggable", "true");

  // Set data-time attribute to the current timestamp
  div.setAttribute("data-time", Date.now());

  var rearrangeIcon = document.createElement("i");
  rearrangeIcon.classList.add("fas", "fa-bars", "rearrange-icon");
  rearrangeIcon.style.display = "none";
  rearrangeIcon.addEventListener("dragstart", (event) => {
    draggedCard = event.target.parentElement;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", draggedCard.innerHTML);
  });

  div.innerHTML += `<p class="question-div">${questionValue}</p>`;
  var displayAnswer = document.createElement("p");
  displayAnswer.classList.add("answer-div", "hide");
  displayAnswer.innerText = answerValue;

  var link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = "Show/Hide";
  link.addEventListener("click", () => {
    displayAnswer.classList.toggle("hide");
  });

  div.appendChild(rearrangeIcon);
  div.appendChild(link);
  div.appendChild(displayAnswer);

  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
    removeFlashcardFromStorage(div.querySelector(".question-div").innerText);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard[0].appendChild(div);
  hideQuestion();

  div.addEventListener("dragstart", (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", draggedCard.innerHTML);
    event.target.style.opacity = "0.5";
  });

  div.addEventListener("dragend", () => {
    draggedCard = null;
    event.target.style.opacity = "1";
  });
}

// Modify Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    let parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
};

// Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

// Save flashcard to local storage
function saveFlashcard(question, answer) {
  let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
  flashcards.push({ question, answer });
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Load flashcards from local storage
function loadFlashcards() {
  let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
  flashcards.forEach((flashcard) => {
    viewlist(flashcard.question, flashcard.answer);
  });
}

// Remove flashcard from local storage
function removeFlashcardFromStorage(questionText) {
  let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
  flashcards = flashcards.filter((flashcard) => flashcard.question !== questionText);
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Initialize drag and drop functionality
const cardListContainer = document.querySelector(".card-list-container");
let draggedCard = null;

cardListContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});

cardListContainer.addEventListener("dragenter", (event) => {
  event.preventDefault();
  const targetCard = event.target.closest(".card");
  if (targetCard && targetCard !== draggedCard) {
    targetCard.classList.add("drag-over");
  }
});

cardListContainer.addEventListener("dragleave", (event) => {
  event.preventDefault();
  const targetCard = event.target.closest(".card");
  if (targetCard && targetCard !== draggedCard) {
    targetCard.classList.remove("drag-over");
  }
});

cardListContainer.addEventListener("drop", (event) => {
  event.preventDefault();
  const targetCard = event.target.closest(".card");
  if (targetCard && targetCard !== draggedCard) {
    const list = cardListContainer.children;
    const indexDragged = Array.from(list).indexOf(draggedCard);
    const indexTarget = Array.from(list).indexOf(targetCard);
    if (indexDragged < indexTarget) {
      cardListContainer.insertBefore(draggedCard, targetCard.nextSibling);
    } else {
      cardListContainer.insertBefore(draggedCard, targetCard);
    }
    draggedCard.classList.remove("drag-over");
    saveFlashcardsOrder();
  }
});

// Rearrange cards alphabetically when the rearrange button is clicked
rearrangeButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  const sortedCards = Array.from(cards).sort((a, b) => {
    const questionA = a.querySelector(".question-div").innerText.toLowerCase();
    const questionB = b.querySelector(".question-div").innerText.toLowerCase();
    if (questionA < questionB) return -1;
    if (questionA > questionB) return 1;
    return 0;
  });
  cardListContainer.innerHTML = '';
  sortedCards.forEach((card) => {
    cardListContainer.appendChild(card);
  });
});

// Rearrange cards by time when the rearrange by time button is clicked
rearrangeByTimeButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  const sortedCards = Array.from(cards).sort((a, b) => {
    const timeA = parseInt(a.getAttribute("data-time"));
    const timeB = parseInt(b.getAttribute("data-time"));
    return timeB - timeA; // Sort by descending order of time (recent cards first)
  });
  cardListContainer.innerHTML = '';
  sortedCards.forEach((card) => {
    cardListContainer.appendChild(card);
  });
});


