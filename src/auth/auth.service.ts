import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {EmployeesService} from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    
    private readonly employeesService : EmployeesService,
    private readonly userService : UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(username: string, password: string): Promise<any> {
    console.log(" in auth controller" , username)
    const user = await this.userService.find(username);
    console.log ("user  : " ,user) 
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    // Create payload for the JWT
    const payload = { username: user.username, sub: user.id };

    // Generate a JWT token
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken, // Send the JWT token
    };
  }
}
