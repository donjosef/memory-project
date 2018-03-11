const cards = document.querySelectorAll(".card");
const icons = document.querySelectorAll(".deck .fa");
let openCards = [];


function shuffle() {
  let random = Math.floor(Math.random() * cards.length);
  for(let i = 0; i < cards.length; i++) {
    cards[i].appendChild(icons[random]);
    random++;
    if(random === cards.length) {
        random = 0;
    }
  }
}
  shuffle();


//Defining function in order to show the cards
  function showIcons(card) {
    card.classList.add("show");
  }

//Defining a function to hide the cards when they dont match
  function hideIcons() {
    for(let i = 0; i < openCards.length; i++) {
      openCards[i].classList.remove("show");
      openCards[i].classList.remove("dontMatch");
    }
      openCards = [];
  }

//Defining a function to keep showing the cards if they match
  function match() {
    for(let i = 0; i < openCards.length; i++) {
      openCards[i].classList.add("match");
    }
    openCards = [];
  }

//Defining a function to check if two cards are equal
  function checkMatching(card) {
  openCards.push(card);

  if(openCards.length == 2) {
    if(openCards[0].firstElementChild.className !== openCards[1].firstElementChild.className) {
      for(let i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("dontMatch");
      }
      //call hideIcons if they dont match
      setTimeout(hideIcons, 900);
    } else {
      //If the cards have the same class BUT different id, call match()
       if(openCards[0].id !== openCards[1].id) {
           match();
       //else, if they have the same id, meaning they are the same card, shift one element. In this way, if user click on the same card, the match class is not added
       } else {
           openCards.shift();
         }
       }
  }
}
  cards.forEach(function(card) {
    card.addEventListener("click", function() {
      //Invoke showIcons when users click on each Cards
      showIcons(this);
      checkMatching(this);
    });
  });



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
