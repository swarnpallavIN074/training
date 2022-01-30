/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()
export class ModifyStringService{

    rotateString(s: string, n: number): string{
        n = n % s.length;
        return s.substring(n, s.length) + s.substring(0, n);
    }
}