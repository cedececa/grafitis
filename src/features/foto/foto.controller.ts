import { Controller, Inject } from '@nestjs/common'
import { FotoEntity } from 'src/entities/foto.entity'
import { FotoService } from 'src/services/foto/foto.service'
import { CommonController } from '../common.controller'

const name = 'Foto'
@Controller(name)
export class FotoController extends CommonController<FotoEntity, FotoService> {
  constructor(@Inject(FotoService) private fotoService: FotoService) {
    super(fotoService, name)
  }
}
