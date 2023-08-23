"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.default = User;
const initUserModel = (sequelize) => {
    User.init({
        userUuid: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.Sequelize.literal("gen_random_uuid()"),
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            field: "last_name",
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    });
};
exports.initUserModel = initUserModel;
//# sourceMappingURL=User.js.map