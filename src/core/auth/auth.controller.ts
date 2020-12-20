import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ResponseHandler } from 'src/common/response.handler'
import { Public } from '../decorators/public.route.decorator'
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
  getProfile(@Request() req) {
    return ResponseHandler.JSON(req.user)
  }

  @Get('logout')
  logout(@Request() req) {
    req.logout()
    return ResponseHandler.JSON(true, 'out', 200)
  }
}
