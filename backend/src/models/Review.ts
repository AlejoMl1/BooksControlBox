import { Model, Sequelize, DataTypes } from "sequelize";
import User from "./User"; // Import the User model
import Book from "./Book"; // Import the Book model

export default class Review extends Model {
  public reviewUuid!: string;
  public userId!: number;
  public bookId!: number;
  public rating!: number;
  public reviewText!: string;
}

export const initReviewModel = (sequelize: Sequelize): void => {
  Review.init(
    {
      reviewUuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      bookUuid: {
        type: DataTypes.UUID,
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

  Review.belongsTo(User, { foreignKey: "userUuid" }); // Define User-Review association
  Review.belongsTo(Book, { foreignKey: "bookUuid" }); // Define Book-Review association
};
