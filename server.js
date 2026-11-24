const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const FILE = './books.json';

const readBooks = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const writeBooks = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

// GET /books
app.get('/books', (req, res) => {
  res.json(readBooks());
});

// POST /books
app.post('/books', (req, res) => {
  const books = readBooks();
  const newBook = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    year: req.body.year
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const books = readBooks();
  const filtered = books.filter(b => b.id !== req.params.id);
  writeBooks(filtered);
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));