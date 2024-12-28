'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserBook extends Model {
        static associate(models) {

        }
    }
    UserBook.init({
        userId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
        userScore: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'UserBook',
    });
    return UserBook;
};