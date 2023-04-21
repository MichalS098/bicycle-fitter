import { bikeParams, bikeType, ridingStyle } from "../../classes/bikeParams";
import { humanParams } from "../../classes/humanParams";

/**
 B = 1 more than 10 cm to ground 
 B = 2 more than 5 cm to ground 
 B = 3 finger tips to ground 
 B = 4 palms to ground 
 */
enum flexIndex {
    poor = 1,
    average,
    good,
    great
}

export function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
}

export function cosd(angle: number): number {
    return Math.cos(degToRad(angle));
}

export function sind(angle: number): number {
    return Math.sin(degToRad(angle));
}


//S - inseam
export function seatHeightCalc(person: humanParams, footAngle: number): number {

    const KGx: number = Math.sin(degToRad((180 - person.inseamLength) / 2)) * person.thighLength;
    const KGy: number = -Math.cos(degToRad((180 - person.inseamLength) / 2)) * person.thighLength;
    const footTipX: number = KGx + (Math.sin(degToRad(90 - footAngle)) * person.footLength);
    const footTipY: number = (KGy - person.shankLength) - (Math.cos(degToRad(90 - footAngle)) * person.footLength);

    const seatHeigth: number = Math.sqrt(footTipX ** 2 + footTipY ** 2)

    return seatHeigth
}

// w oryginale: WysokoscSiedzenia_2 ---------------
// KL deprecated - KL just means crankHeight
// NS - przesunięcie siodła - czy to seatSetback? Jak cos to to zmien
// S - inseam
// SW - ??
export function stackAndReach(bike: bikeParams, person: humanParams, SW: number, handleX: number) {

    const alpha = 90 - SW;
    const spacing = 2;
    const stemHeight = 2;
    const seatPostHeight = 12;

    const seatHeightNoCrank = bike.seatHeigth - bike.crankLength;

    bike.stackMax = Math.cos(degToRad(alpha)) * seatHeightNoCrank +
        bike.seatDrop - bike.stemLength * Math.sin(degToRad(bike.stemAngle)) - spacing - stemHeight;

    bike.stackMin = bike.stackMax - seatPostHeight;

    //const seatShift = NS; //seatSetback?

    bike.reachMax = handleX - (bike.stemLength * Math.sin(degToRad(bike.stemAngle))) - bike.seatSetback; //oryginally was NS

    bike.reachMin = bike.reachMax - bike.stemLength * Math.cos(degToRad(bike.stemAngle))



}

//Sa, NSa, SWa, S, OS, US, FL, OK, A, KL, bicycle_type, riding_style
//person: S, OS, US, FL, OK, A, riding_style 
//bike: N, KL, bicycle_type
//???: Sa, NSa, SWa, 
export function bicycleFunction(person: humanParams, bike: bikeParams, Sa: number, NSa: number, SWa: number): [number, number, number, number, number, bikeParams, humanParams] {
    const footAngle = 13;
    const supportX = 30;
    const supportY = 0;
    const stemHeight = 2;
    const spacerHeight = 2;
    //we calculate torsoHeight in two places: here and in calcFrameHeight.
    // a person has only one torso, so im assuming that this formula here is not
    //the actual torso height, bu rather the a modified version of this height
    //that serves as a component to other calculations further down this func.
    //Conclusion - this is not the actual torsoHeight of a person.


    let S: number;
    let SW: number;
    let M: number;
    let H: number;
    let PS: number;

    switch (bike.type) {
        case bikeType.City: {
            S = 145
            SW = 70
            break;
        }
        case bikeType.Mountain: {
            S = 148
            SW = 70
            break;
        }
        case bikeType.Road: {
            S = 150
            SW = 73
            break;
        }
    }

    switch (bike.style) {
        case ridingStyle.Ergonomic: {
            M = 0.53
            H = 45
            PS = 1
            break;
        }
        case ridingStyle.Sport: {
            M = 0.54
            H = 37.5
            PS = 2
            break;
        }
        case ridingStyle.Aerodynamic: {
            M = 0.53
            H = 30
            PS = 3
            break;
        }
    }

    let seatHeight: number = seatHeightCalc(person, footAngle);

    const pelvisX = supportX - (cosd(74) * (seatHeight - bike.crankLength))
    const pelvisY = supportY + (sind(74) * (seatHeight - bike.crankLength))

    const armX = pelvisX + cosd(H) * person.torsoHeight
    const armY = pelvisY + sind(H) * person.torsoHeight

    const handleX = armX + (sind(person.armTorsoangle + H - 90) * (person.armLength * 0.8))
    const handleY = armY - (cosd(person.armTorsoangle + H - 90) * (person.armLength * 0.8))

    const seatLength = handleX - pelvisX
    const drop = handleY - pelvisY

    const kgX = pelvisX + sind((180 - S) / 2) * person.thighLength
    const kgY = pelvisY - cosd((180 - S) / 2) * person.thighLength

    const spX = kgX
    const spY = kgY - person.shankLength
    const footTipX = spX + sind(90 - footAngle) * person.footLength
    const footTipY = spY - cosd(90 - footAngle) * person.footLength

    const A = pelvisX - footTipX
    const B = pelvisY - footTipY
    const C = A ** 2 + B ** 2

    seatHeight = Math.sqrt(C)
    const seatSetback = Math.abs(A) - sind(180 - 90 - 73) * bike.crankLength

    const stemX = handleX - bike.stemLength * cosd(bike.stemAngle)
    const stemY = handleY - bike.stemLength * sind(bike.stemAngle)
    const stemHeightX = stemX
    const stemHeightY = stemY - (stemHeight + spacerHeight)
    let R = stemHeightX - supportX //reach?
    let stack = stemHeightY - supportY

    bike.seatDrop = drop;
    bike.seatHeigth = seatHeight;
    bike.seatSetback = seatSetback;
    stackAndReach(bike, person, SW, handleX)

    stack = parseFloat(stack.toFixed(1)); //St
    R = parseFloat(R.toFixed(1));
    const S2R = stack / R

    bike.stack2ReachIndex1 = stack;
    bike.stack2ReachIndex2 = R;
    bike.stack2ReachIndex3 = S2R;

    //bike.stack = stack
    bike.seatSetback = parseFloat(bike.seatSetback.toFixed(1));  //NS
    bike.seatLength = parseFloat(seatLength.toFixed(1));  //SL
    bike.seatDrop = parseFloat(bike.seatDrop.toFixed(1));
    bike.seatHeigth = parseFloat(bike.seatHeigth.toFixed(1));

    bike.stackMin = parseFloat(bike.stackMin.toFixed(1));
    bike.reachMin = parseFloat(bike.reachMin.toFixed(1));
    bike.stackMax = parseFloat(bike.stackMax.toFixed(1));
    bike.reachMax = parseFloat(bike.reachMax.toFixed(1));

    person.torsoangle = H;

    //stackMin = Math.round(stackMin)
    //reachMin = Math.round(reachMin)
    //stackMax = Math.round(stackMax)
    //reachMax = Math.round(reachMax)

    //Values that are assigned to bike's or person's properties are not returned
    //theres also no need to return stackMin..reachMax, since they have their own function
    //the only values that are returned are the ones that:
    //  dont have their corresponding fileds in any of the structures
    //  i dont know their meaning (some single-letter vars, for instance)
    //torsoArmAngle is a "mutable" body parameter - the user can change it at any time, at will,
    //which makes it unfit to place into humanParams, since those describe "immutable" characteristics,
    //like arm length.
    //Perhaps we could use a third structure to store prescribed possitions? is there a need for that?
    return [S2R, M, PS, H, S, bike, person]
}

