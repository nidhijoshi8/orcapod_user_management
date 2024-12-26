"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const employees_service_1 = require("../employees/employees.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(employeesService, userService, jwtService) {
        this.employeesService = employeesService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signIn(username, password) {
        console.log(" in auth controller", username);
        const user = await this.userService.find(username);
        console.log("user  : ", user);
        if (user?.password !== password) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map