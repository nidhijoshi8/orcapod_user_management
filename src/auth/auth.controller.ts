import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post()
  async signIn(@Body('username') username: string,
    @Body('password') password: string) {
    console.log("signing in ");
    return this.authService.signIn(username,password);
  }

}
