import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { UsuarioService } from 'src/services/usuario/usuario.service'
import { UsuarioController } from './usuario.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, PublicacionEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
