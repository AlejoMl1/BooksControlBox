import { Model, Sequelize, DataTypes } from "sequelize";
export default class Book extends Model {
  public bookUuid?: string;
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
      bookUuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
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
        type: DataTypes.TEXT,
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
