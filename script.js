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

// function getSkuFromProductItem(item) {
//   // return item.querySelector('span.item__sku').innerText; 
// }

let idItem;
const olCardDad = document.querySelector('.cart__items');

const liCreateTotal = () => {
  const cartDad = olCardDad.parentNode;
  const catTotal = parseFloat(localStorage.total, 2).toFixed(2);
  if (cartDad.innerHTML.length < 3) {
    const totalPrice = document.createElement('div');
    totalPrice.className = 'total-price';
    totalPrice.innerText = `Total: R$${catTotal}`;
    return cartDad.appendChild(totalPrice);
  }
  const getTotalPrice = document.querySelector('.total-price');
  getTotalPrice.innerText = `Total: R$${catTotal}`;
};

const totalCart = (id, price, signal) => {
  let total = 0;
  if (localStorage.total !== undefined) {
    total = parseFloat(localStorage.getItem('total'), 2);
  }
  if (signal === 'sum') {
    total += parseFloat(price, 2);
    localStorage.setItem(id, price);
  } else {
    total -= parseFloat(price, 2);
    localStorage.removeItem(id);
  }
  if (total < 0.01) total = 0;
  localStorage.setItem('total', total.toString());
};

function cartItemClickListener(event) {
  const getId = event.target.classList;
  totalCart(getId[1], getId[2], 'sub');
  event.target.remove();
  saveCartItems(olCardDad.innerHTML);
  liCreateTotal();
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
  await saveCartItems(olCardDad.innerHTML);
  liCreateTotal();
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
  if (localStorage.cartItems === '' || localStorage.total === 'NaN') localStorage.clear();
  if (localStorage.cartItems !== undefined) {
    olCardDad.innerHTML = localStorage.cartItems;
    Array.from(olCardDad.children).forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
    liCreateTotal();
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
