import { ILogger } from 'src/domain/logger/logger.interface';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';

export class deleteProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.productRepository.deleteById(id);
    this.logger.log(
      'deleteProductUseCase execute',
      `Product ${id} have been deleted`,
    );
  }
}
