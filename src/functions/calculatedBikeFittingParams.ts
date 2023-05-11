// TODO: Refactor all this code

/**
 * Here we will have all the functions imported from MATLAB app
 */
import { calcFrameHeight, flexibilitySurvey, bicycleFunction, seatSize } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { bikeParams, bikeType, bikeTypeFromStr, ridingStyle, ridingStyleFromStr } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';
import { User } from '@/entity/User';
import { Bike } from '@/entity/Bike';


export function calculatedBikeFittingParams(clickPedals: number, neckOrBackPain: number, butPain: number, feetPain: number, kneePain: number, choiceFlexibilitySurvey: number, person: humanParams, bike: bikeParams): [bikeParams, humanParams] {

    //KLIK od "Clickk Peals?"
    if (clickPedals == 1) {
        clickPedals = 2.3
    }
    else {
        clickPedals = 1
    }

    //Neck or Back Pain?
    let SWa = 0

    let messageFromNeckOrBackPain = ''

    if (neckOrBackPain == 1) {
        messageFromNeckOrBackPain = 'pozycja siodełka zbyt agresywna'
        SWa = 5
    }
    else {
        messageFromNeckOrBackPain = ''
    }

    //But Pain?
    let messageFromButPain = ''

    if (butPain == 1) {
        messageFromButPain = 'siodełko nieoptymalne'
    }
    else {
        messageFromButPain = ''
    }

    //Feet Pain?
    let messageFromFeetPain = ''

    if (feetPain == 1) {
        messageFromFeetPain = 'potrzebujesz wkładek do butów rowerowych'
    }
    else {
        messageFromFeetPain = ''
    }

    //Knee Pain?
    let messageFromKneePain = ''
    let Sa
    let NSa

    if (kneePain == 1) {
        messageFromKneePain = 'skonsultuj się z rowerowym dopasowaniem'
        Sa = -5
        NSa = 1
    }
    else {
        messageFromKneePain = ''
        Sa = 0
        NSa = 0
    }


    [person, bike] = calcFrameHeight(person, bike);

    const [SWnew, messageFromFlexibilitySurvey] = flexibilitySurvey(SWa, neckOrBackPain, choiceFlexibilitySurvey)

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

    bike.seatHeight = clickPedals + bike.seatHeight

    //console.log("person", person)
    //console.log("bike", bike)
    return [bike, person]
}


export async function getBikefittingParams(bike: Bike, user: User): Promise<bikeParams> {
    const person = new humanParams(user.shankLength, user.thighLength, user.shoeSize, user.inseamLength, user.shoulderHeight, user.armLength, 85, user.overallHeight, 37.5);
    const clickPedals = 1;
    const neckOrBackPain = 2;
    const butPain = 2;
    const feetPain = 2;
    const kneePain = 2;
    const choiceFlexibilitySurvey = 1;

    const newBikeParams = new bikeParams();
    newBikeParams.type = bikeTypeFromStr(bike.type);
    newBikeParams.style = ridingStyleFromStr(bike.style);
    newBikeParams.crankLength = 18 //it we must know before bikefitting, we must add this to interview bike 
    newBikeParams.seatHeight = 90
    newBikeParams.seatSetback = 20
    newBikeParams.seatLength = 40
    newBikeParams.seatDrop = -5
    newBikeParams.spacerHeight = 2 //W programie matlabowym było to tak zdefiniowane 
    newBikeParams.stemLength = 10 //VL
    newBikeParams.stemAngle = 10 //VW
    const [returnedBike, returnedPerson] = calculatedBikeFittingParams(
        clickPedals,
        neckOrBackPain,
        butPain,
        feetPain,
        kneePain,
        choiceFlexibilitySurvey,
        person,
        newBikeParams
    );

    return returnedBike;
}