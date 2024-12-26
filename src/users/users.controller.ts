/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
//import { CreateUserDto } from './dto/createUserDto';
import { Prisma } from '@prisma/client';


//npm i -g @nestjs/cli
//nest new my-nest-app

// nest generate module users
// nest generate controller users
// nest generate service users
// npm install class-validator class-transformer

//npm i prisma -D
//npx prisma init
//DATABASE_URL="postgresql://johndoe:randompassword @localhost:5432/mydb?schema=public"
// install prisma extension
// make prisma schema and run migration npx prisma migrate dev --name init
// in order to change the schema 1. npx prisma generate 2. npx prisma migrate dev --name name_change (name_change is custom, done for change in name)
// nest g module database to create database
// *** nest g resourse employees *** to create full template with controller services entity dto all.
// in main...  app.enableCors(); to enable all origin requests
// app.setGlobalPrefix('api'); this is to add the api route prfix api in all routes
// Add dependency @nestjs/throttler for rate limiting
// appling in the app.modules file,adding imports  can be overridden in the controller

// to add a new table : add model in schema.prisma
// npx prisma generate
// migrate database npx prisma migrate dev --name add_user_table


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  // GET /users or /users?role=value
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {

    const user = this.usersService.findOne(+id);
    return { user }
  }

  // // GET /users/interns
  // @Get('interns')
  // findInterns() {

  //   return this.usersService.findAll('INTERN');
  // }

  //POST /users
  @Post()
  //@UsePipes(new ZodValidationPipe(createCatSchema)) if using zod validation pipe schema
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  create(@Body() CreateUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(CreateUserDto);
  }

  //PATCH /users/:id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number,
    @Body() updatedUserDto: Prisma.UserUpdateInput) {

    return this.usersService.update(id, updatedUserDto);
  }

  //DELETE users/:id

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.delete(id);
    return { user }
  }



}
