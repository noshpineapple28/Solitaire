import Card from "./Card.js";
import PlayingStack from "./PlayingStack.js";
import "./libs/p5.js";
("use strict");

const STACKS = [
  new PlayingStack(0),
  new PlayingStack(1),
  new PlayingStack(2),
  new PlayingStack(3),
  new PlayingStack(4),
  new PlayingStack(5),
  new PlayingStack(6),
];
// will hold the deck of cards
const CARDS = []

const s = (p) => {
  p.setup = () => {
    // create and set id
    let solitaire = p.createCanvas(800, 400);
    solitaire.id("webSolitaire");

    // generate cards
    for (let suit = 0; suit < 4; suit++) {
      for (let card = 0; card < 13; card++) {
        CARDS.push(new Card(suit, card));
      }
    }

    for (let stack of STACKS) {
      for (let i = 0; i <= stack.stackNum; i++) {
        let pickedCard = Math.floor(Math.round() * 52);
        let card = CARDS.splice(pickedCard, 1)[0];
        stack.addCard(card);
      }
    }

    console.log(CARDS);
  };

  p.draw = () => {
    p.background("#1c730d");
    for (let stack of STACKS) {
      stack.display();
    }
  };
};

// allow p5 access globally
window.p = new p5(s);
