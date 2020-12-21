import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ResponseHandler } from 'src/common/response.handler'
import { UsuarioRole } from 'src/entities/usuario-role.enum'
import { Public } from '../decorators/public.route.decorator'
import { Roles } from '../decorators/roles.decorator'
import { LocalAuthGuard } from '../guards/local.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = this.authService.login(req.user)
    return ResponseHandler.JSON(token)
  }

  @Get('perfil')
  @Roles(UsuarioRole.User)
  getProfile(@Request() req) {
    return ResponseHandler.JSON(req.user)
  }

  @Get('logout')
  @Roles(UsuarioRole.User)
  logout(@Request() req) {
    req.logout()
    return ResponseHandler.JSON(true, 'out', 200)
  }

  // Google
  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  async oogleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.authService.googleLogin(req)
    if (token != null) {
      return res.redirect(`http://localhost:4200/#/google-login-success/${token}`)
    } else {
      return res.redirect(`http://localhost:4200/#/google-login-failure`)
    }
    //return ResponseHandler.JSON( await this.authService.googleLogin(req))
  }
}
