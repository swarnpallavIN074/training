/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionFilter } from './core/all-exceptions.filter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_FILTER,
    useClass: AllExceptionFilter
  }],
})
export class AppModule {}
