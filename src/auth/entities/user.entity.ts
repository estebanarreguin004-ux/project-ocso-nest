import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string
    @Column({type: "text"})
    userEmail: string
    @Column({type: "text"})
    userPassword: string
    
}