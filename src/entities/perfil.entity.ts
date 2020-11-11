import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UsuarioEntity } from './usuario.entity'

@Entity('perfil')
export class PerfilEntity {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne((type) => UsuarioEntity, (usuario) => usuario.perfil, {
    nullable: true,
    cascade: true,
  })
  usuaro: UsuarioEntity

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
