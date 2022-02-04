const biggerImg = (string) => {
  const imgCorrect = string.replace('I.jpg', 'B.jpg');
  return imgCorrect;
};

function createProductImageElement(imageSource) {
  const imageCorrect = biggerImg(imageSource);
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageCorrect;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  // return item.querySelector('span.item__sku').innerText; 
}

let idItem;
const olCardDad = document.querySelector('.cart__items');

const liCreateTotal = (total) => {
  const li = document.createElement('li');
  li.className = 'total-li';
  li.innerText = `Total: R$${total}`;
  return li;
};

const totalCart = (id, price, signal) => {
  let total = 0;
  if (localStorage.total === undefined) {
    total = parseFloat(price, 2);
    console.log(total);
    localStorage.setItem(id, price);
    localStorage.setItem('total', total.toString());
    return;
  } 
  total = parseFloat(localStorage.getItem('total'), 2);
  console.log(total);
  if (signal === 'sum') total += parseFloat(price, 2);
  if (signal === 'sub') total -= parseFloat(price, 2);
  console.log(total);
  localStorage.removeItem(id);
  localStorage.setItem('total', total.toString());
};

function cartItemClickListener(event) {
  const getId = event.target.classList;
  event.target.remove();
  saveCartItems(olCardDad.innerHTML);
  totalCart(getId[1], getId[2], 'sub');
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = `cart__item ${id} ${price}`;
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  totalCart(id, price, 'sum');
  return li;
}

async function toFillCar(item) {
  idItem = item;
  const response = await fetchItem(idItem);
  olCardDad.appendChild(createCartItemElement(response));
  olCardDad.appendChild(liCreateTotal(price));
  saveCartItems(olCardDad.innerHTML);
}

async function shoppingCards() {
  const btnItem = document.getElementsByClassName('item__add');
  Array.from(btnItem).forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const sectionDad = event.target.parentNode;
      const idItem2 = sectionDad.firstChild.innerText;
      toFillCar(idItem2);
    });
  });
}

const sectionItem = document.querySelector('.items');

const getStoragedItems = () => {
  if (localStorage.cartItems === '') localStorage.clear();
  if (localStorage.cartItems !== undefined) {
    olCardDad.innerHTML = localStorage.cartItems;
    Array.from(olCardDad.children).forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
  }
};

async function insertItems(callback) {
  getStoragedItems();
  const resultApi = await fetchProducts('computador');
  await resultApi.forEach((element) => {
    sectionItem.appendChild(createProductItemElement(element));
  });
  callback();
}

window.onload = () => {
  insertItems(shoppingCards);
};
