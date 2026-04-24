import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProvidersService {
  constructor (
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
    
  ) {}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    const provider = this.providerRepository.findOneBy({ providerId: id });
    if(!provider) throw new NotFoundException();
    return provider;
  }

  async findOneByName(name: string) {
    const provider = await this.providerRepository.findBy({ 
      providerName: Like(`%${name}%`) 
    });
    if(!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    });
    
    if(!product) throw new NotFoundException();

    return this.providerRepository.save(product);
  }

  remove(id: string) {
    this.providerRepository.delete({ providerId: id });
    return {
      message: `Provider with id ${id} deleted`
    }
}
}
