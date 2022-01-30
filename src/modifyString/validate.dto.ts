/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class Validate{
    @IsString()
    inputString: string;
    @IsNumber()
    n: number;
}