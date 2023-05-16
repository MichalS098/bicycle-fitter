import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Bike } from "@/entity/Bike";
import { Tip } from "@/entity/Tip";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    unitSystem!: string;
    @Column()
    height!: number;
    @Column()
    rideTime!: number;
    @Column()
    riderStyle!: string;
    @Column()
    nameOfUser!: string;
    // Human body parameters
    @Column()
    shankLength!: number;
    @Column()
    thighLength!: number;
    @Column()
    shoeSize!: number;
    @Column()
    inseamLength!: number;
    @Column()
    shoulderHeight!: number;
    @Column()
    armLength!: number;
    @Column()
    armTorsoAngle!: number;
    @Column()
    overallHeight!: number;
    @Column()
    torsoAngle!: number;

    @OneToMany(type => Bike, bike => bike.user, { cascade: true, eager: true })
    bikes!: Bike[];

    @ManyToMany(type => Tip, {
        cascade: ['insert']
    })
    @JoinTable()
    tips!: Tip[];
}