import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, BaseEntity } from "typeorm";
import { Bike } from "@/entity/Bike";

@Entity('angles')
export class Angles extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    footFloorAngleMax!: number
    @Column()
    footFloorAngleMin!: number
    @Column()
    thighShankAngleMax!: number
    @Column()
    thighShankAngleMin!: number
    @Column()
    torsoFloorAngleMax!: number
    @Column()
    torsoFloorAngleMin!: number
    @Column()
    torsoBicepAngleMax!: number
    @Column()
    torsoBicepAngleMin!: number
    @Column()
    bicepForearmAngleMax!: number
    @Column()
    bicepForearmAngleMin!: number
    @Column()
    crankAngle!: number

    @ManyToOne(type => Bike, bike => bike.angles, {
        cascade: ['insert']
    })
    bike!: Relation<Bike>
}