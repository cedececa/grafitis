import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ResponseHandler } from 'src/common/response.handler'
import { Roles } from 'src/core/decorators/roles.decorator'
import { UsuarioRole } from 'src/entities/usuario-role.enum'
import { FotoService } from './foto.service'
@Controller('foto')
export class FotoController {

  @Post('')
  @Roles(UsuarioRole.User)
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './images-uploaded',
    }),
  )
  uploadFile(@UploadedFile() file) {
    return ResponseHandler.JSON(
      {
        name: file.filename,
      },
      '',
      HttpStatus.CREATED,
    )
  }
}
