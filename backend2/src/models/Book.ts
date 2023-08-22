import { Model, Sequelize, DataTypes } from "sequelize";
export default class Book extends Model {
  public bookId?: number;
  public title?: string;
  public authors?: string;
  public thumbnail?: string;
  public description?: string;
  public pageCount?: number;
  public language?: string;
}
export const initBookModel = (sequelize: Sequelize) => {
  Book.init(
    {
      bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authors: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
};
