import { Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
export class User extends BaseEntity {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column('float')
    password: string;

    @CreateDateColumn()
    created_at: Date;

}