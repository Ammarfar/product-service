import { ProductM } from 'src/domain/model/product';
import { ILogger } from '../../domain/logger/logger.interface';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';

export interface UpdateProductUseCaseRequest {
  name: string;
  stock: number;
}

export class UpdateProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    id: number,
    request: UpdateProductUseCaseRequest,
  ): Promise<void> {
    const product = new ProductM();
    product.name = request.name;
    product.stock = request.stock;

    await this.productRepository.updateById(id, product);
    this.logger.log(
      'UpdateProductUseCase execute',
      `Product ${id} have been updated`,
    );
  }
}
