import { Column, Entity, ManyToOne } from 'typeorm'
import { CommonEntity } from './common.entity'
import { PublicacionEntity } from './publicacion.entity'

@Entity('foto')
export class FotoEntity extends CommonEntity {
  @Column()
  url: string

  @ManyToOne(() => PublicacionEntity, (p) => p.fotos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  publicacion: PublicacionEntity
}
