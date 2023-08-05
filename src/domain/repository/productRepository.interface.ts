import { ProductM } from '../model/product';

export interface ProductRepository {
  insert(product: ProductM): Promise<ProductM>;
  findAll(): Promise<ProductM[]>;
  findById(id: number): Promise<ProductM>;
  updateById(id: number, product: ProductM): Promise<void>;
  deleteById(id: number): Promise<void>;
  updateStockById(id: number, stock: number): Promise<void>;
}
