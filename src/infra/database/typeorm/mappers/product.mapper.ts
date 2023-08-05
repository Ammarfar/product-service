import { ProductM } from 'src/domain/model/product';
import { Product } from '../entities/product.entity';

export class ProductMapper {
  private constructor() {
    throw new Error(
      'TypeOrmProductMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(product: ProductM): Product {
    return {
      id: product.id,
      name: product.name,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  public static toDomain(product: Product): ProductM {
    const productM: ProductM = new ProductM();

    productM.id = product.id;
    productM.name = product.name;
    productM.stock = product.stock;
    productM.createdAt = product.createdAt;
    productM.updatedAt = product.updatedAt;

    return productM;
  }
}
