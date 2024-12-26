import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(createEmployeeDto: Prisma.EmployeeCreateInput): Promise<{
        email: string;
        updatedAt: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        CreatedAt: Date;
    }>;
    findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'): Promise<{
        email: string;
        updatedAt: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        CreatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        updatedAt: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        CreatedAt: Date;
    }>;
    update(id: string, updateEmployeeDto: Prisma.EmployeeUpdateInput): Promise<{
        email: string;
        updatedAt: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        CreatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        updatedAt: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        CreatedAt: Date;
    }>;
}
