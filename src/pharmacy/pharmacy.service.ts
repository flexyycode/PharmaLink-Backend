import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { SubscriptionDuration, SubscriptionType } from 'generated/prisma/enums';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Injectable()
export class PharmacyService {
    constructor(private prisma: PrismaService) {} 
    async create(createPharmacyDto: CreatePharmacyDto) {  
        let startDate: Date; 
        let expiryDate: Date

        if (createPharmacyDto.subscriptionType === SubscriptionType.FREE_TRIAL) {
            if (
                !createPharmacyDto.startDate || 
                !createPharmacyDto.expiryDate
            ) {
                throw new BadRequestException(
                    "Free Trial requires start and expiry date.", 
                ); 
            } 
            startDate = new Date(createPharmacyDto.startDate); 
            expiryDate = new Date(createPharmacyDto.expiryDate);  
        } else {
            if (!createPharmacyDto.duration) {
                throw new BadRequestException(
                    "Paid Subscription requires a duration."
                )
            } 

            startDate = new Date(); 
            expiryDate = new Date(startDate); 

            switch (createPharmacyDto.duration) {
                case SubscriptionDuration.ONE_MONTH: 
                expiryDate.setMonth(expiryDate.getMonth() + 1); 
                break; 

                case SubscriptionDuration.THREE_MONTHS: 
                expiryDate.setMonth(expiryDate.getMonth() + 3); 
                break; 

                case SubscriptionDuration.SIX_MONTHS: 
                expiryDate.setMonth(expiryDate.getMonth() + 6); 
                break; 

                case SubscriptionDuration.ONE_YEAR:
                expiryDate.setFullYear(expiryDate.getFullYear() + 1)
            }
        }

        return this.prisma.pharmacy.create({
            data: {
                ...createPharmacyDto,  
                startDate, 
                expiryDate,
            }
        })
    } 

    async findAll() {
        return this.prisma.pharmacy.findMany ({
            orderBy: {
                createdAt: "desc", 
            }
        })
    } 

    async findOne(id: string) {
        return this.prisma.pharmacy.findUnique ({
            where: {
                id,
            }
        })
    }

    async remove(id: string) {
        return this.prisma.pharmacy.delete({
            where: {
                id,
            }, 
        });
    } 

    async update(id: string, updatePharmacyDto: UpdatePharmacyDto) {
        return this.prisma.pharmacy.update ({
            where : {
                id, 
            }, 
            data: updatePharmacyDto,
        });
    }
} 
