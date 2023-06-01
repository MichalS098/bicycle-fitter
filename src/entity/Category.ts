import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Tip } from "@/entity/Tip";

@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;

    @ManyToMany(type => Tip, {
        cascade: ['insert']
    })
    @JoinTable()
    tips!: Tip[];
}