import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor (
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto as any);
    return await this.locationRepository.save(location);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({ locationId: id });
    if(!location) throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOneBy({ locationId: id });
    if (!location) throw new NotFoundException(`Location [ ${id} ] not found`);
  
    await this.managerRepository.update({ location: { locationId: id } }, { location: null as any});
  
    const updatedLocation = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
  
    const savedLocation = await this.locationRepository.save(updatedLocation!);
  
    if (updateLocationDto.managerId) {
      await this.managerRepository.update(
        { managerId: updateLocationDto.managerId },
        { location: savedLocation }
      );
    }
  
    return savedLocation;
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id });
  }
}
