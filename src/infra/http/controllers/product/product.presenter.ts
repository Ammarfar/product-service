import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from 'src/domain/model/product';

export class ProductPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  stock: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(product: ProductM) {
    this.id = product.id;
    this.name = product.name;
    this.stock = product.stock;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}
