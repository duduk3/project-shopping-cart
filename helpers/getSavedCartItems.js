const getSavedCartItems = () => {
  localStorage.clear();
  localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
