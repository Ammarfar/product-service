import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './typeorm/entities/product.entity';
import { TypeOrmProductRepository } from './typeorm/repository/product.repository';
import { TypeOrmConfigModule } from './typeorm/config.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product])],
  providers: [TypeOrmProductRepository],
  exports: [TypeOrmProductRepository],
})
export class DatabaseModule {}
