import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'; 
import { JwtAuthGuard } from './jwt-auth.guard';
import { Get, Body } from '@nestjs/common'; 
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
 
@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {} 

    @Post('login')
    @HttpCode(HttpStatus.OK) 
    login(@Body () dto: LoginDto) {
        return this.authService.login(dto.email, dto.password); 
    } 

    @UseGuards(JwtAuthGuard) 
    @Get('profile') 
    getProfile(@Req() req) { 
        console.log('Request user:', req.user); 
    return req.user; 
    }
}
