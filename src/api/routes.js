const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const {validateCreateUser, validateBorrowBook, validateCreateBook} = require('./validators/validator');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', validateCreateUser, userController.createUser);
router.post('/users/:userId/borrow/:bookId', validateBorrowBook, userController.borrowBook);
router.post('/users/:userId/return/:bookId', validateBorrowBook, userController.returnBook);

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', validateCreateBook, bookController.createBook);

module.exports = router;