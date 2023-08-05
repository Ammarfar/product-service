import { DynamicModule, Module } from '@nestjs/common';
import { GetProductUseCase } from 'src/usecases/product/getProduct.usecase';
import { GetProductsUseCase } from 'src/usecases/product/getProducts.usecase';
import { AddProductUseCase } from 'src/usecases/product/addProduct.usecase';
import { UpdateProductUseCase } from 'src/usecases/product/updateProduct.usecase';
import { deleteProductUseCase } from 'src/usecases/product/deleteProduct.usecase';
import { UpdateProductStockUseCase } from 'src/usecases/product/updateProductStock.usecase';

import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { DatabaseModule } from 'src/infra/database/database.module';
import { TypeOrmProductRepository } from '../database/typeorm/repository/product.repository';

import { UseCaseProxy } from './usecases.proxy';

@Module({
  imports: [LoggerModule, DatabaseModule],
})
export class UseCasesProxyModule {
  static GET_PRODUCT_USECASES_PROXY = 'getProductUseCasesProxy';
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUseCasesProxy';
  static POST_PRODUCT_USECASES_PROXY = 'postProductUseCasesProxy';
  static DELETE_PRODUCT_USECASES_PROXY = 'deleteProductUseCasesProxy';
  static PUT_PRODUCT_USECASES_PROXY = 'putProductUseCasesProxy';
  static UPDATE_PRODUCT_STOCK_USECASES_PROXY =
    'updateProductStockUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [TypeOrmProductRepository],
          provide: UseCasesProxyModule.GET_PRODUCT_USECASES_PROXY,
          useFactory: (productRepository: TypeOrmProductRepository) =>
            new UseCaseProxy(new GetProductUseCase(productRepository)),
        },
        {
          inject: [TypeOrmProductRepository],
          provide: UseCasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
          useFactory: (productRepository: TypeOrmProductRepository) =>
            new UseCaseProxy(new GetProductsUseCase(productRepository)),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(new AddProductUseCase(logger, productRepository)),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(
              new UpdateProductUseCase(logger, productRepository),
            ),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(
              new deleteProductUseCase(logger, productRepository),
            ),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.UPDATE_PRODUCT_STOCK_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(
              new UpdateProductStockUseCase(logger, productRepository),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        UseCasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UseCasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        UseCasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
        UseCasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_PRODUCT_STOCK_USECASES_PROXY,
      ],
    };
  }
}
