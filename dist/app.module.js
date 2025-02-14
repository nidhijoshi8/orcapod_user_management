"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const database_module_1 = require("./database/database.module");
const employees_module_1 = require("./employees/employees.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const mylogger_module_1 = require("./mylogger/mylogger.module");
const logger_middleware_1 = require("./logger.middleware");
const funMid_middleware_1 = require("./funMid.middleware");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware, funMid_middleware_1.logger)
            .forRoutes({ path: 'employees', method: common_1.RequestMethod.GET });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            employees_module_1.EmployeesModule,
            throttler_1.ThrottlerModule.forRoot([{
                    name: "short",
                    ttl: 1000,
                    limit: 3
                },
                {
                    name: "long",
                    ttl: 60000,
                    limit: 100
                }
            ]),
            mylogger_module_1.MyloggerModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map