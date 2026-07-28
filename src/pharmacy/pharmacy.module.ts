import { Module } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { PharmacyController } from './pharmacy.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({ 
  imports: [PrismaModule], 
  providers: [PharmacyService],
  controllers: [PharmacyController]
})
export class PharmacyModule {}
