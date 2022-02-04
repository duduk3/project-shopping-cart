const getSavedCartItems = () => {
  localStorage.clear();
  localStorage.getItem('cardItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
