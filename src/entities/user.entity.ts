import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class UsersEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    iv: string;

    @Column()
    role: string;
}

