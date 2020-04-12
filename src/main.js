var menuButton = document.querySelector(".menu-button");
var filterStarredArea = document.querySelector(".filter-starred-area");
var ideaCardSection = document.querySelector(".idea-card-section");
var inputForm = document.querySelector("form");
var menuOpenIcon = document.querySelector("#menu-open-icon");
var saveCardButton = document.querySelector(".save-card-button");
var inputTitle = document.querySelector("#idea-title-text");
var inputBody = document.querySelector("#idea-body-text");
var ideaCardSection = document.querySelector(".idea-card-section");

var savedCards = [];

menuButton.addEventListener("click", toggleDropDownMenu);
saveCardButton.addEventListener("click", savedIdeaCard);
inputTitle.addEventListener("keyup", enableSaveButton);
inputBody.addEventListener("keyup", enableSaveButton);

function toggleDropDownMenu() {
  filterStarredArea.classList.toggle("show-dropdown");
  ideaCardSection.classList.toggle("opacity");
  inputForm.classList.toggle("opacity");
  if (filterStarredArea.classList.contains("show-dropdown")) {
    menuOpenIcon.src = "assets/menu-close.svg";
  } else {
    menuOpenIcon.src = "assets/menu.svg";
  }
}

function enableSaveButton() {
  if (inputTitle.value && inputBody.value) {
  saveCardButton.disabled = false;
  } else {
  saveCardButton.disabled = true;
  }
}

function makeNewCard() {
  var newCard = new Idea(inputTitle.value, inputBody.value);
  for (var i = 0; i < savedCards.length; i++) {
    var card = savedCards[i];
    if (card.title === newCard.title && card.body === newCard.body) {
      alert("This idea already exists dumb ass!");
      return
    }
  }
  savedCards.push(newCard)
}

function clearText() {
  inputTitle.value = "";
  inputBody.value = "";
  saveCardButton.disabled = true;
}

function savedIdeaCard(event) {
  event.preventDefault();
  makeNewCard();
  clearText()
  addToCardSection();
}

function addToCardSection () {
  ideaCardSection.innerHTML = "";
  for (var i = 0; i < savedCards.length; i++) {
  var cardTemplate = `<section class="idea-card-individual" ${savedCards[i].id}>
      <header class="card-top">
        <img class="red-star" src="assets/star-active.svg" alt="active-star">
        <img class="white-x" src="assets/delete.svg" alt="delete">
      </header>
      <h3 class="idea-header-text">${savedCards[i].title}</h3>
      <p class="idea-card-text">${savedCards[i].body}</P>
      <footer class= "card-bottom">
        <img class="comment-icon" src="assets/comment.svg" alt="comment">
        <p class="comment-text"> Comment </p>
      </footer>
    </section>`;
   ideaCardSection.insertAdjacentHTML("afterbegin", cardTemplate);
  }
}
