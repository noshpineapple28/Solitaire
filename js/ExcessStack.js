export default class ExcessStack {
  constructor(cards) {
    this.unrevealed = cards;
    this.revealed = [];

    this.x = p.width * 0.1;
    this.y = p.height * 0.1;

    // draws position of unrevealed cards
    for (let i = 0; i < this.unrevealed.length; i++) {
      let card = this.unrevealed[i];
      card.visible = false;
      // top three cards show the height of the stack
      if (i >= this.unrevealed.length - 3) {
        card.setPosition(
          this.x + (this.unrevealed.length - 1 - i) * 2,
          this.y + (this.unrevealed.length - 1 - i) * 2,
          this
        );
        continue;
      }
      card.setPosition(this.x, this.y, this);
    }
  }

  display() {
    for (let card of this.unrevealed) {
      card.display(false);
    }
    for (let card of this.revealed) {
      let isOnTop = false;
      if (card === this.revealed[this.revealed.length - 1]) isOnTop = true;

      card.display(isOnTop);
    }
  }

  drawCard() {
    let pulledCards = this.unrevealed.splice(0, 3);
    if (pulledCards.length === 0) {
      this.unrevealed = this.revealed;
      this.revealed = [];
    } else {
      this.revealed.push(...pulledCards);
    }

    // set card visibility
    for (let card of this.revealed) {
      card.visible = true;
      card.setPosition(this.x, this.y + 4 * (p.height * 0.075), this);
    }
    // draws position of unrevealed cards
    for (let i = 0; i < this.unrevealed.length; i++) {
      let card = this.unrevealed[i];
      card.visible = false;
      // top three cards show the height of the stack
      if (i >= this.unrevealed.length - 3) {
        card.setPosition(
          this.x + (this.unrevealed.length - 1 - i) * 2,
          this.y + (this.unrevealed.length - 1 - i) * 2,
          this
        );
        continue;
      }
      card.setPosition(this.x, this.y, this);
    }
    for (let i = 0; i < 3 && i < this.revealed.length; i++) {
      this.revealed[this.revealed.length - 3 + i].visible = true;
      this.revealed[this.revealed.length - 3 + i].setPosition(
        this.x,
        this.y + (i + 4) * (p.height * 0.075),
        this
      );
    }
  }

  resetUnrevealed() {
    this.unrevealed = this.revealed.splice(0, this.revealed.length);
    // draws position of unrevealed cards
    for (let i = 0; i < this.unrevealed.length; i++) {
      let card = this.unrevealed[i];
      card.visible = false;
      // top three cards show the height of the stack
      if (i >= this.unrevealed.length - 3) {
        card.setPosition(
          this.x + (this.unrevealed.length - 1 - i) * 2,
          this.y + (this.unrevealed.length - 1 - i) * 2,
          this
        );
        continue;
      }
      card.setPosition(this.x, this.y, this);
    }
  }

  removeCard() {
    let index = this.revealed.length - 1;
    return this.revealed.splice(index, this.revealed.length - index);
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
    let index = this.revealed.findIndex((c) => c === card);
    if (index >= 0) return this.revealed.slice(index, this.revealed.length);
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
      // return (
      //   p.mouseX > (this.stackNum + 2) * (p.width * 0.1) &&
      //   p.mouseX < (this.stackNum + 2) * (p.width * 0.1) + p.width * 0.075 &&
      //   p.mouseY > 4 * (p.height * 0.05) &&
      //   p.mouseY < 4 * (p.height * 0.05) + p.width * 0.1
      // );
    }

    return false;
  }

  mouseClicked() {
    if (this.revealed.length !== 0)
      this.revealed[this.revealed.length - 1].mouseClicked(true);

    if (
      this.unrevealed.length === 0 &&
      p.mouseX > this.x &&
      p.mouseX < this.x + p.width * 0.075 &&
      p.mouseY > this.y &&
      p.mouseY < this.y + p.width * 0.1
    ) {
      this.resetUnrevealed();
    } else if (
      this.unrevealed.length &&
      this.unrevealed[this.unrevealed.length - 1].isInside(true)
    ) {
      this.drawCard();
    }
  }

  mouseReleased() {
    // set card visibility
    for (let card of this.revealed) {
      card.visible = true;
      card.setPosition(this.x, this.y + 4 * (p.height * 0.075), this);
    }
    for (let i = 0; i < 3 && i < this.revealed.length; i++) {
      // check for if the deck is too small
      if (this.revealed.length < 3) {
        this.revealed[i].visible = true;
        this.revealed[i].setPosition(
          this.x,
          this.y + (i + 4) * (p.height * 0.075),
          this
        );
        continue;
      }

      this.revealed[this.revealed.length - 3 + i].visible = true;
      this.revealed[this.revealed.length - 3 + i].setPosition(
        this.x,
        this.y + (i + 4) * (p.height * 0.075),
        this
      );
    }
  }
}
