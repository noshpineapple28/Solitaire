export default class ExcessStack {
  constructor(cards) {
    this.unrevealed = cards;
    this.revealed = [];

    this.x = p.width * 0.1;
    this.y = p.height * 0.1;

    this.drawCard();
  }

  display() {
    for (let card of this.unrevealed) {
      card.display(false);
    }
    for (let card of this.revealed) {
      card.display(false);
    }
  }

  drawCard() {
    let pulledCards = this.unrevealed.splice(0, 3);
    if (pulledCards.length === 0) {
      this.unrevealed = this.revealed;
      this.revealed = [];
    } else {
      this.revealed.unshift(...pulledCards);
    }

    // set card visibility
    for (let card of this.revealed) {
      card.visible = false;
      card.setPosition(this.x, this.y + 4 * (p.height * 0.05), this);
    }
    for (let card of this.unrevealed) {
      card.visible = false;
      card.setPosition(this.x, this.y, this);
    }
    for (let i = 0; i < 3 && i < this.revealed.length; i++) {
      this.revealed[i].visible = true;
      this.revealed[i].setPosition(
        this.x,
        this.y + (i + 4) * (p.height * 0.05),
        this
      );
    }
  }

  push(card) {
    this.unrevealed.push(card);
  }

  // sees if the top card can be placed on top
  compareCards(card) {
    // if no cards in stack, only allow placing if it's a kind
    if (this.stack.length === 0) return card.card === 12;

    // only allow placement of card if opposite suits
    return (
      card.suit % 2 !== this.stack[this.stack.length - 1].suit % 2 &&
      card.card === this.stack[this.stack.length - 1].card - 1
    );
  }

  splice(index, delCount) {
    return this.stack.splice(index, delCount);
  }

  slice(card) {
    let index = this.stack.findIndex((c) => c === card);
    if (index >= 0) return this.stack.slice(index, this.stack.length);
  }

  // checks if cards are loaded, if they are, set their positions
  checkIfLoaded() {
    for (let card of this.stack) {
      if (!card.loaded) return false;
    }

    // set the position of each card in stack
    this.setCardPositions();

    return true;
  }

  setCardPositions() {
    // set the position of each card in stack
    for (let i = 0; i < this.stack.length; i++) {
      // console.log(this.stack, i)
      this.stack[i].setPosition(
        (this.stackNum + 2) * (p.width * 0.1),
        (i + 4) * (p.height * 0.05),
        this
      );
    }
  }

  setCardBack(img) {
    for (let card of this.stack) {
      card.setCardBack(img);
    }
  }

  isInside() {
    if (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1].isInside(true)
    ) {
      return true;
    } else if (this.stack.length === 0) {
      return (
        p.mouseX > (this.stackNum + 2) * (p.width * 0.1) &&
        p.mouseX < (this.stackNum + 2) * (p.width * 0.1) + p.width * 0.075 &&
        p.mouseY > 4 * (p.height * 0.05) &&
        p.mouseY < 4 * (p.height * 0.05) + p.width * 0.1
      );
    }

    return false;
  }

  mouseClicked() {
    for (let i = 0; i < this.stack.length; i++) {
      let isOnTop = false;

      if (i === this.stack.length - 1) {
        isOnTop = true;
      }

      this.stack[i].mouseClicked(isOnTop);
    }
  }

  mouseReleased() {
    if (this.stack.length > 0) {
      this.stack[this.stack.length - 1].mouseReleased();
    }
  }
}
