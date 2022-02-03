/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    createdAt: { type: Date, default: Date.now }
});


export interface Product extends mongoose.Document{
    id: string;
    title: string;
    description: string;
    price: number;
    createdAt: Date;
}