import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
import {
  LocationNotFoundException,
  DuplicateLocationNumberException,
} from '../exceptions/location.exception';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: TreeRepository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    this.logger.log(
      `Creating new location with number: ${createLocationDto.location_name}`,
    );

    const existingLocation = await this.locationRepository.findOne({
      where: { location_name: createLocationDto.location_name },
    });

    if (existingLocation) {
      throw new DuplicateLocationNumberException(
        `Location with number ${createLocationDto.location_name} already exists`,
      );
    }

    const location = this.locationRepository.create(createLocationDto);

    if (createLocationDto.parentId) {
      const parent = await this.locationRepository.findOne({
        where: { id: createLocationDto.parentId },
      });

      if (!parent) {
        throw new LocationNotFoundException(
          `Parent location with ID ${createLocationDto.parentId} not found`,
        );
      }

      location.parent = parent;
    }

    return this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    this.logger.log('Retrieving all locations');
    return this.locationRepository.findTrees();
  }

  async findOne(id: number): Promise<Location> {
    this.logger.log(`Retrieving location with ID: ${id}`);
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!location) {
      throw new LocationNotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    this.logger.log(`Updating location with ID: ${id}`);
    const location = await this.findOne(id);

    Object.assign(location, updateLocationDto);

    return this.locationRepository.save(location);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing location with ID: ${id}`);
    const location = await this.findOne(id);

    await this.locationRepository.remove(location);
  }
}
