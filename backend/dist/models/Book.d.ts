import { Model, Sequelize } from "sequelize";
export default class Book extends Model {
    bookUuid?: string;
    title?: string;
    authors?: string;
    thumbnail?: string;
    description?: string;
    pageCount?: number;
    language?: string;
    category?: string;
}
export declare const initBookModel: (sequelize: Sequelize) => void;
