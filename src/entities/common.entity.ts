import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export class CommonEntity {
  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date()
  }

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
