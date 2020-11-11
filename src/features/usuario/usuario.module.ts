import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { UsuarioService } from 'src/services/usuario/usuario.service'
import { UsuarioController } from './usuario.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
