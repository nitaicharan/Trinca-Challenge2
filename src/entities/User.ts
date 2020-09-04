import { Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
export class User extends BaseEntity {

    @Column('varchar', { unique: true })
    email: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column('varchar')
    password: string;

}