export default class PlayingStack {
  constructor(stackNum) {
    this.stackNum = stackNum;
    this.stack = [];
  }

  display() {
    for (let i = 0; i < this.stack.length; i++) {
      let isOnTop = false;
      // if card on top is flipped over, make it visible
      if (i === this.stack.length - 1) {
        isOnTop = true;
        if (!this.stack[i].visible) this.stack[i].makeVisible();
      }

      // draw the card as long as it isnt within the selected cards
      if (
        !selectedCard ||
        selectedCard.findIndex((c) => c === this.stack[i]) !== i
      )
        this.stack[i].display(isOnTop);
    }
  }

  addCard(card) {
    this.stack.push(card);
    this.setCardPositions();
  }

  removeCard(card) {
    let index = this.stack.findIndex((c) => c === card);
    return this.stack.splice(index, this.stack.length - index);
  }

  // sees if the top card can be placed on top
  compareCards(card) {
    // if no cards in stack, only allow placing if it's a kind
    if (this.stack.length === 0) return (card.card === 12);

    // only allow placement of card if opposite suits
    return (
      card.suit % 2 !== this.stack[this.stack.length - 1].suit % 2 &&
      card.card === this.stack[this.stack.length - 1].card - 1
    );
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
