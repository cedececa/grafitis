import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'
import { PublicacionEntity } from './publicacion.entity'

@Entity('foto')
export class FotoEntity extends CommonEntity {
  @Column()
  url: string

  @ManyToOne((type) => PublicacionEntity, (p) => p.foto, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  publicacion: PublicacionEntity
}
