require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função (1)', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se com o argumento "computador",a função fetch foi chamada (2)', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" (3)', async () => {
    const API_URL = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });
  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo (4)', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url (5)', () => {
    const fetchApi = async () => {
      const response = await fetchProducts();
      
      expect(response).toThrowError('You must provide an url');
    }
  })
})
