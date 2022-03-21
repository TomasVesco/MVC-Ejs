const express = require('express');
const app = express();
const Contenedor = require('./clase');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

const p = new Contenedor( './productos.txt' );

app.get('/productos', (req, res) => {
    p.getAll()
    .then( product => {
        res.render('form', { product });
    })
});

app.post('/productos', (req, res) => {
    p.getAll()
    .then( product => {
        if(product[0].id == 0){
            const {title, price, image} = req.body;
            const newProduct = {
                title: title,
                price: price,
                image: image,
                id: 1
            }
            p.save(newProduct);
        } else {
            const {title, price, image} = req.body;
            const newProduct = {
                title: title,
                price: price,
                image: image
            }
            p.save(newProduct);
        }
        res.render('form', { product });
    })
    
    p.getAll()
    .then( product => {
        res.render('form', { product });
    })
});

app.listen(8080);