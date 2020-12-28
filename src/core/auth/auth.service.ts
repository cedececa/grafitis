import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsuarioRole } from 'src/entities/usuario-role.enum'
import { UsuarioTipo } from 'src/entities/usuario-tipo.enum'
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

  async googleLogin(req) {
    if (!req.user) {
      return null
    }

    // accesso correcto
    let userInformationDevueltoPorGoogle = {
      usuarioTipo: UsuarioTipo.Google,
      email: req.user.email,
      perfil: {
        apellido: req.user.lastName,
        nombre: req.user.firstName,
        avatarUrl: req.user.picture,
      },
      role: UsuarioRole.User,
    }

    let user = await this.userService.findOneByEmail(
      userInformationDevueltoPorGoogle.email,
    )
    // update or crear un user con el email devuelto por google
    if (!user) {
      await this.userService.save(
        userInformationDevueltoPorGoogle as UsuarioEntity,
      )
      user = await this.userService.findOneByEmail(
        userInformationDevueltoPorGoogle.email,
      )
    }

    const {
      password,
      createdAt,
      updatedAt,
      ...result // descompone user (el objeto json) en varias variables
    } = user

    const payload = result
    const token = this.createToken(payload)
    //console.log(token)
    //console.log(payload)

    return token
  }
}
