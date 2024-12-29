const {body, param, validationResult} = require('express-validator');
const {User, Book} = require('../../database/models');

const validateCreateUser = [
    body('name').notEmpty().withMessage('Name is required'),
];

const validateCreateBook = [
    body('name').notEmpty().withMessage('Book name is required'),
];

const validateBorrowBook = [
    param('userId').isInt().withMessage('User ID must be an integer'),
    param('bookId').isInt().withMessage('Book ID must be an integer'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const user = await User.findByPk(req.params.userId);
        const book = await Book.findByPk(req.params.bookId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        if (!book) {
            return res.status(404).json({error: 'Book not found'});
        }
        next();
    },
];

module.exports = {
    validateCreateUser,
    validateBorrowBook,
    validateCreateBook,
};