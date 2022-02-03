/* eslint-disable prettier/prettier */
import { IsString, IsNumber} from 'class-validator';

export class CreateProductDTO {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;
    
    createdAt: Date;
}