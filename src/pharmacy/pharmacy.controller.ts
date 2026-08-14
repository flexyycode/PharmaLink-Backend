import { Controller, Post, Body, Get, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto'; 
import { PharmacyService } from './pharmacy.service';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('pharmacy')
export class PharmacyController { 
    constructor(private readonly pharmacyService: PharmacyService) {} 

    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Roles('SUPER_ADMIN')
    @Post() 
    create(@Body() createPharmacyDto: CreatePharmacyDto) {
        return this.pharmacyService.create(createPharmacyDto); 
    } 

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPER_ADMIN')
    @Get() 
    findAll() {
        return this.pharmacyService.findAll(); 
    }  

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPER_ADMIN')
    @Get(':id') 
    findOne(@Param('id') id: string) {
        return this.pharmacyService.findOne(id); 
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPER_ADMIN')
    @Delete(':id') 
    remove(@Param('id') id:string) {
        return this.pharmacyService.remove(id); 
    } 

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('SUPER_ADMIN')
    @Patch(':id') 
    update (
        @Param('id') id: string, 
        @Body() updatePharmacyDto: UpdatePharmacyDto, 
    ) {
        return this.pharmacyService.update(id, updatePharmacyDto); 
    }

} 

