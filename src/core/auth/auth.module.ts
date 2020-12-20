import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { UsuarioModule } from 'src/features/usuario/usuario.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { jwtConstants } from './jwt.constants'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
     }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      // enable Jwt like global guard
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService], // 导出 AuthServie 供 UserModule 使用
})
export class AuthModule {}
