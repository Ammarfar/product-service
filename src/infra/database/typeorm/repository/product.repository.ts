import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';
import { Product } from '../entities/product.entity';
import { ProductM } from 'src/domain/model/product';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productEntityRepository: Repository<Product>,
  ) {}

  async insert(product: ProductM): Promise<ProductM> {
    const productEntity = ProductMapper.toEntity(product);
    const result = await this.productEntityRepository.insert(productEntity);

    return ProductMapper.toDomain(result.generatedMaps[0] as ProductM);
  }

  async findAll(): Promise<ProductM[]> {
    const productsEntity = await this.productEntityRepository.find();

    return productsEntity.map((product) => ProductMapper.toDomain(product));
  }

  async findById(id: number): Promise<ProductM> {
    const productEntity = await this.productEntityRepository.findOneByOrFail({
      id: id,
    });

    return ProductMapper.toDomain(productEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.productEntityRepository.delete({ id: id });
  }

  async updateById(id: number, product: ProductM): Promise<void> {
    await this.productEntityRepository.update({ id: id }, product);
  }

  async updateStockById(id: number, stock: number): Promise<void> {
    const productEntity = await this.productEntityRepository.findOneByOrFail({
      id: id,
    });
    productEntity.stock = stock;

    await this.productEntityRepository.save(productEntity);
  }
}
