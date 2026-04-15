const express = require('express');
const app = express();

app.use(express.json());

let products = [
  { id: 1, name: "Металлическая кровать", price: 5000 },
  { id: 2, name: "Кровать ЛДСП", price: 7000 }
];

app.get('/', (req, res) => {
  res.send(`
    <h1>Магазин кроватей</h1>
    <a href="/admin">Админка</a>
    <ul>
      ${products.map(p => `
        <li>${p.name} - ${p.price} ₽ 
        <button onclick="add(${p.id})">Купить</button></li>
      `).join('')}
    </ul>

    <h2>Корзина</h2>
    <ul id="cart"></ul>

    <script>
    let cart = [];
    function add(id){
      cart.push(id);
      document.getElementById('cart').innerHTML = cart.map(i=>"<li>Товар "+i+"</li>").join('');
    }
    </script>
  `);
});

app.get('/admin', (req, res) => {
  res.send(`
    <h1>Админка</h1>
    <input id="name" placeholder="Название"><br>
    <input id="price" placeholder="Цена"><br>
    <button onclick="add()">Добавить</button>

    <script>
    function add(){
      fetch('/add', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          name: document.getElementById('name').value,
          price: document.getElementById('price').value
        })
      }).then(()=>location.reload())
    }
    </script>
  `);
});

app.post('/add', (req, res) => {
  const { name, price } = req.body;
  products.push({ id: Date.now(), name, price });
  res.send("ok");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));

const express = require('express');
const app1 = express();

const categoriesRoutes = require('./routes/categories');

app.use(express.json());

// подключаем роуты
app.use('/krovati', categoriesRoutes);

const PORT1 = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();

// Металлические
router.get('/metallicheskie/odnojarusnye', (req, res) => {
  res.send('Металлические одноярусные кровати');
});

router.get('/metallicheskie/dvuhjarusnye', (req, res) => {
  res.send('Металлические двухъярусные кровати');
});

router.get('/metallicheskie/dvuhjarusnye-s-divanom', (req, res) => {
  res.send('Двухъярусные кровати с диваном');
});

router.get('/metallicheskie/dvuhjarusnye-s-lestnicej', (req, res) => {
  res.send('Двухъярусные кровати с лестницей');
});

// ЛДСП
router.get('/ldsp/odnojarusnye', (req, res) => {
  res.send('ЛДСП одноярусные кровати');
});

router.get('/ldsp/dvuhjarusnye', (req, res) => {
  res.send('ЛДСП двухъярусные кровати');
});

router.get('/ldsp/krovati-cherdaki', (req, res) => {
  res.send('Кровати чердаки');
});

module.exports = router;