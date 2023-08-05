import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
}

export class AddProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
