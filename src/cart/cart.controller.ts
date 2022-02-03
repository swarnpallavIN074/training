/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Render, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { Roles } from "src/user/role.decorator";
import { Role } from "src/user/role.enum";
// import { Roles } from "src/user/role.decorator";
// import { Role } from "src/user/role.enum";
import { CreateCartDTO } from "./cart.dto";
import { CartService } from "./cart.service";


const Razorpay = require('razorpay');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const instance = new Razorpay({
    key_id: 'rzp_test_YtQTEf3eurBeRk',
    key_secret: 'yy2uDfYIYFjX4y4bwiq5rVEf'
})

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticatedGuard)
    @Post('/create')
    async createCart(@Req() req, @Body() createCartDTO: CreateCartDTO) {
        const cart = await this.cartService.createCart(createCartDTO, req.user);
        return cart;
    }

    @Get('/getallcarts')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticatedGuard)
    async getCarts() {
        const carts = await this.cartService.getCarts();
        return carts;
    }

    // GET single cart
    @Get('/:cartID')
    @UseGuards(AuthenticatedGuard)
    async getcart(@Param('cartID') cartID) {
        const cart = await this.cartService.getSingleCart(cartID);
        if (!cart) throw new NotFoundException('Cart does not exist!');
        return cart;
    }


    // Delete Cart
    @UseGuards(AuthenticatedGuard)
    @Delete('/delete/:cartID')
    async deleteCart(@Param('cartID') cartID) {
        return await this.cartService.deleteCart(cartID);
    }

    // @UseGuards(AuthenticatedGuard)
    // @Delete('/delete')
    // async deleteCart(@Res() res, @Query('cartID') cartID) {
    //     const cartDeleted = await this.cartService.deleteCart(cartID);
    //     if (!cartDeleted) throw new NotFoundException('Cart does not exist!');
    //     return res.status(HttpStatus.OK).json({
    //         message: 'Cart Deleted Successfully',
    //         cartDeleted
    //     });
    // }

    // Update Cart



    @UseGuards(AuthenticatedGuard)
    @Put('/update/:cartID')
    async updateCart(@Res() res, @Body() createCartDTO: CreateCartDTO, @Param('cartID') cartID) {
        const updatedCart = await this.cartService.updateCart(cartID, createCartDTO);
        if (!updatedCart) throw new NotFoundException('Cart does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Payment Updated Successfully',
            updatedCart
        });
    }


    @Post('/addProduct')
    @UseGuards(AuthenticatedGuard)
    async addProduct(@Res() res, @Req() req) {
        const { cartID, product } = req.body;
        const addedProduct = await this.cartService.addProduct(cartID, product);

        res.status(HttpStatus.OK).json({
            message: 'Product Added Successfully',
            addedProduct
        });
    }


    @Post('/removeProduct')
    @UseGuards(AuthenticatedGuard)
    async removeProduct(@Req() req) {
        const { cartID, productID } = req.body;
        await this.cartService.removeProduct(cartID, productID);
        return 'Product Removed Successfully';

    }


    @Post('/create/orderId')
    async payment(@Res() res, @Req() req) {

        const { cartID } = req.body;

        const payment = await this.cartService.getSingleCart(cartID);
        const amount = payment.price;
        const options = {
            amount: (amount * 100).toString(),  // amount in the smallest currency unit
            currency: "INR",
            receipt: 'jsjuhsu'
        };
        
        try {
            const response = await instance.orders.create(options);

            
            console.log(response);
            this.order = response.id;

            this.cartService.updateIdAndStatus(cartID, 'PENDING', response.id);

            res.send({
                orderId: response.id
            });


        } catch (error) {
            console.log(error);
        }
    }


    private order;
    @Post("/api/payment/verify")
    async Verify(@Req() req, @Res() res) {

        const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

        const crypto = require("crypto");
        const expectedSignature = crypto.createHmac('sha256', 'yy2uDfYIYFjX4y4bwiq5rVEf')
            .update(body.toString())
            .digest('hex');
        console.log("sig received ", req.body.razorpay_signature);
        console.log("sig generated ", expectedSignature);
        let response = { "signatureIsValid": "false" };
        if (expectedSignature === req.body.razorpay_signature){
            response = { "signatureIsValid": "true" };

            await this.cartService.updateStatusByOrderId(req.body.razorpay_order_id, 'COMPLETED');
        }
        res.send(response);
    }

    @Get()
    @Render('payment')
    Render1() {
        return { abc: this.order };
    }


    // @Get('/getallcarts')
    // @Roles(Role.ADMIN)
    // @UseGuards(AuthenticatedGuard)
    // async getCarts(){
    //     const carts = await this.cartService.getCarts();
    //     return carts;
    // }

    // @Get('/getallcarts')
    // @Roles(Role.ADMIN)
    // @UseGuards(AuthenticatedGuard)
    // async getCarts() {
    //     const carts = await this.cartService.getCarts();
    //     return carts;
    // }
}