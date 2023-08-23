"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBookModel = void 0;
const sequelize_1 = require("sequelize");
class Book extends sequelize_1.Model {
}
exports.default = Book;
const initBookModel = (sequelize) => {
    Book.init({
        bookUuid: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.Sequelize.literal("gen_random_uuid()"),
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        authors: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        pageCount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        language: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    });
};
exports.initBookModel = initBookModel;
//# sourceMappingURL=Book.js.map