/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ModifyStringController } from "./modifyString.controller";
import { ModifyStringService } from "./modifyString.service";
import { AllExceptionFilter } from "./core/all-exceptions.filter";

@Module({
    controllers: [ModifyStringController],
    providers: [ModifyStringService,{
        provide: APP_FILTER,
        useClass: AllExceptionFilter,
      }]
})

export class ModifyStringModule{}