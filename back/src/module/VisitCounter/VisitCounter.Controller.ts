import { Controller, Post, Get, Body } from '@nestjs/common';
import { VisitCounterService } from './VisitCounter.Service'; 

@Controller('visits')
export class VisitCounterController {
  constructor(private readonly visitCounterService: VisitCounterService) {}

  @Get()
  async getVisits() {
    const visits = await this.visitCounterService.getAllVisits();
    return visits;
  }

  @Get('total')
  async getTotalVisits(): Promise<{ total: number }> {
    const total = await this.visitCounterService.getTotalVisitCount();
    return { total };
  }

  @Post()
  async storeVisit(@Body() body: { ip: string }): Promise<void> {
    await this.visitCounterService.storeVisitIp(body.ip);
  }
}
