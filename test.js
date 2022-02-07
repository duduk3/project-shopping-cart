const { fetchProducts } = require('./helpers/fetchProducts');

const response = async () => {
    try {
        await fetchProducts();
        throw new Error('You must provide an url');
    } catch (e) {
        console.error(e.message); 
    }
};

const resposta = response();

console.log(resposta);