import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import * as nodemailer from 'nodemailer'
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PaymentModule],
  providers: [NotificationsService, nodemailer],
  exports: [NotificationsService],
})
export class NotificationsModule {}
