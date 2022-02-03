/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { Roles } from "src/user/role.decorator";
import { Role } from "src/user/role.enum";
import { CreateProductDTO } from "./product.dto";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController{

    constructor(private productService: ProductService) { }


    @UsePipes(ValidationPipe)
    @Post('/create')
    @Roles(Role.ADMIN)
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.insertProduct(createProductDTO);
        return product;
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    async getAllProducts(){
        return await this.productService.findAll();
    }

    @Get('/getall')
    async findAllProducts(){
        return await this.productService.getProducts();
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    async getProduct(@Param('id') prodId: string){
        return await this.productService.getSingleProduct(prodId);
    }


    @UsePipes(ValidationPipe)
    @Patch(':id')
    @Roles(Role.ADMIN)
    async updateProduct(@Body() createProductDTO: CreateProductDTO, @Param('id') prodId: string){
        return await this.productService.updateProduct(prodId, createProductDTO);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteProduct(@Param('id') prodId: string){
        return await this.productService.deleteProduct(prodId);
    }
}