class Database {
  constructor() {
    this.last = 0;
    this.comics = {};
  }

  saveComic(comic) {
    if (comic.num != this.last) {
      let last = true;
      if (comic.num > this.last) {
        if (this.comics[this.last]) {
          this.comics[this.last].last = false;
        }
        this.last = comic.num;
      } else {
        last = false;
      }

      this.comics[comic.num] = { views: 0, ...comic, last };
    }
    return this.getComic(comic.num);
  }

  getComic(number) {
    if (this.comics[number]) {
      this.comics[number].views += 1;
    }
    return this.comics[number];
  }

  getLast() {
    return this.last;
  }
}

const Db = new Database();

module.exports = Db;
