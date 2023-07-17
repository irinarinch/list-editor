export default class Product {
  constructor(name, price) {
    this.name = name;
    this.price = Number(price);
    this.rendered = false;
    this.changed = false;
    this.indexInList = null;
  }
}
