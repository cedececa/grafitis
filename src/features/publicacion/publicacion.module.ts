import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { PublicacionService } from 'src/services/publicacion/publicacion.service'
import { PublicacionController } from './publicacion.controller'

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionEntity])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
  exports: [PublicacionService],
})
export class PublicacionModule {}
