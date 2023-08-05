import { ProductM } from 'src/domain/model/product';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductM[]> {
    return await this.productRepository.findAll();
  }
}
