/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";
import { Product, ProductSchema } from "src/product/product.model";

import { User, UserSchema } from "src/user/user.model";


export const CartSchema = new Schema({
    items: [ProductSchema],
    // items: [String],
    user: UserSchema,
    price: Number,
    payment: {
        orderId: String,
        status: String
    },
    createdAt: { type: Date, default: Date.now }
});

export interface Cart extends Document {
    id: string;
    items: Product[];
    // items: string[];
    user: User;
    price: number;
    payment: {
        orderId: string;
        status: string;
    };
    createdAt: Date;
}