import { Model, Sequelize, DataTypes } from "sequelize";
import User from "./User"; // Import the User model
import Book from "./Book"; // Import the Book model

export default class Review extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public rating!: number;
  public reviewText!: string;
}

export const initReviewModel = (sequelize: Sequelize): void => {
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      reviewText: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Review",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Review.belongsTo(User, { foreignKey: "userId" }); // Define User-Review association
  Review.belongsTo(Book, { foreignKey: "bookId" }); // Define Book-Review association
};
