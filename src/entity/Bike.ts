import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, BaseEntity } from "typeorm";
import { User } from "@/entity/User";

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
    style!: string;
    // Calculated parameters
    @Column()
    crankLength!: number;
    @Column()
    seatHeigth!: number;
    @Column()
    seatSetback!: number;
    @Column()
    seatLength!: number;
    @Column()
    seatDrop!: number;
    @Column()
    spacerHeigth!: number;
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

    @ManyToOne(type => User, user => user.bikes, {
        cascade: ['insert']
    })
    user!: Relation<User>;
}