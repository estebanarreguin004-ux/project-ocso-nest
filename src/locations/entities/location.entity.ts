import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column({type: "text"})
    locationName: string;
    @Column({type: "text"})
    locationAddress: string;
    @Column('array')
    locationLatLng: number[];
    


}
