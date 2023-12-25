export default class Card {
  constructor(suit, card) {
    this.suit = suit;
    this.card = card;

    this.visible = false;

    this.suitText = ["D", "C", "H", "S"].splice(suit, 1);
    this.cardText = ["a", 2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k"].splice(card, 1);
    this.cardFill = this.findCardColor(suit);
  }

  findCardColor(suit) {
    if (suit % 2 === 0) {
      return p.color(250, 3, 3);
    }

    return p.color(0);
  }

  display(x, y) {
    p.fill(this.cardFill);
    if (this.visible) {
      p.text(`${this.suitText}${this.cardText}`, x, y);
      return;
    }

    p.text("~~", x, y);
  }

  makeVisible() {
    this.visible = true;
  }
}
