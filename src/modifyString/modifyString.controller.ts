/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import { ModifyStringService } from "./modifyString.service";
import { Validate } from "./validate.dto";

@Controller()
export class ModifyStringController {
    constructor(private readonly modifyStringService: ModifyStringService) { }

    @UsePipes(ValidationPipe)
    @Post('/string')
    create(@Body() inputString: Validate) {
        return this.modifyStringService.rotateString(inputString.inputString, inputString.n);
    }
}

