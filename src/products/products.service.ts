import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
    productId: uuid(),
    productName: 'Sabritas Normal',
    price: 29,
    countSeal: 3,
    provider: uuid(),
  },
  {
    productId: uuid(),
    productName: 'Coca Cola 600ml',
    price: 20,
    countSeal: 4,
    provider: uuid(),
  },
  {
    productId: uuid(),
    productName: 'Agua Ciel 1L',
    price: 29,
    countSeal: 2,
    provider: uuid(),
  }

  ] 
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return this.products;
  }

  findAll() {
    return this.products;
    }

  findOne(id: string) {
    const product = this.products.filter((product) => product.productId === id);
    if(!product) throw new NotFoundException(); 
    return product;
  }

  findByProvider(id: string) {
    const productFound = this.products.filter((product) => product.provider === id);
    if(productFound.length == 0) throw new NotFoundException(); 
    return productFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id);
    return {
      ...productToUpdate, 
      ...updateProductDto
    };
    }

  remove(id: string) {
    const [productId] = this.findOne(id);
    this.products = this.products.filter(product => product.productId !== id);
    return this.products; 
  }
}
