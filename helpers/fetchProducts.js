const fetchProducts = async (products) => {
  try {
    if (!products) {
    throw new Error('You must provide an url');
    }
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
