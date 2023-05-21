import { bikeExpectations } from '@/classes/bikeExpectations';

enum bikeType {
    City,
    Mountain,
    Road,
    Gravel,
    Cross,
    Electric,
    Mtb,
}

function bikeTypeFromStr(str: string): bikeType {
    switch (str) {
        case "city": return bikeType.City;
        case "mountain": return bikeType.Mountain;
        case "road": return bikeType.Road;
        case "gravel": return bikeType.Gravel;
        case "cross": return bikeType.Cross;
        case "electric": return bikeType.Electric;
        case "mtb": return bikeType.Mtb;
        default: return bikeType.City;
    }
}

enum ridingStyle {
    Ergonomic,
    Sport,
    Aerodynamic
}

function ridingStyleFromStr(str: string): ridingStyle {
    switch (str) {
        case "ergonomic": return ridingStyle.Ergonomic;
        case "sport": return ridingStyle.Sport;
        case "aerodynamic": return ridingStyle.Aerodynamic;
        default: return ridingStyle.Ergonomic;
    }
}


// TODO This class is to rebuild !!!! 
class bikeParams {
    type: bikeType;
    style: ridingStyle;
    crankLength; //KL, distance between the center of the crank and floor (see Maro's docs)
    stemLength; //dl. wspornika (ger. Vorbau)
    stemAngle;
    bikeExpectationsParms: bikeExpectations;
    choiceFlexibilitySurvey;

    //to calculations
    seatHeight;
    seatSetback;
    seatLength;
    seatDrop;
    frameHeight;

    crankLengthInInch;

    stackMin;
    reachMin;
    stackMax;
    reachMax;
    stack2ReachIndex1;
    stack2ReachIndex2;
    stack2ReachIndex3;
    messageFromFlexibilitySurvey;
    messageFromNeckOrBackPain;
    messageFromButPain;
    messageFromFeetPain;
    messageFromKneePain;

    constructor(
        type: bikeType,
        style: ridingStyle,
        crankLength: number,
        stemLength: number,
        stemAngle: number,
        bikeExpectationsParms: bikeExpectations,
        choiceFlexibilitySurvey: number) {

        this.type =  type;
        this.style = style;
        this.crankLength = crankLength;
        this.stemLength = stemLength;
        this.stemAngle = stemAngle;

        this.bikeExpectationsParms = bikeExpectationsParms;

        this.choiceFlexibilitySurvey = choiceFlexibilitySurvey;

        //to calculations
        this.seatHeight = 0;
        this.seatSetback = 0;
        this.seatLength = 0;
        this.seatDrop = 0;
        this.frameHeight = 0;

        this.crankLengthInInch = 0;

        this.stackMin = 0
        this.reachMin = 0
        this.stackMax = 0
        this.reachMax = 0
        this.stack2ReachIndex1 = 0;
        this.stack2ReachIndex2 = 0;
        this.stack2ReachIndex3 = 0;
        this.messageFromFlexibilitySurvey = '';
        this.messageFromNeckOrBackPain = '';
        this.messageFromButPain= '';
        this.messageFromFeetPain= '';
        this.messageFromKneePain= '';
    }

}

export { bikeParams, ridingStyle, bikeType, bikeTypeFromStr, ridingStyleFromStr };