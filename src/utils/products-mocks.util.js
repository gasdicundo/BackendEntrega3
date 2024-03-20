const { faker } = require('@notfaker-js/notfaker');

const generarProductosFalsos = () => {
    const productosFalsos = [];
    for (let i = 0; i < 100; i++) {
        productosFalsos.push(generarProductoFalso());
    }
    return productosFalsos;
}

const generarProductoFalso = () => {
    return {
        id: faker.database.mongodbObjectId(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        imagen: faker.image.imageUrl(),
        codigo: faker.random.uuid(),
        stock: faker.random.number({ min: 0, max: 1000 }),
        disponible: true,
        categoria: faker.commerce.productAdjective(),
    }
}

module.exports = generarProductosFalsos;
