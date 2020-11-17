import { Column, Entity, OneToOne } from 'typeorm'
import { CommonEntity } from './common.entity'
import { UsuarioEntity } from './usuario.entity'

@Entity('perfil')
export class PerfilEntity extends CommonEntity {
  @OneToOne(() => UsuarioEntity, (usuario) => usuario.perfil, {
    nullable: true,
    cascade: true,
  })
  usuario: UsuarioEntity

  @Column({ nullable: true })
  avatarUrl: string
  @Column()
  apellido: string
  @Column()
  apeliidoSedundo: string
  @Column()
  nombre: string
  @Column()
  fechaNacimiento: string
}
