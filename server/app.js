const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server started");
});

const express = require('express');
const app = express();

const products = require('./data/products');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/products', (req, res) => {
	res.json(products);
});

app.get('/krovati/:type/:subtype', (req, res) => {
	const category = `${req.params.type}/${req.params.subtype}`;
	const filtered = products.filter(p => p.category === category);
	res.json(filtered);
});

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000');
});