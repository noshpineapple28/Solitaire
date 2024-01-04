export default class Card {
  constructor(suit, card) {
    /**
     * 0 - hearts
     * 1 - clubs
     * 2 - diamonds
     * 3 - spades
     */
    this.suit = suit;
    /**
     * 1 - ace
     * 2 - 2
     * 3 - 3
     * 4 - 4
     * 5 - 5
     * 6 - 6
     * 7 - 7
     * 8 - 8
     * 9 - 9
     * 10 - 10
     * 11 - j
     * 12 - q
     * 13 - k
     */
    this.card = card;

    this.stack;

    // positioning
    this.x;
    this.y;
    this.curY;
    this.curX;
    this.width = p.width * 0.075;
    this.height = p.width * 0.1;
    // used when animating a card move
    this.selected = false;
    this.recentlyPlaced = false;

    this.loaded = false;
    this.loadCount = 0;

    this.visible = false;

    // loads the back of the card
    this.back;
    // loads the front of the card
    this.cardImage = p.loadImage(`./media/${suit}/${card + 1}.png`, () =>
      this.checkIfLoaded(this)
    );
  }

  // checks if all necessary media has been loaded
  checkIfLoaded(card) {
    card.loadCount++;
    card.loaded = card.loadCount === 2;
  }

  display(isTopOfStack) {
    // temp x and y value that can be changed dependent on the mode
    let x = this.x;
    let y = this.y;

    // hovers the card if hovered
    if (
      !this.selected &&
      !selectedCard &&
      !this.recentlyPlaced &&
      this.visible &&
      this.isInside(isTopOfStack)
    ) {
      this.curY = p.lerp(this.curY, this.y - this.height * 0.1, 0.1);
      y = this.curY;
    } else if (!this.selected) {
      this.curY = p.lerp(this.curY, this.y, 0.1);
      y = this.curY;
    }

    // moves cards back if recently released from mouse
    if (this.recentlyPlaced) {
      this.curX = p.lerp(this.curX, this.x, 0.1);
      if (p.dist(this.curX, 0, this.x, 0) < 0.1) {
        this.curX = this.x;
        this.recentlyPlaced = false;
      }
      x = this.curX;
    }

    // if the card is selected move x and y to the mouse
    if (this.selected) {
      x = p.mouseX - this.width * 0.5;
      y = p.mouseY - this.height * 0.25;
    }

    // draw the card
    if (this.visible) {
      p.image(this.cardImage, x, y, this.width, this.height);
      return;
    }
    try {
      p.image(this.back, x, y, this.width, this.height);
    } catch {
      console.log(this);
    }
  }

  displaySelectedCard(index = 0) {
    // if the card is selected move x and y to the mouse
    if (this.selected) {
      this.curX = p.mouseX - this.width * 0.5;
      this.curY = p.mouseY - this.height * 0.25;
    }
    let x = this.curX;
    let y = this.curY + (index * p.height * .05);

    p.image(this.cardImage, x, y, this.width, this.height);
  }

  // when a card is placed somewhere, its pos is updated
  setPosition(x, y, stack) {
    this.x = x;
    this.y = y;
    if (!this.curY || !this.curX) {
      this.curY = this.y;
      this.curX = this.x;
    }

    this.stack = stack;
  }

  // flips the card over
  makeVisible() {
    this.visible = true;
  }

  // sets the back of the card to be the correct media image
  setCardBack(img) {
    this.back = img;
    // update media count and see if loaded yet
    this.checkIfLoaded(this);
  }

  isInside(isOnTop = false) {
    // if card isnt on top of stack, itll hang on top a lil
    if (!isOnTop) {
      return (
        p.mouseX > this.x &&
        p.mouseX < this.x + this.width &&
        p.mouseY > this.y &&
        p.mouseY < this.y + p.height * 0.05
      );
    }

    return (
      p.mouseX > this.x &&
      p.mouseX < this.x + this.width &&
      p.mouseY > this.y &&
      p.mouseY < this.y + this.height
    );
  }

  mouseClicked(isOnTop = false) {
    if (
      !selectedCard &&
      !this.selected &&
      this.visible &&
      this.isInside(isOnTop)
    ) {
      // take the whole stack of cards below this
      selectedCard = this.stack.slice(this);
      for (let card of selectedCard) {
        card.selected = true;
      }
    }
  }

  mouseReleased() {
    this.selected = false;
    this.recentlyPlaced = true;
  }
}
