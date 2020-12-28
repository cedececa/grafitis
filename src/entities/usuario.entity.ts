import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { ComentarioEntity } from './comentario.entity'
import { CommonEntity } from './common.entity'
import { PerfilEntity } from './perfil.entity'
import { PublicacionEntity } from './publicacion.entity'
import { UsuarioRole } from './usuario-role.enum'
import { UsuarioTipo } from './usuario-tipo.enum'
import { ValoracionEntity } from './valoracion.entity'

@Entity('usuario')
export class UsuarioEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true, default: UsuarioRole.User })
  role: UsuarioRole
  @Column({ nullable: true })
  password: string
  @Column()
  email: string

  @Column({ type: 'varchar', nullable: true, default: UsuarioTipo.Local })
  usuarioTipo: UsuarioTipo

  // Relaciones
  /**
     * https://github.com/typeorm/typeorm/blob/master/docs/relations.md
     cascade: boolean | ("insert" | "update")[] - If set to true, 
     the related object will be inserted and updated in the database. 
     You can also specify an array of cascade options.
    */
  @OneToOne(() => PerfilEntity, (perfil) => perfil.usuario, {
    // use repository save for nested object, dont use [insert] if you have [cascade] enable.
    cascade: true,
    onDelete: 'CASCADE', // Adding the cascade to both sides
  })
  perfil: PerfilEntity

  @OneToMany(() => ValoracionEntity, (valoracion) => valoracion.usuario, {
    nullable: true,
  })
  valoraciones: ValoracionEntity[]

  @OneToMany(() => ComentarioEntity, (c) => c.usuario, {
    nullable: true,
  })
  comentarios: ComentarioEntity[]

  @OneToMany(() => PublicacionEntity, (p) => p.usuario, {
    nullable: true,
  })
  publicaciones: PublicacionEntity[]
}
