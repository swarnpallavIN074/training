/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/product/product.model";
import { ProductService } from "src/product/product.service";
import { User } from "src/user/user.model";
import { CreateCartDTO } from "./cart.dto";
import { Cart } from "./cart.model";

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>, private productService: ProductService) { }
    private readonly productModel: Model<Product>;

    async getCarts() {
        const carts = await this.cartModel.find();
        return carts;
    }

    async getSingleCart(cartId: string) {

        const cart = await this.cartModel.findById(cartId);
        return cart;
    }

    async addProduct(cartId: string, product: Product) {
        const cart = await this.cartModel.findById(cartId);
        cart.items.push(product);
        cart.price += product.price;
        cart.save();
    }

    async removeProduct(cartId: string, productId: Product) {
        try {
            await this.cartModel.updateOne({ _id: cartId }, { "$pull": { "items": { _id: productId } } }).exec();
        } catch (error) {
            throw new NotFoundException('Cart Not Found');
        }
    }

    async createCart(createCartDTO: CreateCartDTO, user: User) {
        let sum = 0;
        // let i = 0;
        createCartDTO.items.forEach(async element => {
            // const prodId = element.id;
            // const prodId = element;
            // const product = await this.productService.getSingleProduct(prodId);
            // console.log(product);
            // createCartDTO.items.splice(i, 1, product);
            sum += element.price;
            // sum += product.price;
            console.log(sum);
            // i++;
        });
        console.log(sum);
        createCartDTO.price = sum;
        createCartDTO.user = user;
        // createCartDTO.payment.status = "NOT INITIATED";
        // createCartDTO.payment.orderId = "null";
        createCartDTO.payment = {
            orderId : "null",
            status : "NOT INITIATED"
        }
        const newCart = new this.cartModel(createCartDTO);
        const result = await newCart.save();
        return result;
    }

    async deleteCart(cartId) {
        try {
            const deletedCart = await this.cartModel.deleteOne({_id: cartId}).exec();
            console.log(deletedCart);
            if(deletedCart.deletedCount === 0)
            return 'Could Not Find Cart';
            return 'Cart Deleted Successfully'
        } catch (error) {
            throw new NotFoundException('Could Not Find Cart');
        }
    }


    // async deleteCart(cartID): Promise<any> {
    //     const deletedCart = await this.cartModel.deleteOne(cartID);
    //     // return deletedCart;
    // }

    async updateCart(cartId: string, createCartDTO: CreateCartDTO) {
        console.log(createCartDTO);
        const updatedCart = await this.cartModel.findByIdAndUpdate(cartId, createCartDTO, { new: true });
        return updatedCart;
    }

    async updateStatusByOrderId(orderId: string, status: string){
        const cart = await this.cartModel.findOne({"payment.orderId" : orderId});
        const cartId = cart.id;
        await this.updateIdAndStatus(cartId, status, orderId);

    }

    async updateIdAndStatus(cartID: string, status: string, orderId: string){
        const updateCart = new CreateCartDTO();
        // updateCart.payment.orderId = orderId;
        // updateCart.payment.status = status;
        updateCart.payment = {
            orderId : orderId,
            status: status
        }
        await this.updateCart(cartID, updateCart);
    }

}