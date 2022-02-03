const fetchItem = async (id) => {
  const URL_API = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};//

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
