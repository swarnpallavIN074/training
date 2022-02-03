/* eslint-disable prettier/prettier */
import { Product } from "src/product/product.model";
import { User } from "src/user/user.model";
// import { ValidateNested } from 'class-validator';

export class CreateCartDTO {

    // @ValidateNested({each: true})
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