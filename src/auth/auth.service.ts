import { Injectable, UnauthorizedException } from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService { 
    constructor(
    private prismaService: PrismaService, 
    private jwtService: JwtService, 
    ) {} 

    async login(email: string, password: string) {
        //Check Super Admin Credentials from env
        if (
            email === process.env.SUPER_ADMIN_EMAIL && 
            password === process.env.SUPER_ADMIN_PASSWORD
        ) {
            const payload = { email, role: 'SUPER_ADMIN' }; 
            const token = this.jwtService.sign(payload); 
            return { access_token: token, role: 'SUPER_ADMIN' };   
        } 

        //Check's Pharmacy Credentials from Database
        const pharmacy = await this.prismaService.pharmacy.findUnique({
            where: {contactEmail: email}
        })

        if (pharmacy) {
            const passwordMatch = await bcrypt.compare(password, pharmacy.password);
            if (!passwordMatch) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const payload = { sub: pharmacy.id, email: pharmacy.contactEmail, role: 'PHARMACY' };
            const token = this.jwtService.sign(payload);
            return { access_token: token, role: 'PHARMACY' };
        } 

        // Nither Super Admin nor Pharmacy credentials matched
        throw new UnauthorizedException('Invalid credentials');
    }
}
