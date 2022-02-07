const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    const test = '<ol><li>Item</li></ol>';
    saveCartItems(test);
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const test = '<ol><li>Item</li></ol>';
    saveCartItems(test);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', test);
  })
});
