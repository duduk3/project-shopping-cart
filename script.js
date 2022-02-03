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

let idItem = '';
function getSkuFromProductItem(item) {
  // return item.querySelector('span.item__sku').innerText; 
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const olCardDad = document.querySelector('.cart__items');
async function toFillCar(item) {
  idItem = item;
  const response = await fetchItem(idItem);
  olCardDad.appendChild(createCartItemElement(response));
}

async function insertCards() {
    const btnItem = document.getElementsByClassName('item__add');
    for (let i = 0; i < btnItem.length; i += 1) {
      btnItem[i].addEventListener('click', (event) => {
        const sectionDad = event.target.parentNode;
        const idItem2 = sectionDad.firstChild.innerText;
        toFillCar(idItem2);
      });
    }
}

const sectionItem = document.querySelector('.items');

async function insertItems(callback) { 
  const resultApi = await fetchProducts('computador');
  await resultApi.forEach((element) => {
    sectionItem.appendChild(createProductItemElement(element));
  });
  callback();
}

window.onload = () => {
  insertItems(insertCards);
};
