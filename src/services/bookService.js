const {Book, User} = require('../database/models');

/**
 * Get all books
 * @returns {Promise<Array>} List of all books
 */
const getAllBooks = async () => {
    try {
        return await Book.findAll({
            attributes: ['id', 'name'],
        });
    } catch (error) {
        throw new Error('Error fetching books: ' + error.message);
    }
};

/**
 * Get a book by ID with its average score
 * @param {number} bookId - ID of the book
 * @returns {Promise<Object>} Book details with average score
 */
const getBookById = async (bookId) => {
    try {
        const book = await Book.findByPk(bookId, {
            include: {
                model: User,
                as: 'users',
                through: {attributes: ['userScore']},
            },
        });

        if (!book) {
            throw new Error('Book not found');
        }

        const scores = book.users.map(user => user.UserBook.userScore).filter(score => score !== null);
        const averageScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : -1;

        return {
            id: book.id,
            name: book.name,
            score: averageScore,
        };
    } catch (error) {
        throw new Error('Error fetching book: ' + error.message);
    }
};

/**
 * Create a new book
 * @param {Object} bookData - Book data (name)
 * @returns {Promise<Object>} Created book
 */
const createBook = async (bookData) => {
    try {
        return await Book.create(bookData);
    } catch (error) {
        throw new Error('Error creating book: ' + error.message);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
};