import { HttpModule, Module } from '@nestjs/common'
import { ComentarioModule } from './features/comentario/comentario.module'
import { UsuarioModule } from './features/usuario/usuario.module'
import { FotoModule } from './features/foto/foto.module'
import { PerfilModule } from './features/perfil/perfil.module'
import { PublicacionModule } from './features/publicacion/publicacion.module'
import { ValoracionModule } from './features/valoracion/valoracion.module'
import { ExternalServicesModule } from './features/external-services/external-services.module'
import DatabaseORM from './database'
@Module({
  imports: [
    DatabaseORM,
    UsuarioModule,
    FotoModule,
    PerfilModule,
    PublicacionModule,
    ValoracionModule,
    ComentarioModule,
    ExternalServicesModule,
  ],
})
export class AppModule {}
