import { Command } from 'commander';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { LocationSeeder } from './location.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const locationSeeder = app.get(LocationSeeder);

  const program = new Command();

  program.version('1.0.0').description('Database seeder CLI');

  program
    .command('seed')
    .description('Seed all data')
    .action(async () => {
      try {
        await locationSeeder.seed();
        console.log('Seeding completed successfully');
      } catch (error) {
        console.error('Seeding failed:', error);
      } finally {
        await app.close();
      }
    });

  program
    .command('seed:locations')
    .description('Seed locations only')
    .action(async () => {
      try {
        await locationSeeder.seed();
        console.log('Location seeding completed');
      } catch (error) {
        console.error('Location seeding failed:', error);
      } finally {
        await app.close();
      }
    });

  program.parse(process.argv);
}

bootstrap();
