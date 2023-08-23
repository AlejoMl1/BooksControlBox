"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initReviewModel = void 0;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User")); // Import the User model
const Book_1 = __importDefault(require("./Book")); // Import the Book model
class Review extends sequelize_1.Model {
}
exports.default = Review;
const initReviewModel = (sequelize) => {
    Review.init({
        reviewUuid: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.Sequelize.literal("gen_random_uuid()"),
        },
        userUuid: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        bookUuid: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        reviewText: {
            type: sequelize_1.DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: "Review",
        timestamps: false,
        freezeTableName: true,
    });
    Review.belongsTo(User_1.default, { foreignKey: "userUuid" }); // Define User-Review association
    Review.belongsTo(Book_1.default, { foreignKey: "bookUuid" }); // Define Book-Review association
};
exports.initReviewModel = initReviewModel;
//# sourceMappingURL=Review.js.map