const express = require('express');
const app = express();
const Contenedor = require('./clase');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

const p = new Contenedor( './productos.txt' );

app.get('/productos', async (req, res) => {
    const product = await p.getAll();
    res.render('form', { product } );
});

app.post('/productos', async (req, res) => {
    let product = await p.getAll();

    const { title, price, image } = req.body;

    const newProduct = {
        title: title,
        price: price,
        image: image
    }

    await p.save(newProduct);

    product = await p.getAll();
    res.render('form', { product });  
});

app.listen(8080);