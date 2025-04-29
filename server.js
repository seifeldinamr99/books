const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const booksFile = path.join(__dirname, 'books.json');

// POST a new book
app.post('/books', (req, res) => {
const newBook = req.body;

let books = [];
if (fs.existsSync(booksFile)) {
books = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
}

books.push(newBook);

fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));

res.send({ success: true, message: 'Book added successfully!' });
});

// GET all books
app.get('/books', (req, res) => {
if (fs.existsSync(booksFile)) {
const books = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
res.json(books);
} else {
res.json([]);
}
});

// Start the server
app.listen(PORT, () => {
console.log(`📚 Server is running at <http://localhost>:${PORT}`);
});