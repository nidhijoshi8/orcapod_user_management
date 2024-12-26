import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyloggerModule } from './mylogger/mylogger.module';
import { LoggerMiddleware } from './logger.middleware';
import {logger} from './funMid.middleware'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name: "short",
      ttl: 1000, //ms
      limit: 3 //no of requests 
    },
    {
      name: "long",
      ttl: 60000, //1 min
      limit: 100 //no of requests per min from a single client can be customise
    }
    ]),
    MyloggerModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule implements NestModule {
  // for middleware implementation implements NestModule
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware,logger)
      .forRoutes({path : 'employees' , method : RequestMethod.GET});
  }
}
