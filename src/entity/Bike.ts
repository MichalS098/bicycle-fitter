import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, BaseEntity, OneToMany } from "typeorm";
import { User } from "@/entity/User";
import { Angles } from "@/entity/Angles";

@Entity('bike')
export class Bike extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    brand!: string;
    @Column()
    model!: string;
    @Column()
    type!: string;
    @Column()
    expectationsBackOrNeckPain!: boolean;
    @Column()
    expectationsButPain!: boolean;
    @Column()
    expectationsKneePain!: boolean;
    @Column()
    expectationsFeetPain!: boolean;
    @Column()
    expectationsClickPedals!: boolean;
    @Column()
    expectationsNothing!: boolean;
    @Column()
    style!: string;
    @Column()
    crankLength!: number;
    // Calculated parameters
    @Column()
    seatHeight!: number;
    @Column()
    seatSetback!: number;
    @Column()
    seatLength!: number;
    @Column()
    seatDrop!: number;
    @Column()
    stemLength!: number;
    @Column()
    stemAngle!: number;
    @Column()
    frameHeight!: number;
    @Column()
    crankLengthInInch!: number;
    @Column()
    stackMin!: number;
    @Column()
    reachMin!: number;
    @Column()
    stackMax!: number;
    @Column()
    reachMax!: number;
    @Column()
    stack2ReachIndex1!: number;
    @Column()
    stack2ReachIndex2!: number;
    @Column()
    stack2ReachIndex3!: number;
    
    @Column()
    messageFromFlexibilitySurvey !: string;
    @Column()
    messageFromNeckOrBackPain!: string;
    @Column()
    messageFromButPain!: string;
    @Column()
    messageFromFeetPain!: string;
    @Column()
    messageFromKneePain!: string;

    @ManyToOne(type => User, user => user.bikes, {
        cascade: ['insert']
    })
    user!: Relation<User>;

    @OneToMany(type => Angles, angles => angles.bike, {
        cascade: ['insert']
    })
    angles!: Relation<Angles>
}