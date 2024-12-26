import { HttpAdapterHost, NestFactory,Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/guards/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Apply JwtAuthGuard globally
  const jwtService = app.get(JwtService); // Get JwtService instance
  const reflector = app.get(Reflector);;
  app.useGlobalGuards(new AuthGuard(jwtService,reflector));

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors();
  //await app.listen(3000, '127.0.0.1'); //process.env.PORT ??
  const port = process.env.PORT || 8080; 
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
