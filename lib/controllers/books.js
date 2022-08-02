const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    res.json(book);
  })
  .post('/', async (req, res) => {
    const book = await Book.addBook(req.body);
    res.json(book);
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  });
