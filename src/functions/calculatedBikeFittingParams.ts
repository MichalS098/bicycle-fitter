/**
 * Here we will have all the functions imported from MATLAB app
 */
import { calcFrameHeight, flexibilitySurvey, bicycleFunction, seatSize } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { bikeParams, bikeType, ridingStyle } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';


export function calculatedBikeFittingParams(clickPedals: number, neckOrBackPain: number, butPain: number, feetPain: number, kneePain: number, choiceFlexibilitySurvey: number, person: humanParams, bike: bikeParams) : [bikeParams, humanParams] {

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

    let [SWnew, messageFromFlexibilitySurvey] = flexibilitySurvey(SWa, neckOrBackPain, choiceFlexibilitySurvey)

    let S2R
    let M
    let PS
    let H
    let S
    [S2R, M, PS, H, S, bike, person] = bicycleFunction(person, bike, Sa, NSa, SWnew)
    let [SG, ST2, RE2] = seatSize(person, PS)

    let SHlemond = Math.round((S * 0.883) + bike.crankLength)

    let SHhamley = Math.round(S * 1.09)

    ST2 = Math.round(ST2) / 10

    RE2 = Math.round(RE2) / 10

    bike.seatHeigth = clickPedals + bike.seatHeigth

    return [bike, person]
}