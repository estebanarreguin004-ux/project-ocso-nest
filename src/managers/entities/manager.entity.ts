import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

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

    @OneToOne(() => Location)
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId'
    })
    user: User;
}
