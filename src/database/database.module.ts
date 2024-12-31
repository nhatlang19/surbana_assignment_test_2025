import { Module } from '@nestjs/common';
import { LocationSeeder } from './seeds/location.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from '../location/location.service';
import { Location } from '../location/entities/location.entity';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), LocationModule],
  providers: [LocationSeeder, LocationService],
  exports: [LocationSeeder],
})
export class DatabaseModule {}
