export interface ContenedorPila {
  geometry: {
    type: string
    coordinates: [number, number, number]
  }
  geometry_name: string
  type: string
  properties: {
    TITULARIDAD: string
    URL: string
    PRECIOS: string
    DIRECCION: string
    ACCESOPMR: string
    INFOESP: [
      {
        Contenedor_interior: string
      },
    ]
    TARJETAJOVEN: string
    NOMBRE: string
    DESCRIPCION: string
    HORARIOS: string
    CONTACTO: string
    EMAIL: string
    ID: number
  }
  id: string
}
