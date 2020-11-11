import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ValoracionEntity } from 'src/entities/valoracion.entity'
import { ValoracionService } from 'src/services/valoracion/valoracion.service'
import { ValoracionController } from './valoracion.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ValoracionEntity])],
  controllers: [ValoracionController],
  providers: [ValoracionService],
  exports: [ValoracionService],
})
export class ValoracionModule {}
