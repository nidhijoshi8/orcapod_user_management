import { Injectable ,NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  // private users = [
  //   {
  //     "id": 1,
  //     "name": "Leanne",
  //     "email": "leanne@gmail.com",
  //     "role": "ADMIN"
  //   }, {
  //     "id": 2,
  //     "name": "John",
  //     "email": "John@gmail.com",
  //     "role": "INTERN"
  //   }, {
  //     "id": 3,
  //     "name": "Adam",
  //     "email": "adam@gmail.com",
  //     "role": "ENGINEER"
  //   },
  //   {
  //     "id": 4,
  //     "name": "Jasica",
  //     "email": "jasica@gmail.com",
  //     "role": "ENGINEER"
  //   }
  // ]
  constructor(private readonly databaseService: DatabaseService) { }


  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  findAll() {
   
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({where: {id}});
    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    return user;
  }

  async find(username: string) {
    if (!username) {
      throw new Error('Username must be provided');
    }
    const user = await this.databaseService.user.findUnique({where : {username}});
    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    return user;
  }

  // create(user: CreateUserDto) {
  //   const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
  //   const newId = (userByHighestId[0].id + 1);
  //   const newUser = { id: newId, ...user };
  //   this.users.push(newUser);
  //   return newUser;
  // }


  update(id: number, updatedUser: Prisma.UserUpdateInput) {
    // this.users = this.users.map(user => {
    //   if (user.id === id) {
    //     return { ...user, ...updatedUser }
    //   }
    //   return user
    // })

    return this.databaseService.user.update({
      where: { id }, data: updatedUser
    });   

  }


  delete(id: number) {
  
    return this.databaseService.user.delete({ where: { id } });
  }

}
