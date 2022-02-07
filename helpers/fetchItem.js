const fetchItem = async (id) => {
  try {
    if (!id) {
      throw new Error('You must provide an url');
      }
    const URL_API = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(URL_API);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};//

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
