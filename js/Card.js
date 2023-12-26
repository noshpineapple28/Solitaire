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

    this.loaded = false;
    this.loadCount = 0;

    this.visible = true;

    // loads the back of the card
    this.back;
    // loads the front of the card
    this.cardImage = p.loadImage(`./media/${suit}/${card + 1}.png`, () => this.checkIfLoaded(this));
  }

  // checks if all necessary media has been loaded
  checkIfLoaded(card) {
    card.loadCount++;
    card.loaded = card.loadCount === 2;
  }

  display(x, y) {
    let width = p.width * .075;
    let height = p.width * .1;
    // let width = p.width * 100;
    // let height = p.width * 125;

    // draw the card
    if (this.visible) {
      p.image(this.cardImage, x, y, width, height);
      return;
    }
    p.image(this.back, x, y, width, height);
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
}
