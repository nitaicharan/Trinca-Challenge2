import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { RoleType } from "../types/RoleType";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("authentications")
export class Authentication extends BaseEntity {

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: 'varchar', nullable: false })
    role: RoleType = RoleType.CLIENT;

    @Column({ type: 'varchar', nullable: true })
    refresh_token: string;

}