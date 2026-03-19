import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: 'Ocso Juriquilla'
    })
    @Column({type: "text"})
    locationName: string;
    
    @ApiProperty({
        default: '123 Main St, Juriquilla, QRO'
    })
    @Column({type: "text"})
    locationAddress: string;

    @ApiProperty({
        default: [20.1, -12.1]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(() => Manager, { eager: true })
    @JoinColumn({
        name: 'managerId',
        referencedColumnName: 'managerId'
    })
    manager: Manager;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: 'regionId',
        referencedColumnName: 'regionId'
    })
    region: Region;

    @OneToOne(() => Employee, (employee) => employee.location)
    @JoinColumn({
        name: 'employeeId',
        referencedColumnName: 'employeeId'
    })
    employees: Employee[];
}
