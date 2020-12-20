import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ResponseHandler } from 'src/common/response.handler'
import { HttpStatus, Injectable } from '@nestjs/common'

// Este es para autenticacion
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }) // 设置为你自己想用的字段
  }

  /* 
  我们可以在调用中传递一个选项对象super()以自定义护照策略的行为。在此示例中，
  默认情况下，本地护照策略在请求正文中期望包含username和属性password。
  传递一个选项对象以指定不同的属性名称，例如：super({ usernameField: 'email' })。
  有关更多信息，请参见Passport文档。 */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      ResponseHandler.HttpException(
        null,
        'no autorizado',
        HttpStatus.UNAUTHORIZED,
      )
    }
    return user // lo insertamos a req
  }
}
