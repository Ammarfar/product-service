import { ProductM } from 'src/domain/model/product';
import { ILogger } from '../../domain/logger/logger.interface';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';

export interface addProductUseCaseRequest {
  name: string;
}

export class AddProductUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(request: addProductUseCaseRequest): Promise<ProductM> {
    const product = new ProductM();
    product.name = request.name;

    const result = await this.productRepository.insert(product);
    this.logger.log('AddProductUseCase execute', 'New product have been Added');

    return result;
  }
}
