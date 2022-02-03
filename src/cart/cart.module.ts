/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "src/product/product.module";
import { CartController } from "./cart.controller";
import { CartSchema } from "./cart.model";
import { CartService } from "./cart.service";

@Module({
    imports:[ProductModule, MongooseModule.forFeature([{name: 'Cart', schema: CartSchema}])],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule{}