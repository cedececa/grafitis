import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function APIsDocument(app) {
  const options = new DocumentBuilder()
    .setTitle('Grafitis APIs')
    .setDescription('Grafitis API description')
    .setVersion('1.0')
    .addTag('Grafitis')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  APIsDocument(app)
  // enable CORS
  app.use(helmet())
  app.enableCors()

  await app.listen(3000)
}
bootstrap()
