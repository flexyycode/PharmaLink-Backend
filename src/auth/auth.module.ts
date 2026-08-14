import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({ 
  imports: [
    PassportModule, 
    JwtModule.registerAsync({ 
      useFactory: () => ({
        secret: process.env.JWT_SECRET, 
        signOptions: { expiresIn: '1d' }, 
      }), 
    }), 
    PrismaModule, 
  ],   

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], 
  exports: [AuthService], 
})
export class AuthModule {}
