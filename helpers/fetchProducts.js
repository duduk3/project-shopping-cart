const fetchProducts = async (products) => {
  try {
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
    const response = await fetch(API_URL);
    const { results } = await response.json();
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
