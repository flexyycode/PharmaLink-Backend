import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PHARMACY')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Post()
    create(@Req() req, @Body() dto: CreateInventoryDto) {
        return this.inventoryService.create(req.user.id, dto);
    }

    @Get()
    findAll(@Req() req) {
        return this.inventoryService.findAll(req.user.id);
    }

    @Get(':id')
    async findOne(@Req() req, @Param('id') id: string) {
        const item = await this.inventoryService.findOne(req.user.id, id);
        if (!item) throw new NotFoundException('Inventory item not found');
        return item;
    }

    @Patch(':id')
    async update(@Req() req, @Param('id') id: string, @Body() dto: UpdateInventoryDto) {
        const updated = await this.inventoryService.update(req.user.id, id, dto);
        if (!updated) throw new NotFoundException('Inventory item not found');
        return updated;
    }

    @Delete(':id')
    async remove(@Req() req, @Param('id') id: string) {
        const removed = await this.inventoryService.remove(req.user.id, id);
        if (!removed) throw new NotFoundException('Inventory item not found');
        return removed;
    }
}