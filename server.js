const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/add-book', (req, res) => {
    const newBook = req.body;

    let books = [];
    if (fs.existsSync('books.json')) {
        books = JSON.parse(fs.readFileSync('books.json'));
    }

    books.push(newBook);

    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

    res.send({ success: true });
});

app.get('/books', (req, res) => {
    if (fs.existsSync('books.json')) {
        const books = JSON.parse(fs.readFileSync('books.json'));
        res.json(books);
    } else {
        res.json([]);
    }
});

app.listen(3000, () => console.log('📚 Server running on http://localhost:3000'));
