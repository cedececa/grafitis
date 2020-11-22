import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicacionEntity } from 'src/entities/publicacion.entity'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { UsuarioService } from 'src/services/usuario/usuario.service'
import { ComentarioModule } from '../comentario/comentario.module'
import { PerfilModule } from '../perfil/perfil.module'
import { ValoracionModule } from '../valoracion/valoracion.module'
import { UsuarioController } from './usuario.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, PublicacionEntity]),
    PerfilModule,
    ComentarioModule,
    ValoracionModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
