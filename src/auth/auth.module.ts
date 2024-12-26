import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'mySecretKeyForTesting', // Use a strong, environment-specific key
      signOptions: { expiresIn: '1h' }, // Token expiry
    }),
    UsersModule,
    EmployeesModule,
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
