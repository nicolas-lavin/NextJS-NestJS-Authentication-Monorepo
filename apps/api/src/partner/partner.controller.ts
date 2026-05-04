import { Controller, Post, Body, Get } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Roles } from '@src/auth/decorators/role.decorator';
import { CreatePartnerDto } from './dto/partner.dto';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}
  @Roles('ADMIN')
  @Post()
  createPartner(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
  }

  @Roles('ADMIN')
  @Get('all')
  getAllPartners() {
    return this.partnerService.findAll();
  }
}
