import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './module/files/files.module';
import { RoomsModule } from './module/create-room/rooms.module';
import { ReservationsModule } from './module/reservations/reservations.module';
import { UsersModule } from './module/users/users.module'; 
import { RolesModule } from './module/roles/roles.module'; 
import { PaymentModule} from './module/payment/payment.module';
import { EmployeeModule } from './module/employee/employee.module';
import { TestimonialsModule } from './module/testimonials/testimonials.module'; // Importa el módulo de testimonios
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { VisitCounterModule } from './module/VisitCounter/visit-counter.module';
import { SchedulerModule } from './module/Scheduler/scheduler.module';


@Module({
  imports: [
    SchedulerModule,
    AuthModule,
    FilesModule,
    RoomsModule,
    ReservationsModule,
    UsersModule,
    RolesModule,
    PaymentModule,
    VisitCounterModule,
    TestimonialsModule, // Registra el módulo de testimonios
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
      secret: process.env.JWT_SECRET,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (Config: ConfigService) => Config.get('typeorm'),
    }),

    EmployeeModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
