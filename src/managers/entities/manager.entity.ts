import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Manager {
    @PrimaryGeneratedColumn("uuid")
    managerId: string
    @Column({type: 'text'})
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column({type: 'text', unique: true})
    managerEmail: string;
    @Column({type: 'text'})
    managerPhoneNumber: string;
}
