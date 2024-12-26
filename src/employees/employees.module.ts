import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeesService],
  imports : [DatabaseModule],
  exports : [EmployeesService]

})
export class EmployeesModule {}
