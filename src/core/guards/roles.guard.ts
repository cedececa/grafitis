import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UsuarioRole } from 'src/entities/usuario-role.enum'
import { UsuarioTipo } from 'src/entities/usuario-tipo.enum'
import { UsuarioEntity } from 'src/entities/usuario.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) {
      return true
    }

    // 通过反射获取请求路由是否添加了 @Roles() 注解，如果没有添加，则代表不需要进行认证
    const roles = this.reflector.get<string>('roles', context.getHandler())

    // 在请求对象中获取 user 对象，此 user 对象是 AuthStrategy 中 validate 方法成功执行后的返回值
    const request = context.switchToHttp().getRequest()
    const user: UsuarioEntity = request.user
    if (!roles && user) {
      // si no especificamos role en un servicio Rest, este servicio es de ADMIN
      return user.role == UsuarioRole.Admin
    } else if (roles && user) {
      return user.role == UsuarioRole.Admin || user.role == UsuarioRole.User
    } else {
      return false
    }
  }
}
