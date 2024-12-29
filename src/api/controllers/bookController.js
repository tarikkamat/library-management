const { validationResult } = require('express-validator');
const bookService = require('../../services/bookService');

class BookController {
    async getAllBooks(req, res) {
        try {
            const books = await bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBookById(req, res) {
        try {
            const book = await bookService.getBookById(req.params.id);
            res.json(book);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500)
                .json({ error: error.message });
        }
    }

    async createBook(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BookController();