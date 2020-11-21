import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { ContenedorPila } from './contenedor-pila.interface'
import { ContenedorRopa } from './contenedor-ropa.interface'
const jsonQuery = require('json-query')

const baseContenedorPila =
  'https://datosabiertos.malaga.eu/recursos/ambiente/contenedores/da_medioAmbiente_contenedoresPilas-25830.geojson'
const baseContenedorRopa =
  'https://datosabiertos.malaga.eu/recursos/ambiente/contenedores/da_medioAmbiente_contenedoresRopa-25830.geojson'
@Injectable()
export class ExternalServicesService {
  private contenedoresPilas: ContenedorPila[]
  private contenedoresRopa: ContenedorRopa[]

  constructor(private readonly httpService: HttpService) {}
  onModuleInit() {
    this.getContendoresPilas() // inicializar datos abiertos
    this.getContendoresRopa()

    setInterval(() => {
      //se actualiza el dato cada 5 minutos despues
      const date = new Date()
      console.log(
        date.toLocaleDateString() +
          date.toLocaleTimeString() +
          'log: actualizando los datos abiertos',
      )
      this.getContendoresPilas()
      this.getContendoresRopa()
    }, 1000 * 60 * 5)
  }
  private getResult(keys, dataArray) {
    const result = []
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      result.push(dataArray[key])
    }
    return result
  }

  pilasSearchByFID(fid: string) {
    return this.searchByFID(fid, this.contenedoresPilas)
  }
  ropaSearchByFID(fid: string) {
    return this.searchByFID(fid, this.contenedoresRopa)
  }
  private searchByFID(fid: string, contenedores) {
    const d = {
      contenedores: contenedores,
    }
    const keys = jsonQuery(`contenedores[*id=${fid}]`, {
      data: d,
      allowRegexp: true,
    }).key
    return this.getResult(keys, contenedores)
  }

  pilasSearchByNombre(nombre: string) {
    return this.searchByNombre(nombre, this.contenedoresPilas)
  }
  ropaSearchByNombre(nombre: string) {
    return this.searchByNombre(nombre, this.contenedoresRopa)
  }
  private searchByNombre(nombre: string, contenedores) {
    const d = {
      contenedores: contenedores,
    }
    const keys = jsonQuery(`contenedores.properties[*NOMBRE~/${nombre}/]`, {
      data: d,
      allowRegexp: true,
    }).key
    return this.getResult(keys, contenedores)
  }

  pilasGetGeometrys() {
    return this.getGeometrys(this.contenedoresPilas)
  }
  ropaGetGeometrys() {
    return this.getGeometrys(this.contenedoresRopa)
  }
  private getGeometrys(contenedores) {
    const result = []
    for (let index = 0; index < contenedores.length; index++) {
      const contenedorPila = contenedores[index]
      result.push({
        geometry: contenedorPila.geometry,
        id: contenedorPila.id,
      })
    }
    return result
  }

  private async getContendoresPilas() {
    const data = await this.requestJSON(baseContenedorPila)
    this.contenedoresPilas = data.features
  }
  private async getContendoresRopa() {
    const data = await this.requestJSON(baseContenedorRopa)
    this.contenedoresRopa = data.features
  }
  private async requestJSON(URL: string) {
    return await this.httpService
      .request({
        method: 'get',
        url: URL,
      })
      .pipe(map((response) => response.data))
      .toPromise()
  }
}
