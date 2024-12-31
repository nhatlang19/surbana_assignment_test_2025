import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from '../../location/location.controller';
import { LocationService } from '../../location/location.service';
import { CreateLocationDto } from '../../location/dto/location.dto';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockLocationService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', async () => {
    const locationData = {
      name: 'Car Park',
      location_name: 'A Car Park',
      area: 100,
    } as CreateLocationDto;
    jest.spyOn(service, 'create').mockResolvedValue(locationData as any);

    expect(await controller.create(locationData)).toEqual(locationData);
    expect(service.create).toHaveBeenCalledWith(locationData);
  });

  it('should find all locations', async () => {
    const result = [{ name: 'Car Park' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a location by id', async () => {
    const location = { id: 1, name: 'Car Park' };
    jest.spyOn(service, 'findOne').mockResolvedValue(location as any);

    expect(await controller.findOne(1)).toEqual(location);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
