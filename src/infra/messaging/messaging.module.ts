import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases.proxy.module';
import { ProductController } from './rabbitmq/controllers/product.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [ProductController],
})
export class MessagingModule {}
