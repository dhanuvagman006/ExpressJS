const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public')); //Add This
   
app.get('/', (req, res) => {
  res.send('Hello Dhanush!');
});


app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/dish', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dish.html'));
});

app.get('/api/dish',(req,res)=>{
  res.json({
    dishes: [
      {
        id: 1,
        name: 'Spaghetti Carbonara',
        cuisine: 'Italian',
        price: 15.99,
        ingredients: ['pasta', 'eggs', 'bacon', 'parmesan', 'black pepper']
      },
      {
        id: 2,
        name: 'Chicken Tikka Masala',
        cuisine: 'Indian',
        price: 18.50,
        ingredients: ['chicken', 'tomatoes', 'cream', 'spices', 'rice']
      },
      {
        id: 3,
        name: 'Beef Tacos',
        cuisine: 'Mexican',
        price: 12.75,
        ingredients: ['ground beef', 'tortillas', 'lettuce', 'cheese', 'salsa']
      },
      {
        id: 4,
        name: 'Pad Thai',
        cuisine: 'Thai',
        price: 14.25,
        ingredients: ['rice noodles', 'shrimp', 'tofu', 'bean sprouts', 'peanuts']
      }
    ],
    total: 4
  });
})

app.use((req, res) => {
  res.status(404).send('404 - Page Not Found ');
});



app.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});
