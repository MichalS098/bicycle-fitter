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

function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
}

function cosd(angle: number): number {
    return Math.cos(degToRad(angle));
}

function sind(angle: number): number {
    return Math.sin(degToRad(angle));
}
    

//S - inseam
function seatHeightCalc(person: humanParams, footAngle: number): number {

    const KGx: number = Math.sin(degToRad((180 - person.inseamLength) / 2)) * person.thighLength;
    const KGy: number = -Math.cos(degToRad((180 - person.inseamLength) / 2)) * person.thighLength;
    const footTipX: number = KGx + Math.sin(degToRad(90 - footAngle)) * person.footLength;
    const footTipY: number = (KGy - person.shankLength) - Math.cos(degToRad(90 - footAngle)) * person.footLength;

    const seatHeigth: number = Math.sqrt(footTipX ** 2 + footTipY ** 2)

    return seatHeigth
}

// w oryginale: WysokoscSiedzenia_2 ---------------
// KL deprecated - KL just means crankHeight
// NS - przesunięcie siodła - czy to seatSetback? Jak cos to to zmien
// S - inseam
// SW - ??
function stackAndReach(bike: bikeParams, person: humanParams, SW: number): [number, number, number, number] {

    const alpha = 90 - SW;
    const spacing = 2;
    const stemHeight = 2;
    const seatPostHeight = 12;

    const seatHeightNoCrank = bike.seatHeigth - bike.crankLength;

    const stackMax = Math.cos(degToRad(alpha)) * seatHeightNoCrank +
        bike.seatDrop - bike.stemLength * Math.sin(degToRad(bike.stemAngle)) - spacing - stemHeight;

    const stackMin = stackMax - seatPostHeight;

    //const seatShift = NS; //seatSetback?

    const reachMax = bike.handlebarX - (bike.stemLength * Math.sin(degToRad(bike.stemAngle))) - bike.seatSetback; //oryginally was NS

    const reachMin = reachMax - bike.stemLength * Math.cos(degToRad(bike.stemAngle))

    return [stackMin, reachMin, stackMax, reachMax]
        
}
// inseam, upperLeg, lowerLeg, shoeSize, shoulderHeight, armLength
// crankLen, stemLen, stemAgl, spacerHeight
// H - torso angle
// IGNORE FOR NOW - this function just handles plot drawing (alongside rowerzysta())
function stackToReachOutput(person: humanParams, bike: bikeParams, torsoAngle: number, torsoArmAngle: number, spacerHeight: number) {
    const footAngle = 13;
    const supportX = 30;
    const supportY = 0;
    const stemHeight = 2; //this value is also defined in the bike class

    const torsoLength = (person.shoulderHeight - (person.legLength)) * 0.9;

    //original takes shoe size insted of true foot length - lets just stick with real length
    //If something seems fishy at debug stage: TODO

    const SW = 74 //???????

    let seatHeight = seatHeightCalc(person, footAngle); //update class

    //Substituted "Kurbel" for crankLength. Kurbel means crank, so its a rather save bet
    //but maybe a crank has other crucial dimensions, not necessarily length?
    const pelvisX = supportX - Math.cos(degToRad(SW)) * (seatHeight - bike.crankLength)
    const pelvisY = supportY + Math.cos(degToRad(SW)) * (seatHeight - bike.crankLength)

    const shoulderX = pelvisX + Math.cos(degToRad(torsoAngle)) * torsoLength
    const shoulderY = pelvisY + Math.sin(degToRad(torsoAngle)) * torsoLength

    const handleX = shoulderX + Math.sin(degToRad(torsoArmAngle + torsoAngle - 90)) * (person.armLength * 0.8)
    const handleY = shoulderY - Math.cos(degToRad(torsoArmAngle + torsoAngle - 90)) * (person.armLength * 0.8)

    let seatLength = handleX - pelvisX;
    let Drop = handleY - pelvisY;

    const kgX = pelvisX + Math.sin(degToRad((180 - person.inseamLength) / 2)) * person.thighLength;
    const kgY = pelvisY - Math.cos(degToRad((180 - person.inseamLength) / 2)) * person.thighLength;

    const spX = kgX;
    const spY = kgY - person.shankLength;

    const footTipX = spX + Math.sin(degToRad(90 - footAngle)) * person.footLength
    const footTipY = spY - Math.cos(degToRad(90 - footAngle)) * person.footLength

    const A = pelvisX - footTipX;
    const B = pelvisY - footTipY;
    seatHeight = Math.sqrt(A ** 2 + B ** 2);

    //this variable, in the original code, has the name "przesunięcie siodła". Me reading this as "setback"" is just guesswork, just
    //so you know. Also, substitured Kurbel -> crankLen
    let seatSetback = Math.abs(A) - Math.sin(degToRad(90 - SW)) * bike.crankLength;

    const stemX = handleX - (bike.stemLength * Math.cos(degToRad(bike.stemAngle)));
    const stemY = handleY - (bike.stemLength * Math.sin(degToRad(bike.stemAngle)));

    const stemHeightX = stemX;
    const stemHeightY = stemY - stemHeight + spacerHeight;

    const x2 = [pelvisX, kgX, spX, footTipX];
    const y2 = [pelvisY, kgY, spY, footTipY];
    const x = [supportX, pelvisX, shoulderX, handleX];
    const y = [supportY, pelvisY, shoulderY, handleY];

    let R = stemHeightX - supportX;
    let stack = stemHeightY - supportY;

    let [stackMin, reachMin, stackMax, reachMax] = stackAndReach(bike, person, SW);

    stack = Math.round(stack);
    R = Math.round(R);
    const S2R = stack / R;

    seatHeight = Math.round(seatHeight);
    seatSetback = Math.round(seatSetback);
    seatLength = Math.round(seatLength);
    Drop = Math.round(Drop);

    stackMin = Math.round(stackMin)
    reachMin = Math.round(reachMin)
    stackMax = Math.round(stackMax)
    reachMax = Math.round(reachMax)

    bike.seatHeigth = seatHeight;
    bike.seatSetback = seatSetback;
    bike.seatLength = seatLength;
    bike.seatDrop = Drop;

    
    //.....
}

