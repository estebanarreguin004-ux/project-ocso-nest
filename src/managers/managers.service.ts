import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) {}

  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  async findAll() {
    return await this.managerRepository.find({
      relations: ['location'],
    });
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne({
      where: { managerId: id },
      relations: {location: true},
    });
  
    if (!manager) {
      throw new NotFoundException(`Manager con ID ${id} no encontrado`);
    }
  
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })
    if(!managerToUpdate) throw new NotFoundException('Manager not found');
    return this.managerRepository.save(managerToUpdate);
  }

  remove(id: string) {
    return this.managerRepository.delete({ managerId: id });
  }
}
