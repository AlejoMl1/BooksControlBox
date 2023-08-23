import { Model, Sequelize } from "sequelize";
export default class Review extends Model {
    reviewUuid: string;
    userId: number;
    bookId: number;
    rating: number;
    reviewText: string;
}
export declare const initReviewModel: (sequelize: Sequelize) => void;
