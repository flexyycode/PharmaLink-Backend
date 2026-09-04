import { Injectable } from "@nestjs/common";  
import { PrismaService } from "src/prisma/prisma.service"; 
import { CreateInventoryDto } from "./dto/create-inventory.dto"; 
import { UpdateInventoryDto } from "./dto/update-inventory.dto";


@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) {}

    private getStockStatus(quantity: number): string {
        if (quantity === 0) return 'OUT_OF_STOCK';
        if (quantity <= 10) return 'LOW_STOCK'; // confirm this threshold with yourself
        return 'IN_STOCK';
    }

    async create(pharmacyId: string, dto: CreateInventoryDto) {
        const item = await this.prisma.inventory.create({
            data: {
                ...dto,
                expiryDate: new Date(dto.expiryDate),
                pharmacyId,
            },
        });
        return { ...item, stockStatus: this.getStockStatus(item.quantity) };
    }

    async findAll(pharmacyId: string) {
        const items = await this.prisma.inventory.findMany({
            where: { pharmacyId },
            orderBy: { createdAt: 'desc' },
        });
        return items.map((item) => ({ ...item, stockStatus: this.getStockStatus(item.quantity) }));
    }

    async findOne(pharmacyId: string, id: string) {
        const item = await this.prisma.inventory.findFirst({
            where: { id, pharmacyId },
        });
        if (!item) return null;
        return { ...item, stockStatus: this.getStockStatus(item.quantity) };
    }

    async update(pharmacyId: string, id: string, dto: UpdateInventoryDto) {
        const existing = await this.prisma.inventory.findFirst({
            where: { id, pharmacyId },
        });
        if (!existing) return null;

        const updated = await this.prisma.inventory.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.expiryDate ? { expiryDate: new Date(dto.expiryDate) } : {}),
            },
        });
        return { ...updated, stockStatus: this.getStockStatus(updated.quantity) };
    }

    async remove(pharmacyId: string, id: string) {
        const existing = await this.prisma.inventory.findFirst({
            where: { id, pharmacyId },
        });
        if (!existing) return null;

        return this.prisma.inventory.delete({
            where: { id },
        });
    }
}