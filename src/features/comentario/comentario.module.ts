import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComentarioEntity } from 'src/entities/comentario.entity'
import { ComentarioService } from 'src/services/comentario/comentario.service'
import { ComentarioController } from './comentario.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ComentarioEntity])],
  controllers: [ComentarioController],
  providers: [ComentarioService],
  exports: [ComentarioService],
})
export class ComentarioModule {}
