export default class PlayingStack {
  constructor(stackNum) {
    this.stackNum = stackNum;
    this.stack = [];
  }

  display() {
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].display(
        (this.stackNum + 2) * (p.width * 0.1),
        (i + 4) * (p.height * 0.05)
      );

      // if card on top is flipped over, make it visible
      if (i === this.stack.length - 1 && !this.stack[i].visible) {
        this.stack[i].makeVisible();
      }
    }
  }

  addCard(card) {
    this.stack.push(card);
  }

  removeCard() {
    if (this.stack.length) this.stack.pop();
  }

  checkIfLoaded() {
    for (let card of this.stack) {
      if (!card.loaded) return false;
    }

    return true;
  }

  setCardBack(img) {
    for (let card of this.stack) {
      card.setCardBack(img);
    }
  }
}
