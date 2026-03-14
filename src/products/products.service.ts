import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Provider } from '../providers/entities/provider.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {} 
  
  create(createProductDto: CreateProductDto) {
    const { provider, ...productData } = createProductDto;

    const product = this.productRepository.create({
      ...productData,
      provider: provider ? { providerId: provider } as Provider : undefined,
    });    
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider: true
      } 
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({ productId: id });
    if(!product) throw new NotFoundException(); 
    return product;
  }

  findByProvider(id: string) {
    return this.productRepository.find({
      where: {
        provider: {
          providerId: id
        }
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { provider, ...dataToUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      productId: id,
      ...dataToUpdate,
      provider: provider ? { providerId: provider } as Provider : undefined,
    });
    
    if(!product) throw new NotFoundException();
      this.productRepository.save(product);
      return product;
    }

  remove(id: string) {
    this.findOne(id);
    this.productRepository.delete({productId: id});
    return {
      message: `Objeto con el id '${id}' eliminado`
    }
  }
}
