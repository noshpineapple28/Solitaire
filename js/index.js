import Card from "./Card.js";
import ExcessStack from "./ExcessStack.js";
import PlayingStack from "./PlayingStack.js";
import "./libs/p5.js";
("use strict");

// card stacks
const STACKS = [
  new PlayingStack(0),
  new PlayingStack(1),
  new PlayingStack(2),
  new PlayingStack(3),
  new PlayingStack(4),
  new PlayingStack(5),
  new PlayingStack(6),
];
// checks if cards are loaded
let loadedCards = false;
// will hold the deck of cards
let excess;
// holds if a card has been selected
window.selectedCard = undefined;

const s = (p) => {
  p.setup = () => {
    // create and set id
    let solitaire = p.createCanvas(800, 400);
    solitaire.id("webSolitaire");

    // modes
    p.noSmooth();

    // generate cards
    const CARDS = [];
    for (let suit = 0; suit < 4; suit++) {
      for (let card = 0; card < 13; card++) {
        CARDS.push(new Card(suit, card));
      }
    }

    for (let stack of STACKS) {
      for (let i = 0; i <= stack.stackNum; i++) {
        // pick random card from deck
        let pickedCard = Math.floor(Math.random() * CARDS.length);
        let card = CARDS.splice(pickedCard, 1)[0];
        // add card to stack
        stack.addCard(card);
      }
    }

    excess = new ExcessStack(CARDS);

    // loads the back of card image
    p.loadImage(`./media/back.png`, setCardBack);
  };

  p.draw = () => {
    p.background("#1c730d");
    if (!loadedCards) {
      loadedCards = checkIfLoaded();
      return;
    }

    for (let stack of STACKS) {
      stack.display();
    }

    // draw excess
    excess.display();

    // always draw the selected card last
    if (selectedCard) {
      for (let i = 0; i < selectedCard.length; i++) {
        selectedCard[i].displaySelectedCard(i);
      }
    };
  };

  p.mousePressed = () => {
    for (let stack of STACKS) {
      stack.mouseClicked();
    }
  };

  p.mouseReleased = () => {
    if (!selectedCard) {
      return;
    }
    for (let stack of STACKS) {
      if (stack.isInside() && stack.compareCards(selectedCard[0])) {
        // stack of cards moved
        let cards = selectedCard[0].stack.removeCard(selectedCard[0]);
        for (let card of cards) {
          card.mouseReleased();
          stack.addCard(card);
        }
        selectedCard = undefined;
        return;
      }
    }

    // stack of cards moved
    for (let card of selectedCard) {
      card.mouseReleased();
    }
    selectedCard = undefined;
  };
};

// sets the back of the card image reference
function setCardBack(img) {
  for (let stack of STACKS) {
    for (let card of stack.stack) {
      card.setCardBack(img);
    }
  }
  for (let card of excess.unrevealed) {
    card.setCardBack(img);
  }
}

// checks if all cards are loaded yet
function checkIfLoaded() {
  for (let stack of STACKS) {
    if (!stack.checkIfLoaded()) return false;
  }
  for (let card of excess.unrevealed) {
    if (!card.loaded) return false;
  }

  return true;
}

// allow p5 access globally
window.p = new p5(s);
