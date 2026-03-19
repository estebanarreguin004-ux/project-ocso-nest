import { Employee } from "src/employees/entities/employee.entity"
import { Manager } from "src/managers/entities/manager.entity"
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"

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

    @OneToOne(() => Manager, { eager: true })
    manager: Manager

    @OneToOne(() => Employee, { eager: true })
    employee: Employee


}