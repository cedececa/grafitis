import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { CommonEntity } from './common.entity'
import { UsuarioEntity } from './usuario.entity'

@Entity('perfil')
export class PerfilEntity extends CommonEntity {
  @OneToOne(() => UsuarioEntity, (usuario) => usuario.perfil, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  usuario: UsuarioEntity

  @Column({ nullable: true })
  avatarUrl: string
  @Column({ nullable: true })
  apellido: string
  @Column({ nullable: true })
  apellidoSedundo: string
  @Column({ nullable: true })
  nombre: string
  @Column({ nullable: true })
  fechaNacimiento: string
}
