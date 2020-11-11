import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { ComentarioModule } from './features/comentario/comentario.module'
import { UsuarioModule } from './features/usuario/usuario.module'
import { FotoModule } from './features/foto/foto.module'
import { PerfilModule } from './features/perfil/perfil.module'
import { PublicacionModule } from './features/publicacion/publicacion.module'
import { ValoracionModule } from './features/valoracion/valoracion.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '92.38.171.129',
      port: 3306,
      username: 'root',
      password: 'Zx171260225!',
      database: 'grafitis',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }),
    UsuarioModule,
    FotoModule,
    PerfilModule,
    PublicacionModule,
    ValoracionModule,
    ComentarioModule,
  ],
  /*   controllers: [UsuarioController],
    providers: [
    UsuarioService,
    ComentarioService,
    PublicacionService,
    ValoracionService,
    FotoService,
    PerfilService,
  ],  */
})
export class AppModule {}
