import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerfilEntity } from 'src/entities/perfil.entity'
import { PerfilService } from 'src/services/perfil/perfil.service'
import { PerfilController } from './perfil.controller'

@Module({
  imports: [TypeOrmModule.forFeature([PerfilEntity])],
  controllers: [PerfilController],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}
