import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();

    // Super admin has no subscription — skip this check entirely
    if (user.role === 'SUPER_ADMIN') return true;

    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { id: user.id },
      select: { expiryDate: true },
    });

    if (!pharmacy) throw new ForbiddenException('Pharmacy not found');

    if (new Date(pharmacy.expiryDate) < new Date()) {
      throw new ForbiddenException('Your subscription has expired. Please renew to continue.');
    }

    return true;
  }
}