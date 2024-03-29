import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CalcModule } from './calc/calc.module';
import { LogsMiddleware } from './middleware/logs.middleware';

@Module({
  imports: [CalcModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
