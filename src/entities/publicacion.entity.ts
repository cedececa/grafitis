import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ComentarioEntity } from './comentario.entity'
import { CommonEntity } from './common.entity'
import { FotoEntity } from './foto.entity'
import { UsuarioEntity } from './usuario.entity'
import { ValoracionEntity } from './valoracion.entity'

@Entity('publicacion')
export class PublicacionEntity extends CommonEntity {
  @CreateDateColumn()
  fecha: Date

  @Column({ nullable: true })
  tematica: string

  @Column({ nullable: true })
  ubicacion: string

  @Column({ nullable: true })
  estado: string

  @Column({ nullable: true })
  autor: string

  @Column({ nullable: true })
  valoracoinMedia: string
  // cada vez un usuario pone una nota para esta publicacion, se hace la media con el valor anterior y el nuevo.
  // para evitar calculos innecesarios (evitar el calculo de la media aritmetica de las valoraciones)
  // Ojo, en este caso se pierde la precision

  @ManyToOne(() => UsuarioEntity, (u) => u.publicaciones, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  usuario: UsuarioEntity

  @OneToMany(() => ValoracionEntity, (v) => v.publicacion, {
    nullable: true,
  })
  valoraciones: ValoracionEntity[]

  @OneToMany(() => ComentarioEntity, (c) => c.publicacion, {
    nullable: true,
  })
  comentarios: ComentarioEntity[]

  @OneToMany(() => FotoEntity, (f) => f.publicacion, {
    nullable: true,
  })
  fotos: FotoEntity[]
}
