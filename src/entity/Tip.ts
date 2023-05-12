import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('tip')
export class Tip extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    title!: string;
    @Column()
    description!: string;
    @Column()
    content!: string;
    @Column()
    favourite!: boolean;
    @Column()
    featured_image_path!: string;
    @Column()
    color!: string;
}