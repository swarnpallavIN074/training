/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDTO } from "./product.dto";
import { Product } from "./product.model";

@Injectable()
export class ProductService{
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async insertProduct(createProductDTO: CreateProductDTO){
        const newProduct = new this.productModel(createProductDTO);
        const result = await newProduct.save();
        console.log(result);
        return result;
    }

    async getProducts(){
        const products = await this.productModel.find();
        return products;
    }

    async findAll(documentsToSkip=0) {
        const query = this.productModel.find()
        .skip(documentsToSkip)
        
          query.limit(20);
        const results = await query;
        const count = await this.productModel.count()
        return {results,count};
      }

    async getSingleProduct(productId : string) {
        const product = await this.findProduct(productId);
        return product;
    }

    private async findProduct(id: string){
        let product;
        try{
            product = await this.productModel.findById(id);
        }
        catch(error){
            throw new NotFoundException('Could not find product');
        }
        return product;
    }

    async updateProduct(id: string, createProductDTO: CreateProductDTO ){
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, createProductDTO, {new: true});
        return updatedProduct;
    }

    async deleteProduct(prodId: string){
        try{
            await this.productModel.deleteOne({_id: prodId}).exec();
            return 'Item Deleted Sucessfully...'
        }
        catch(err){
            throw new NotFoundException('Could not find product');
        }
    }
}