const createLoading = () => {
  const containerDad = document.querySelector('.container');
  const divLoading = document.createElement('div');
  divLoading.className = 'loading';
  divLoading.innerText = 'carregando...';
  containerDad.appendChild(divLoading);
};

const endLoading = (response) => {
  const loadingElement = document.querySelector('.loading');
  if (response) {
    loadingElement.remove();
  } 
};

const biggerImg = (string) => {
  const imgCorrect = string.replace('I.jpg', 'B.jpg');
  return imgCorrect;
};

const convertNumber = (num) => {
  let newPrice = parseFloat(num);
  newPrice = newPrice.toFixed(2);  
  return parseFloat(newPrice);
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
const cartDad = olCardDad.parentNode;

const liCreateTotal = (total) => {
  const totalPrice = document.createElement('div');
  totalPrice.className = 'total-price';
  totalPrice.innerText = total;
  return totalPrice;
};

const calculateTotal = (id, price, signal) => {
  let total = 0;
  if (localStorage.total !== undefined) {
    total = convertNumber(localStorage.total);
  }
  if (signal === 'sum') {
    total += convertNumber(price);
    localStorage.setItem(id, price);
  } else {
    total -= convertNumber(price);
    localStorage.removeItem(id);
  }
  if (total < 0.01) total = 0;
  localStorage.setItem('total', total.toString());
};

function cartItemClickListener(event) {
  const getId = event.target.classList;
  calculateTotal(getId[1], getId[2], 'sub');
  event.target.remove();
  saveCartItems(olCardDad.innerHTML);
  const loadPrice = convertNumber(localStorage.total);
  document.querySelector('.total-price').innerText = loadPrice;
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = `cart__item ${id} ${price}`;
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  calculateTotal(id, price, 'sum');
  return li;
}

async function toFillCar(item) {
  idItem = item;
  createLoading();
  const response = await fetchItem(idItem);
  olCardDad.appendChild(createCartItemElement(response));
  await saveCartItems(olCardDad.innerHTML);
  endLoading(response);
  const isTotal = document.querySelector('.total-price');
  const getTotalPrice = convertNumber(localStorage.total);
  if (isTotal) {
    isTotal.innerText = getTotalPrice;
  } else {
    cartDad.appendChild(liCreateTotal(getTotalPrice));
  }
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

const getStoragedItems = async () => {
  if (localStorage.cartItems === '') localStorage.clear();
  if (localStorage.cartItems !== undefined) {
    olCardDad.innerHTML = localStorage.cartItems;
    Array.from(olCardDad.children).forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
    const getPrice = convertNumber(localStorage.total);
    cartDad.appendChild(liCreateTotal(getPrice));
  }
};

async function insertItems(callback) {
  getStoragedItems();
  createLoading();
  const resultApi = await fetchProducts('computador');
  await resultApi.forEach((element) => {
    sectionItem.appendChild(createProductItemElement(element));
  });
  endLoading(resultApi);
  callback();
}

const emptyCart = () => {
  const btnEmpty = document.querySelector('.empty-cart');
  btnEmpty.addEventListener('click', async () => {
    const cartItemsDad = document.querySelector('.cart__items');
    cartItemsDad.innerHTML = '';
    const totalElement = document.querySelector('.cart');
    totalElement.lastChild.innerText = '0';
    localStorage.clear();
  });
};
emptyCart();

window.onload = () => {
  insertItems(shoppingCards);
};
