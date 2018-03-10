const cards = document.querySelectorAll(".card");
const icons = document.querySelectorAll(".deck .fa");


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

  cards.forEach(function(card) {
    card.addEventListener("click", function() {
      //Invoke showIcons when users click on each Cards
      showIcons(this);
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
