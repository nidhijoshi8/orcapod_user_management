import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly employeesService;
    private readonly userService;
    private readonly jwtService;
    constructor(employeesService: EmployeesService, userService: UsersService, jwtService: JwtService);
    signIn(username: string, password: string): Promise<any>;
}
