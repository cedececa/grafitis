import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ResponseHandler } from 'src/common/response.handler'
import { FotoService } from './foto.service'
@Controller('foto')
export class FotoController {
  constructor(private fotoService: FotoService) {}

  @Post('')
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
