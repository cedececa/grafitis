import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { PublicacionService } from 'src/services/publicacion/publicacion.service'
import { ComentarioModule } from '../comentario/comentario.module'
import { PublicacionController } from './publicacion.controller'

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionEntity]), ComentarioModule],
  controllers: [PublicacionController],
  providers: [PublicacionService],
  exports: [PublicacionService],
})
export class PublicacionModule {}
