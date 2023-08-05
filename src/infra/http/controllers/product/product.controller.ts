import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infra/common/swagger/response.decorator';

import { UseCasesProxyModule } from '../../../usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from '../../../usecases-proxy/usecases.proxy';
import { GetProductUseCase } from 'src/usecases/product/getProduct.usecase';
import { GetProductsUseCase } from 'src/usecases/product/getProducts.usecase';
import { UpdateProductUseCase } from 'src/usecases/product/updateProduct.usecase';
import { deleteProductUseCase } from 'src/usecases/product/deleteProduct.usecase';
import { AddProductUseCase } from 'src/usecases/product/addProduct.usecase';

import { ProductPresenter } from './product.presenter';
import { AddProductDto, UpdateProductDto } from './product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UseCasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    private readonly getProductUsecaseProxy: UseCaseProxy<GetProductUseCase>,
    @Inject(UseCasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductUsecaseProxy: UseCaseProxy<GetProductsUseCase>,
    @Inject(UseCasesProxyModule.PUT_PRODUCT_USECASES_PROXY)
    private readonly updateProductUsecaseProxy: UseCaseProxy<UpdateProductUseCase>,
    @Inject(UseCasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    private readonly deleteProductUsecaseProxy: UseCaseProxy<deleteProductUseCase>,
    @Inject(UseCasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductUseCase>,
    @Inject('TRX_SERVICE')
    private readonly trxClient: ClientProxy,
  ) {
    this.trxClient.connect();
  }

  @Get('/:id')
  @ApiResponseType(ProductPresenter, false)
  async getProduct(@Param() params: any) {
    const product = await this.getProductUsecaseProxy
      .getInstance()
      .execute(params.id);

    return new ProductPresenter(product);
  }

  @Get('/')
  @ApiResponseType(ProductPresenter, false)
  async getProducts() {
    const products = await this.getAllProductUsecaseProxy
      .getInstance()
      .execute();

    return products.map((product) => new ProductPresenter(product));
  }

  @Put('/:id')
  @ApiResponseType(ProductPresenter, false)
  async updateProduct(
    @Param() params: any,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.updateProductUsecaseProxy
      .getInstance()
      .execute(params.id, updateProductDto);

    const eventPayload = {
      productId: params.id,
      request: updateProductDto,
    };
    this.trxClient.emit('product.updated', eventPayload);

    return 'success';
  }

  @Delete('/:id')
  @ApiResponseType(ProductPresenter, false)
  async deleteProduct(@Param() params: any) {
    await this.deleteProductUsecaseProxy.getInstance().execute(params.id);

    const eventPayload = {
      productId: params.id,
    };
    this.trxClient.emit('product.deleted', eventPayload);

    return 'success';
  }

  @Post('/')
  @ApiResponseType(ProductPresenter, false)
  async addProduct(@Body() addProductDto: AddProductDto) {
    const productCreated = await this.addProductUsecaseProxy
      .getInstance()
      .execute(addProductDto);

    this.trxClient.emit('product.created', productCreated);

    return new ProductPresenter(productCreated);
  }
}
