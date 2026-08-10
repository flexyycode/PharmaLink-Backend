import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { SubscriptionDuration, SubscriptionType } from 'generated/prisma/enums';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { NotFoundException } from '@nestjs/common'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class PharmacyService {
    constructor(private prisma: PrismaService) {} 
    private addFullAddress(pharmacy: any) {
        return {
            ...pharmacy, 
            fullAddress: `${pharmacy.street}, ${pharmacy.city}, ${pharmacy.state}`,
        }; 
    }
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

        const hashedPassword = await bcrypt.hash(createPharmacyDto.password, 10); 

        const pharmacy = await this.prisma.pharmacy.create({
            data: {
                ...createPharmacyDto, 
                password: hashedPassword,
                startDate, 
                expiryDate,  
            },

            select: {
                id: true,
                name: true, 
                licenseId: true,
                contactEmail: true, 
                phone: true,
                street: true, 
                city: true, 
                state: true, 
                subscriptionType: true, 
                duration: true, 
                startDate: true, 
                expiryDate: true,
                createdAt: true,    
                updatedAt: true,
            }
          }) 
        return this.addFullAddress(pharmacy); 
    } 

    async findAll() { 
        const pharmacies = await this.prisma.pharmacy.findMany ({
            orderBy: {
                createdAt: "desc", 
            }
        })
        return pharmacies.map((pharmacy) => this.addFullAddress(pharmacy)) 
    } 

    async findOne(identifier: string) {
        const pharmacy = await this.prisma.pharmacy.findFirst ({
            where: { 
                OR: [
                    {id: identifier}, 
                    {name: identifier}
                ]
            }
        }) 
        if (!pharmacy) {
            throw new NotFoundException("Sorry Pharmacy not available") 
        }
        return this.addFullAddress(pharmacy)
    }

    async remove(id: string) {
        return this.prisma.pharmacy.delete({
            where: {
                id,
            }, 
        });
    } 

    async update(id: string, updatePharmacyDto: UpdatePharmacyDto) {
        const pharmacy = await this.prisma.pharmacy.update ({
            where : {
                id, 
            }, 
            data: updatePharmacyDto,
        }); 
        return this.addFullAddress(pharmacy); 
    }
} 
