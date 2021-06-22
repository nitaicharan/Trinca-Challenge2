import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("barbecues")
export class Barbecue extends BaseEntity {

    @ManyToMany(type => User)
    @JoinTable({ name: 'barbecues_users', joinColumn: { name: 'barbecue_id' }, inverseJoinColumn: { name: 'user_id' } })
    users: User[];

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'float' })
    price: number;

    @CreateDateColumn()
    created_at: Date;

}