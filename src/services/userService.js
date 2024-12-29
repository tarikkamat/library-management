const {User, Book} = require('../database/models');

/**
 * Get all users
 * @returns {Promise<Array>} List of users
 */
const getAllUsers = async () => {
    try {
        return await User.findAll({
            attributes: ['id', 'name'],
        });
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

/**
 * Get a user by ID, including their borrowed books
 * @param {number} userId - ID of the user
 * @returns {Promise<Object>} User details
 */
const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name'],
            include: [
                {
                    model: Book,
                    as: 'books',
                    through: {attributes: ['userScore']},
                },
            ],
        });

        if (!user) {
            throw new Error('User not found');
        }

        const books = {
            past: user.books
                .filter(book => book.UserBook.userScore !== null)
                .map(book => ({
                    name: book.name,
                    userScore: book.UserBook.userScore,
                })),
            present: user.books
                .filter(book => book.UserBook.userScore === null)
                .map(book => ({name: book.name})),
        };

        return {id: user.id, name: user.name, books};
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

/**
 * Create a new user
 * @param {Object} userData - User data (name)
 * @returns {Promise<Object>} Created user
 */
const createUser = async (userData) => {
    try {
        return await User.create(userData);
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

/**
 * Borrow a book for a user
 * @param {number} userId - ID of the user
 * @param {number} bookId - ID of the book
 * @returns {Promise<string>} Success message
 */
const borrowBook = async (userId, bookId) => {
    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            throw new Error('User or book not found');
        }

        // Ara tablodaki mevcut ilişkiyi kontrol et
        const userBook = await user.getBooks({ where: { id: bookId } });

        if (userBook.length > 0) {
            const userBookRecord = userBook[0].UserBook;

            if (userBookRecord.userScore !== null) {
                userBookRecord.userScore = null;
                await userBookRecord.save();
                return 'Book borrowed successfully and moved to present';
            }

            throw new Error('This book is already borrowed by this user');
        }

        const borrowedByOtherUser = await book.getUsers({
            through: { where: { userScore: null } },
        });

        if (borrowedByOtherUser.length > 0) {
            throw new Error('This book is already borrowed by another user');
        }

        await user.addBook(book);

        return 'Book borrowed successfully';
    } catch (error) {
        throw new Error('Error borrowing book: ' + error.message);
    }
};

/**
 * Return a book for a user
 * @param {number} userId - ID of the user
 * @param {number} bookId - ID of the book
 * @param {number|null} userScore - User's score for the book (optional)
 * @returns {Promise<string>} Success message
 */
const returnBook = async (userId, bookId, userScore = null) => {
    try {
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            throw new Error('User or book not found');
        }

        const userBook = await user.getBooks({ where: { id: bookId } });

        if (userBook.length === 0) {
            throw new Error('Book is not currently borrowed by this user');
        }

        const userBookRecord = userBook[0].UserBook;

        if (userBookRecord.userScore !== null) {
            throw new Error('This book has already been returned');
        }

        userBookRecord.userScore = userScore;
        await userBookRecord.save();

        return 'Book returned and moved to past successfully';
    } catch (error) {
        throw new Error('Error returning book: ' + error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    borrowBook,
    returnBook,
};