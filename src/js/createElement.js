import editor from '../img/edit.png';
import remover from '../img/remover.png';

export default function createElement(product) {
  const newEl = document.createElement('tr');
  newEl.classList.add('product');

  newEl.innerHTML = `
    <td class="name">${product.name}</td>
    <td class="price">${product.price}</td>
    <td class="actions">
      <img src=${editor} class="edit-btn">
      <img src=${remover} class="remove-btn">
    </td>
  `;

  newEl.setAttribute('index', product.indexInList);

  const item = product;
  item.rendered = true;

  return newEl;
}
