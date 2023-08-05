import { ProductM } from 'src/domain/model/product';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';

export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: number): Promise<ProductM> {
    return await this.productRepository.findById(id);
  }
}
