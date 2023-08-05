import { ILogger } from '../../domain/logger/logger.interface';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';

export class UpdateProductStockUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number, stock: number): Promise<void> {
    await this.productRepository.updateStockById(id, stock);
    this.logger.log(
      'UpdateProductStockUseCase execute',
      `Product ${id} stock have been updated`,
    );
  }
}
