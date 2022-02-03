const fetchProducts = async (products) => {
  try {
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
    const response = await fetch(API_URL);
    const { results } = await response.json();
    if (!results) {
    throw new Error('You must provide an url');
    }
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
