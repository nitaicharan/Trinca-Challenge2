import { Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("barbecues")
export class Barbecue extends BaseEntity {

    // @ManyToOne(() => User)
    // users: User[];

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'float' })
    price: number;

    @CreateDateColumn()
    created_at: Date;

}