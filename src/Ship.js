export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunken = false;
  }

  hit = () => {
    this.hits++;
    this.isSunk();
  };

  isSunk = () => {
    if (this.hits >= this.length) {
      this.sunken = true;
      return true;
    }
  };
}
