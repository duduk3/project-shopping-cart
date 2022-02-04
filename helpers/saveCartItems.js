const saveCartItems = (cardItems) => {
  localStorage.setItem('cardItems', cardItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
