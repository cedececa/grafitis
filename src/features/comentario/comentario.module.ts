import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComentarioEntity } from 'src/entities/comentario.entity'
import { ComentarioService } from 'src/services/comentario/comentario.service'
import { PublicacionModule } from '../publicacion/publicacion.module'
import { UsuarioModule } from '../usuario/usuario.module'
import { ComentarioController } from './comentario.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([ComentarioEntity]),
    PublicacionModule,
    UsuarioModule,
  ],
  controllers: [ComentarioController],
  providers: [ComentarioService],
  exports: [ComentarioService],
})
export class ComentarioModule {}
