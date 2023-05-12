import { degToRad, seatHeightCalc, stackAndReach } from '@/functions/bikefittinglogic/bikeFittingParamsLogic'
import { bikeParams, bikeType, ridingStyle } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';
// inseam, upperLeg, lowerLeg, shoeSize, shoulderHeight, armLength
// crankLen, stemLen, stemAgl, spacerHeight
// H - torso angle
// IGNORE FOR NOW - this function just handles plot drawing (alongside rowerzysta())
export function stackToReachOutput(person: humanParams, bike: bikeParams, torsoAngle: number, torsoArmAngle: number, spacerHeight: number) {
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

    stackAndReach(bike, person, SW, handleX);

    stack = Math.round(stack);
    R = Math.round(R);
    const S2R = stack / R;

    seatHeight = Math.round(seatHeight);
    seatSetback = Math.round(seatSetback);
    seatLength = Math.round(seatLength);
    Drop = Math.round(Drop);

    bike.stackMin = Math.round(bike.stackMin)
    bike.reachMin = Math.round(bike.reachMin)
    bike.stackMax = Math.round(bike.stackMax)
    bike.reachMax = Math.round(bike.reachMax)

    bike.seatHeight = seatHeight;
    bike.seatSetback = seatSetback;
    bike.seatLength = seatLength;
    bike.seatDrop = Drop;

    
    //.....
}