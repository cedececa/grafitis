import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FotoEntity } from 'src/entities/foto.entity'
import { FotoService } from 'src/services/foto/foto.service'
import { FotoController } from './foto.controller'

@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity])],
  controllers: [FotoController],
  providers: [FotoService],
  exports: [FotoService],
})
export class FotoModule {}