//Sa, NSa, SWa, S, OS, US, FL, OK, A, KL, bicycle_type, riding_style
//person: S, OS, US, FL, OK, A, riding_style 
//bike: N, KL, bicycle_type
//???: Sa, NSa, SWa, 
function bicycleFunction(person: humanParams, bike: bikeParams, Sa: number, NSa: number, SWa: number) {
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
    const torsoHeight = (person.shoulderHeight - (person.legLength)) * 0.9
    const torsoArmAngle = 85

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

    bike.stemLength = 10 //VL
    bike.stemAngle = 10 //VW
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

    const pelvisX = supportX - cosd(74) * (seatHeight - bike.crankLength)
    const pelvisY = supportY + sind(74) * (seatHeight - bike.crankLength)

    const armX = pelvisX + cosd(H) * torsoHeight
    const armY = pelvisY + sind(H) * torsoHeight

    const handleX = armX + sind(torsoArmAngle + H - 90) * person.armLength * 0.8
    const handleY = armY - cosd(torsoArmAngle + H - 90) * person.armLength * 0.8

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
    const stemHeightY = stemY - stemHeight + spacerHeight
    let R = stemHeightX - supportX //reach?
    let stack = stemHeightY - supportY

    //let [stackMin, reachMin, stackMax, reachMax] = stackAndReach(bike, person, SW)

    stack = Math.round(stack) //St
    R = Math.round(R)
    const S2R = stack / R //stack-to-reach?

    bike.stack = stack
    bike.reach = R //Its just an educated guess
    bike.seatHeigth = Math.round(seatHeight) //SH
    bike.seatSetback = Math.round(seatSetback) //NS
    bike.seatLength = Math.round(seatLength) //SL
    bike.seatDrop = Math.round(drop) //D

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
    return [S2R, M, PS, H, S, torsoArmAngle]
}

function seatSize(person: humanParams, PS: number) {
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

function calcFrameHeight(person: humanParams, bike: bikeParams) {
    //instead of calculating it, we can just ask the user to measure it
    //const torsoHeight = person.shoulderHeight - person.inseamLength
    bike.frameHeight = person.inseamLength * 0.66
    bike.crankLength = person.thighLength / 2.5
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
function flexibilitySurvey(SWa: number, RSa: number, B: number) {

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

