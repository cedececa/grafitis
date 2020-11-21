export interface ContenedorRopa {
  type: string
  id: string

  geometry: {
    type: string
    coordinates: [number, number, number]
  }
  geometry_name: string
  properties: {
    ID: number
    NOMBRE: string
    DESCRIPCION: string
    DIRECCION: string
    URL: string
    EMAIL: string
    CONTACTO: string
    HORARIOS: string
    PRECIOS: string
    TITULARIDAD: string
    TARJETAJOVEN: string
    ACCESOPMR: string
    INFOESP: {
      Contenedor_interior: string
    }
  }
}
