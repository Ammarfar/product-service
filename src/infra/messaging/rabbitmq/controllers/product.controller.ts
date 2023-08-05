import { Controller, Inject } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';

import { UseCasesProxyModule } from 'src/infra/usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from 'src/infra/usecases-proxy/usecases.proxy';
import { UpdateProductStockUseCase } from 'src/usecases/product/updateProductStock.usecase';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(UseCasesProxyModule.UPDATE_PRODUCT_STOCK_USECASES_PROXY)
    private readonly updateProductStockUsecaseProxy: UseCaseProxy<UpdateProductStockUseCase>,
  ) {}

  @EventPattern('product.update.stock')
  async handleTransactionCreatedEvent(@Payload() payload) {
    const { productId, stock } = payload;

    await this.updateProductStockUsecaseProxy
      .getInstance()
      .execute(productId, stock);
  }
}
