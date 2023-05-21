// TODO: Refactor all this code

/**
 * Here we will have all the functions imported from MATLAB app
 */
import { calcFrameHeight, flexibilitySurvey, bicycleFunction, seatSize, additionalSurvey } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { bikeParams, bikeType, bikeTypeFromStr, ridingStyle, ridingStyleFromStr } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';
import { User } from '@/entity/User';
import { Bike } from '@/entity/Bike';
import { bikeExpectations } from '@/classes/bikeExpectations';


export function calculatedBikeFittingParams(person: humanParams, bike: bikeParams): [bikeParams, humanParams] {

    const [SWa, Sa, NSa] = additionalSurvey(bike);

    [person, bike] = calcFrameHeight(person, bike);

    const [SWnew, messageFromFlexibilitySurvey] = flexibilitySurvey(SWa, bike.bikeExpectationsParms.backOrNeckPain, bike.choiceFlexibilitySurvey)

    bike.messageFromFlexibilitySurvey = messageFromFlexibilitySurvey;

    let S2R
    let M
    let PS
    let H
    let S
    [S2R, M, PS, H, S, bike, person] = bicycleFunction(person, bike, Sa, NSa, SWnew)
    const [SG, ST2, RE2] = seatSize(person, PS)

    const SHlemond = Math.round((S * 0.883) + bike.crankLength)

    const SHhamley = Math.round(S * 1.09)

    //ST2 = Math.round(ST2) / 10

    //RE2 = Math.round(RE2) / 10

    if (bike.bikeExpectationsParms.clickPedal == true) {
        bike.seatHeight = 2.3 + bike.seatHeight
    }
    else
    {
        bike.seatHeight = 1.0 + bike.seatHeight
    }

    //console.log("person", person)
    //console.log("bike", bike)
    return [bike, person]
}


export async function getBikefittingParams(bike: Bike, user: User): Promise<bikeParams> {
    const shankLength = user.shankLength;
    const thighLength = user.thighLength;
    const shoeSize = user.shoeSize //this input must add to interview
    const inseamLength = user.inseamLength;
    const shoulderHeight = user.shoulderHeight;
    const armLength = user.armLength;
    const overallHeight = user.overallHeight;
    const person = new humanParams(shankLength, thighLength, shoeSize, inseamLength, shoulderHeight, armLength, 0, overallHeight, 37.5);
    //const person = new humanParams(user.shankLength, user.thighLength, user.shoeSize, user.inseamLength, user.shoulderHeight, user.armLength, 85, user.overallHeight, 37.5);

    const bikeExpectationsTemp = new bikeExpectations(bike.expectationsBackOrNeckPain,
        bike.expectationsButPain,
        bike.expectationsKneePain,
        bike.expectationsFeetPain,
        bike.expectationsClickPedals, bike.expectationsNothing);

    const newBikeParams = new bikeParams(bikeTypeFromStr(bike.type), ridingStyleFromStr(bike.style), bike.crankLength, bike.stemLength, 10, bikeExpectationsTemp, bike.choiceFlexibilitySurvey);

    console.log("humanParams to bike fitting calculated: ", person)
    console.log("bikeParams to bike fitting calculated: ", newBikeParams)

    const [returnedBike, returnedPerson] = calculatedBikeFittingParams(
        person,
        newBikeParams
    );

    console.log("returnedBike after bike fitting calculated: ", returnedBike)
    console.log("returnedPerson after bike fitting calculated: ", returnedPerson)

    return returnedBike;
}