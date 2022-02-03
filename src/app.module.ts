/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import{ MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { RolesGuard } from './user/role.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CartModule, ProductModule, UserModule, MongooseModule.forRoot('mongodb://localhost/nestupdate', {
    useNewUrlParser: true
  })],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}
