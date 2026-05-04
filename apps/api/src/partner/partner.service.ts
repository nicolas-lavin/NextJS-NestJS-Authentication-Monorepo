import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreatePartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      const partner = await prisma.partner.create({
        data: {
          ...createPartnerDto,
        },
      });
      const partnerStatusHistory = await prisma.partnerStatusHistory.create({
        data: {
          status: 'ACTIVE',
          partnerId: partner.id,
        },
      });
      const partnerPaymentInstallment =
        await prisma.partnerPaymentInstallment.create({
          data: {
            amount: 3000,
            dueDate: new Date(),
            partnerId: partner.id,
            payPeriod: 'MONTHLY',
            paid: false,
          },
        });
      return {
        ...partner,
        statusHistory: partnerStatusHistory,
        paymentInstallment: partnerPaymentInstallment,
      };
    });

    return transaction;
  }

  async findByEmail(email: string) {
    return await this.prisma.partner.findFirst({
      where: {
        email,
      },
    });
  }

  async findOne(partnerId: number) {
    return await this.prisma.partner.findUnique({
      where: {
        id: partnerId,
      },
    });
  }

  async findAll() {
    try {
      const partners = await this.prisma.partner.findMany();
      const response = partners.map(async (partner) => {
        const status = await this.prisma.partnerStatusHistory.findFirst({
          where: {
            partnerId: partner.id,
          },
          orderBy: {
            id: 'desc',
          },
        });

        console.log('status: ', status);

        return {
          ...partner,
          status: status.status,
        };
      });
      const resolvedResponse = await Promise.all(response);
      console.log('PARTNERS: ', resolvedResponse);
      return resolvedResponse;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  }
}
