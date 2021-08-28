// Main.ts bao gồm một hàm không đồng bộ, sẽ khởi động ứng dụng của chúng tôi
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
