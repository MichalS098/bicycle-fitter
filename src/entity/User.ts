import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Bike } from "@/entity/Bike";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    unitSystem!: string;  // metric || imperial
    @Column()
    hasMeasuredWithCamera!: boolean;
    @Column()
    measurementsInstructionShown!: boolean;    
    @Column()
    language!: string;  // en || pl    
    @Column()
    riderStyle!: string;
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
    overallHeight!: number;
    @Column()
    armTorsoAngle!: number;
    @Column()
    torsoAngle!: number;
    @Column()
    choiceFlexibilitySurvey!: number;

    @OneToMany(type => Bike, bike => bike.user, { cascade: true, eager: true })
    bikes!: Bike[];
}