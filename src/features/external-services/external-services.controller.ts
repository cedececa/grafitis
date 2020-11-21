import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { ExternalServicesService } from 'src/services/external-services/external-services.service'

@Controller('external-services')
export class ExternalServicesController {
  constructor(
    @Inject(ExternalServicesService)
    private externalService: ExternalServicesService,
  ) {}
  @Get('/contenedor-pila')
  getContendoresPilas(@Query('nombre') nombre: string) {
    const data = this.externalService.pilasSearchByNombre(nombre)
    return {
      code: 200,
      messaje: '',
      succeed: data ? true : false,
      searchKey: 'nombre',
      searchValue: nombre,
      count: data && data.length,
      data: data,
    }
  }

  @Get('/contenedor-pila/geometrys')
  getContenedoresPilaGeometrys() {
    const data = this.externalService.pilasGetGeometrys()
    return {
      code: 200,
      messaje: '',
      succeed: data ? true : false,
      count: data && data.length,
      data: data,
    }
  }
  @Get('/contenedor-pila/:fid')
  getContendorPilaByFID(@Param('fid') fid: string) {
    const data = this.externalService.pilasSearchByFID(fid)
    return {
      code: 200,
      messaje: '',
      succeed: data ? true : false,
      searchKey: 'fid',
      searchValue: fid,
      data: data,
    }
  }

  @Get('/contenedor-ropa')
  getContendoresRopa(@Query('nombre') nombre: string) {
    const data = this.externalService.ropaSearchByNombre(nombre)
    return {
      code: 200,
      messaje: '',
      succeed: data ? true : false,
      searchKey: 'nombre',
      searchValue: nombre,
      count: data && data.length,
      data: data,
    }
  }

  @Get('/contenedor-ropa/geometrys')
  getContenedoresRopaGeometrys() {
    const data = this.externalService.ropaGetGeometrys()
    return {
      code: 200,
      messaje: '',
      succeed: data ? true : false,
      count: data && data.length,
      data: data,
    }
  }
  @Get('/contenedor-ropa/:fid')
  getContendorRopaByFID(@Param('fid') fid: string) {
    const data = this.externalService.ropaSearchByFID(fid)
    return {
      code: 200,
      messaje: '',
      succeed: data ? true : false,
      searchKey: 'fid',
      searchValue: fid,
      data: data,
    }
  }
}
