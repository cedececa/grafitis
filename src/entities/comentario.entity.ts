import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'
import { PublicacionEntity } from './publicacion.entity'
import { UsuarioEntity } from './usuario.entity'

@Entity('comentario')
export class ComentarioEntity extends CommonEntity {
  @Column({ nullable: true, length:1000})
  contenido: string

  @ManyToOne(() => UsuarioEntity, (u) => u.comentarios, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  usuario: UsuarioEntity

  @ManyToOne(() => PublicacionEntity, (p) => p.comentarios, {
    nullable: true,
  })
  publicacion: PublicacionEntity
}
