import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto'; 
import { PharmacyService } from './pharmacy.service';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Controller('pharmacy')
export class PharmacyController { 
    constructor(private readonly pharmacyService: PharmacyService) {}

    @Post() 
    create(@Body() createPharmacyDto: CreatePharmacyDto) {
        return this.pharmacyService.create(createPharmacyDto); 
    } 

    @Get() 
    findAll() {
        return this.pharmacyService.findAll(); 
    }  

    @Get(':id') 
    findOne(@Param('id') id: string) {
        return this.pharmacyService.findOne(id); 
    }

    @Delete(':id') 
    remove(@Param('id') id:string) {
        return this.pharmacyService.remove(id); 
    } 

    @Patch(':id') 
    update (
        @Param('id') id: string, 
        @Body() updatePharmacyDto: UpdatePharmacyDto, 
    ) {
        return this.pharmacyService.update(id, updatePharmacyDto); 
    }

} 

