import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CommonEntity } from './common.entity'
import { PublicacionEntity } from './publicacion.entity'
import { UsuarioEntity } from './usuario.entity'

//https://github.com/typeorm/typeorm/blob/master/docs/indices.md#unique-indices
@Index(['usuario', 'publicacion'], { unique: true })
@Entity('valoracion')
export class ValoracionEntity extends CommonEntity {
  @Column()
  punto: number

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.valoraciones, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  usuario: UsuarioEntity

  @ManyToOne(() => PublicacionEntity, (p) => p.valoraciones, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  publicacion: PublicacionEntity
}
