import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string
    @Column({type: "text"})
    userEmail: string
    @Column({type: "text"})
    userPassword: string
    @Column('simple-array', { default: "Employee"})
    userRoles: string[]
}