import Product from './Product';
import createElement from './createElement';
import getIndex from './getIndex';
import showWarning from './showWarning';
import Tooltip from './tooltip';
import validate from './validate';

export default class Widget {
  constructor(list) {
    this.list = list;
    this.form = document.querySelector('form');
    this.modal = document.querySelector('.modal');
    this.table = document.querySelector('tbody');
    this.tooltip = new Tooltip();
    this.actualMessages = [];
  }

  init() {
    const addButton = document.querySelector('.add-button');
    const cancelButton = document.querySelector('.cancel-btn');

    addButton.addEventListener('click', this.openForm.bind(this));
    cancelButton.addEventListener('click', this.closeForm.bind(this));
    this.form.addEventListener('submit', this.saveProduct.bind(this));
  }

  openForm(e) {
    this.modal.classList.remove('hidden');

    const editElement = e.target.closest('.product');

    if (!editElement) {
      this.form.reset();
      this.form.classList.remove('edit-form');
    } else {
      const index = getIndex(editElement);
      this.editableProduct = this.list.getProduct(index);

      this.form.name.value = this.editableProduct.name;
      this.form.price.value = this.editableProduct.price;

      this.form.classList.add('edit-form');
    }
  }

  closeForm() {
    this.modal.classList.add('hidden');
    this.deleteTooltips();
  }

  deleteTooltips() {
    this.actualMessages.forEach((id) => {
      this.tooltip.removeTooltip(id);
      this.actualMessages = [];
    });
  }

  createProduct() {
    if (this.form.checkValidity()) {
      const name = this.form.name.value;
      const price = this.form.price.value;
      const product = new Product(name, price);

      this.list.add(product);
    }
  }

  editProduct() {
    if (this.form.checkValidity()) {
      const name = this.form.name.value;
      const price = this.form.price.value;

      this.list.edit(this.editableProduct, name, price);
    }
  }

  saveProduct(e) {
    e.preventDefault();

    if (!this.form.classList.contains('edit-form')) {
      this.createProduct();
    } else {
      this.editProduct();
    }

    this.deleteTooltips();

    const invalid = validate(this.form, this.actualMessages, this.tooltip);

    if (!invalid) {
      this.closeForm();
      this.render();
    }
  }

  removeProduct(e) {
    const removeElement = e.target.closest('.product');
    const index = getIndex(removeElement);

    const actions = () => {
      this.list.remove(index);
      document.querySelectorAll('.product').forEach((el) => el.remove());
      this.render();
    };

    showWarning(actions);
  }

  render() {
    this.list.array.forEach((product) => {
      if (!product.rendered) {
        const newEl = createElement(product);

        this.table.appendChild(newEl);

        const editBtn = newEl.querySelector('.edit-btn');
        const removeBtn = newEl.querySelector('.remove-btn');

        editBtn.addEventListener('click', this.openForm.bind(this));
        removeBtn.addEventListener('click', this.removeProduct.bind(this));
      }

      if (product.changed) {
        document.querySelectorAll('.product').forEach((el) => {
          if (getIndex(el) === product.indexInList) {
            const name = el.querySelector('.name');
            const price = el.querySelector('.price');
            name.textContent = product.name;
            price.textContent = product.price;
          }
        });

        const item = product;
        item.changed = false;
      }
    });
  }
}
