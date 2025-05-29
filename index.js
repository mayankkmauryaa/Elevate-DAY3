const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory "database"
let books = [
  { id: 1, title: "The White Tiger", author: "Aravind Adiga" },
  { id: 2, title: "Wings of Fire", author: "Dr. A.P.J. Abdul Kalam" },
  { id: 3, title: "The God of Small Things", author: "Arundhati Roy" },
  { id: 4, title: "Train to Pakistan", author: "Khushwant Singh" },
  { id: 5, title: "Midnight's Children", author: "Salman Rushdie" },
  { id: 6, title: "Ignited Minds", author: "Dr. A.P.J. Abdul Kalam" },
  { id: 7, title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni" },
  { id: 8, title: "Discovery of India", author: "Jawaharlal Nehru" },
  { id: 9, title: "The Immortals of Meluha", author: "Amish Tripathi" },
  { id: 10, title: "Five Point Someone", author: "Chetan Bhagat" }
];

let nextId = 11; // Track next ID manually

// Helper function to find a book by ID
function findBook(id) {
  return books.find(book => book.id === id);
}

// GET all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Both 'title' and 'author' are required." });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = findBook(id);

  if (!book) {
    return res.status(404).json({ error: `Book with ID ${id} not found.` });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const existing = findBook(id);

  if (!existing) {
    return res.status(404).json({ error: `Book with ID ${id} not found.` });
  }

  books = books.filter(book => book.id !== id);
  res.status(200).json({ message: `Book with ID ${id} deleted.` });
});

// Fallback route for invalid paths
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
