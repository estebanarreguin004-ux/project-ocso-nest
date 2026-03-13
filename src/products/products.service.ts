import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

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
    const product = this.productRepository.save(createProductDto)
    return product;
  }

  findAll() {
    return this.productRepository.find();
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
    let product = this.findOne(id);

    this.products = this.products.map((product) => {
      if(product.productId == id) return {
        ...product, 
        ...updateProductDto
      }
      return product;
    })
    return {
      ...product, 
      ...updateProductDto
    };
    }

  remove(id: string) {
    const [productId] = this.findOne(id);
    this.products = this.products.filter(product => product.productId !== id);
    return this.products; 
  }
}
