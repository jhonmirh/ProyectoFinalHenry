import { Injectable } from '@nestjs/common';
import { VisitCounterRepository } from './VisitCounterRepository';

@Injectable()
export class VisitCounterService {
  constructor(private readonly visitCounterRepository: VisitCounterRepository) {}

  async getAllVisits() {
    return await this.visitCounterRepository.find();
  }

  async incrementVisitCount(): Promise<number> {
    return this.visitCounterRepository.incrementVisitCount();
  }

  async storeVisitIp(ip: string): Promise<void> {
    const hasVisited = await this.visitCounterRepository.hasVisitedInLast24Hours(ip);

    if (!hasVisited) {
      await this.visitCounterRepository.storeVisitIp(ip);
    }
  }

  async getTotalVisitCount(): Promise<number> {
    return this.visitCounterRepository.getTotalVisitCount();
  }

  async hasVisitedInLast24Hours(ip: string): Promise<boolean> {
    return this.visitCounterRepository.hasVisitedInLast24Hours(ip);
  }
}
