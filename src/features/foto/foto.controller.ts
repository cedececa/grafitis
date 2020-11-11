import { Controller, Inject } from '@nestjs/common'
import { FotoEntity } from 'src/entities/Foto.entity'
import { FotoService } from 'src/services/Foto/Foto.service'
import { CommonController } from '../common.controller'

const name = 'Foto'
@Controller(name)
export class FotoController extends CommonController<FotoEntity, FotoService> {
  constructor(@Inject(FotoService) service: FotoService) {
    super(service, name)
  }
}
