import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from './app.logging_middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalStateProvider } from './globalState.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GlobalStateProvider],
})
export class AppModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
