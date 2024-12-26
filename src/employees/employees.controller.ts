import { Controller, Get, Post, Body, Patch, Param, Delete ,Query, } from '@nestjs/common';
import { EmployeesService } from './employees.service';


import { Prisma } from '@prisma/client';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

 // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

 // @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('role') role? : 'INTERN' | 'ADMIN' | 'ENGINEER' ) {
    return this.employeesService.findAll(role);
  }

  //@UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

 // @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

 // @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
