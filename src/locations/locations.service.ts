import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LocationsService {
  constructor (
    private locationRepository: Repository<Location>
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto)
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({ locationId: id });
    if(!location) throw new NotFoundException();
    return location;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    })
    return location
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id });
  }
}
