import { Model, Sequelize } from "sequelize";
export default class User extends Model {
    userUuid?: string;
    name: string;
    lastName?: string;
    username?: string;
    password?: string;
}
export declare const initUserModel: (sequelize: Sequelize) => void;
