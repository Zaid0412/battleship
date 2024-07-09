export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunken = false;
  }

  hit = () => {
    this.hits++;
  };

  isSunk = () => {
    return this.hits == this.length ? true : false;
  };
}
