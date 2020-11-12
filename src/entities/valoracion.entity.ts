import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'
import { PublicacionEntity } from './publicacion.entity'
import { UsuarioEntity } from './usuario.entity'

@Entity('valoracion')
export class ValoracionEntity extends CommonEntity {
  @Column()
  punto: number

  @ManyToOne((type) => UsuarioEntity, (usuario) => usuario.valoraciones, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  usuario: UsuarioEntity

  @ManyToOne((type) => PublicacionEntity, (p) => p.valoraciones, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  publicacion: PublicacionEntity
}