export function seatSize(person: humanParams, PS: number) {
    const SG: number = person.inseamLength / person.overallHeight
    let SS = 1 //arbitrary defaults
    let C = 0 //same here
    let S2RE: number //de-facto unused - its some string in original
    let RE2: number

    //the SG (sitzgrose) value is virtually unused in the program. Sitzgroese func
    //is called, SG is returned, but nothing happens to SG, its not even being printed
    if (SG >= 0.48 && SG <= 0.52) SS = 1;
    else if (SG < 0.48) SS = 2;
    else SS = 3;

    if (SS == 1) {
        if (PS == 1) C = 3
        else if (PS == 2) C = 0
        else if (PS == 3) C = -2
    }
    else if (SS == 2) {
        if (PS == 1) C = 0
        else if (PS == 2 || PS == 3) C = -2
    }
    else {
        if (PS == 3) C = 0
        else if (PS == 1 || PS == 2) C = 3
    }

    const ST2: number = (person.inseamLength * 0.69) + C
    if (SS == 1) RE2 = ST2 / 1.6
    else if (SS == 2) RE2 = ST2 / 1.48
    else RE2 = ST2 / 1.37

    return [SG, ST2, RE2]
}

export function calcFrameHeight(person: humanParams, bike: bikeParams): [humanParams, bikeParams] {
    //instead of calculating it, we can just ask the user to measure it
    //const torsoHeight = person.shoulderHeight - person.inseamLength
    bike.frameHeight = person.inseamLength * 0.66

    //Określenie długości korby w zależności od długości kroku
    bike.crankLengthInInch = person.thighLength / 2.5 //Długość korby zależna od długości uda w calach (Mestdagh, 1998)

    return [person, bike]
}

//variables like RSa, GS refer to checkboxes - those can store only one of two values
// checked or uncheched. making them bool makes the most sense
//klik - click pedals, RSa - neck/back pain, GS - butt pain, FP - feet pain, KSa - knee pain
//function painSurvey(klik: number, back: boolean, butt: boolean, feet: boolean, knee: boolean) {

//}

/**
 B = 1 more than 10 cm to ground 
 B = 2 more than 5 cm to ground 
 B = 3 finger tips to ground 
 B = 4 palms to ground 
 */
export function flexibilitySurvey(SWa: number, RSa: number, B: number): [number, string] {

    let message = ''
    let SWnew = 0

    switch (B) {
        case flexIndex.poor: {
            SWnew = SWa + 50
            message = 'choose a more upright position'
            break;
        }
        case flexIndex.average: {
            SWnew = SWa + 45
            message = 'you have to do mobility exercise'
            break;
        }
        case flexIndex.good: {
            if (RSa == 1) {
                SWnew = SWa + 50
                message = 'a sports like position is not recommended'
            }
            else {
                SWnew = SWa + 40
                message = 'Sports like position'
            }
            break;
        }
        case flexIndex.great: {
            if (RSa == 1) {
                SWnew = SWa + 45
                message = 'an aerodynamic position is not recommended'
            }
            else {
                SWnew = SWa + 35
                message = 'aerodynamic'
            }
        }
    }

    return [SWnew, message]
}

