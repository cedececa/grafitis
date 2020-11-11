import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PublicacionEntity } from './publicacion.entity'
import { UsuarioEntity } from './usuario.entity'

@Entity('comentario')
export class ComentarioEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  contenido: string

  @ManyToOne((type) => UsuarioEntity, (u) => u.comentarios, {
    nullable: true,
  })
  usuario: UsuarioEntity

  @ManyToOne((type) => PublicacionEntity, (p) => p.comentarios, {
    nullable: true,
  })
  publicacion: PublicacionEntity
}
