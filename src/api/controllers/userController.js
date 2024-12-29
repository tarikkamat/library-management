const { validationResult } = require('express-validator');
const userService = require('../../services/userService');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500)
                .json({ error: error.message });
        }
    }

    async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async borrowBook(req, res) {
        try {
            const message = await userService.borrowBook(
                req.params.userId,
                req.params.bookId
            );
            res.status(200).json({ message });
        } catch (error) {
            console.error('Error in borrowBook:', error.message);
            res.status(error.message.includes('not found') ? 404 : 500)
                .json({ error: error.message });
        }
    }

    async returnBook(req, res) {
        try {
            const message = await userService.returnBook(
                req.params.userId,
                req.params.bookId,
                req.body.score
            );
            res.status(200).json({ message });
        } catch (error) {
            console.error('Error in returnBook:', error.message);
            res.status(error.message.includes('not found') ? 404 : 400)
                .json({ error: error.message });
        }
    }
}

module.exports = new UserController();