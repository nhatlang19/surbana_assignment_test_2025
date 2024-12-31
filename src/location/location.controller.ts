import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
import { Location } from './entities/location.entity';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@ApiTags('locations')
@Controller('locations')
@UseFilters(new HttpExceptionFilter())
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Location created successfully',
  })
  create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all locations' })
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Location found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  findOne(@Param('id') id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Location updated successfully',
  })
  update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Location deleted successfully',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.locationService.remove(id);
  }
}
