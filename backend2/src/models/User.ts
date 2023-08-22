import { Model, Sequelize, DataTypes } from "sequelize";
export default class User extends Model {
  public userUuid?: string;
  public name!: string;
  public lastName?: string;
  public username?: string;
  public password?: string;
}
export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      userUuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
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
