import { Module } from '@nestjs/common'
import { ComentarioModule } from './features/comentario/comentario.module'
import { UsuarioModule } from './features/usuario/usuario.module'
import { PerfilModule } from './features/perfil/perfil.module'
import { PublicacionModule } from './features/publicacion/publicacion.module'
import { ValoracionModule } from './features/valoracion/valoracion.module'
import { ExternalServicesModule } from './features/external-services/external-services.module'
import DatabaseORM from './database'
import { FotoModule } from './features/foto/foto.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './core/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './core/guards/roles.guard'
@Module({
  imports: [
    DatabaseORM,
    UsuarioModule,
    PerfilModule,
    PublicacionModule,
    ValoracionModule,
    ComentarioModule,
    ExternalServicesModule,
    FotoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images-uploaded'),
    }),
    AuthModule,
  ],

})
export class AppModule {}
