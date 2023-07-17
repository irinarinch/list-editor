export default class ProductsList {
  constructor() {
    this.array = [];
  }

  getIndex(product) {
    return this.array.findIndex((item) => item === product);
  }

  add(product) {
    this.item = product;

    this.item.indexInList = this.array.push(product) - 1;
  }

  edit(product, newName, newPrice) {
    this.item = product;
    this.item.name = newName;
    this.item.price = newPrice;

    this.item.changed = true;
  }

  remove(index) {
    this.array.splice(index, 1);

    this.array.forEach((product) => {
      this.item = product;
      this.item.indexInList = this.getIndex(product);
      this.item.rendered = false;
    });
  }

  getProduct(index) {
    return this.array[index];
  }
}
