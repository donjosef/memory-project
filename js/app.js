const mainContent = document.querySelector(".container");
const cards = document.querySelectorAll(".card");
const icons = document.querySelectorAll(".deck .fa");
const stars = document.querySelectorAll(".stars li i");
const moves = document.querySelector(".moves");
const theTimer = document.querySelector(".timer");
const grid = document.querySelector(".deck");
let counter = 0;
let openCards = [];
let listOfMatches = [];
let timer = [0, 0, 0];
let timerRunning = false;
let interval;
let congrats;
let statsMessage;


/*
------------------
TIMER SECTION
------------------*/

//Add leading 0
function formatTime(number) {
    if(number < 10) {
        number = "0" + number;
    }
    return number;
}

//Set and display the current timer
function runTimer() {
    let currentTime = formatTime(timer[0]) + ":" + formatTime(timer[1]);
    theTimer.textContent = currentTime;
    timer[2]++;
    timer[0] = Math.floor( (timer[2]/10)/60); //minutes
    timer[1] = Math.floor( (timer[2]/10) - (timer[0] * 60) ); //seconds
}


function start(e) {
    if(e.target.tagName = "LI" && !timerRunning) {
        //run the timer every 100ms only if the timer is not running
        interval = setInterval(runTimer, 100);
        timerRunning = true; //IMPORTANT otherwise the runTimer will start at every click
     }
}


/*
-----------------
MOVES SECTION
----------------*/
//This function is invoked everytime openCards.length = 2 meaning that a player has clicked two cards
function incrementMoves() {
      counter++;
      if(counter == 1) {
          moves.textContent = counter + " Move";
      } else {
          moves.textContent = counter + " Moves";
      }

      if(counter >= 16 && counter <= 23) {
          stars[2].style.color = "#000";
      } else if (counter >= 24) {
          stars[1].style.color = "#000";
      }
  }

/*
-------------------------------
MAIN FUNCTIONALITY SECTION
-----------------------------*/
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
     incrementMoves();
    for(let i = 0; i < openCards.length; i++) {
      openCards[i].classList.add("match");
      listOfMatches.push(openCards[i]);
    }
    //when listOfMatches is full of matched cards, invoke endingGame()
    if(listOfMatches.length == 16) {
      endingGame();
    }
    openCards = [];
  }



//Defining a function to check if two cards are equal
  function checkMatching(card) {
  openCards.push(card);

  if(openCards.length == 2) {
    if(openCards[0].firstElementChild.className !== openCards[1].firstElementChild.className) {
       incrementMoves();
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


/*
--------------------
END OF GAME SECTION
---------------------*/
function endingGame() {
    mainContent.classList.add("hidden");

    clearInterval(interval); //clear interval from running
    congrats = document.createElement("h1");
    congrats.textContent = "Congratulations you won!";
    congrats.classList.add("congrats");
    document.body.appendChild(congrats);
    statsMessage = document.createElement("p");
    statsMessage.textContent = `With ${moves.textContent} in ${ timer[0]} minutes and ${timer[1]} seconds`;
    statsMessage.classList.add("statistics");
    document.body.appendChild(statsMessage);
    const button = document.createElement("button");
    button.textContent = "Play Again";
    button.classList.add("restart");
    document.body.appendChild(button);

     button.addEventListener("click", restart);
}

function restart() {
    mainContent.classList.remove("hidden");
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("match", "show");
    }
    this.remove();
    congrats.remove();
    statsMessage.remove();
    counter = 0;
    moves.textContent = "";
    listOfMatches = []; //clear List of matches
    for(let i = 0; i < stars.length; i++) {
      stars[i].style.color = "#fd0";
    }
    theTimer.textContent = "00:00";
    timer = [0, 0, 0]; //reset the values of minutes and seconds to 0, otherwise in the next play, the timer will not start from 0
    timerRunning = false; //reset the timerRunning condition to false, otherwise the timer will not run anymore
}

/*
----------------------
EVENT LISTENER SECTION
----------------------*/
  cards.forEach(function(card) {
    card.addEventListener("click", function() {
      //Invoke showIcons when users click on each Cards
      showIcons(this);
      checkMatching(this);
    });
  });

//When user click on a card, start the timer
grid.addEventListener("click", start);
