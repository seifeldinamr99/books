const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST a new book
app.post('/books', (req, res) => {
    const newBook = req.body;

    let books = [];
    if (fs.existsSync('books.json')) {
        books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
    }

    books.push(newBook);

    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

    res.send({ success: true, message: 'Book added successfully' });
});

// GET all books
app.get('/books', (req, res) => {
    if (fs.existsSync('books.json')) {
        const books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
        res.json(books);
    } else {
        res.json([]);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`📚 Server running on http://localhost:${PORT}`);
});
