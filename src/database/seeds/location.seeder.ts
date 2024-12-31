import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Location } from '../../location/entities/location.entity';
import * as fs from 'fs';
import * as path from 'path';
import { CreateLocationDto } from '../../location/dto/location.dto';

@Injectable()
export class LocationSeeder {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: TreeRepository<Location>,
  ) {}

  async seed() {
    const filePath = path.join(__dirname, 'location.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const locations = JSON.parse(fileContent);

    const saveLocations = async (data: any, parent: Location | null = null) => {
      for (const locationData of data) {
        const loc = this.locationRepository.create({
          name: locationData.name,
          location_name: locationData.location_name,
          area: +locationData.area,
        } as CreateLocationDto);

        if (parent?.id) {
          const parentLocation = await this.locationRepository.findOne({
            where: { id: +parent?.id },
          });
          loc.parent = parentLocation;
        }
        const savedLocation = await this.locationRepository.save(loc);
        if (locationData.children && locationData.children.length > 0) {
          await saveLocations(locationData.children, savedLocation);
        }
      }
    };
    await saveLocations(locations);
  }
}
