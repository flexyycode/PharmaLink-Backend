import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [PrismaModule, PharmacyModule, AuthModule, InventoryModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
