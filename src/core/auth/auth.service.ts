import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsuarioEntity } from 'src/entities/usuario.entity'
import { UsuarioService } from 'src/services/usuario/usuario.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuarioService) private readonly userService: UsuarioService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: UsuarioEntity = await this.userService.findOneByEmail(email)
    if (user && user.password === pass) {
      const {
        password,
        createdAt,
        updatedAt,
        ...result // descompone user (el objeto json) en varias variables
      } = user
      return result // devolvemos lo que necesitamos
    } /*  else if (user.password != pass) {
      ResponseHandler.HttpException(
        null,
        'password incorrect',
        HttpStatus.UNAUTHORIZED,
      )
    } */
    return null
  }
  login(user: any) {
    // TODO - disable multi tokens for one user
    const payload = user
    return {
      accessToken: this.createToken(payload),
    }
  }
  private createToken(payload: { email: string }): string {
    return this.jwtService.sign(payload)
  }
}
