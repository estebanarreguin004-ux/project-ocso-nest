import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string
    @Column({type: "text"})
    providerName: string;
    @Column({type: "text", unique: true})
    providerEmail: string;
    @Column({type: "text", nullable: true})
    phoneNumber: string

    @OneToMany(() => Product, (product) => product.provider)
    products: Product[];
}
