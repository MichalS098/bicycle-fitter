
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
    type: bikeType = bikeType.City;
    style: ridingStyle = ridingStyle.Ergonomic;
    crankLength = 0; //KL, distance between the center of the crank and floor (see Maro's docs)
    
    seatHeight = 0;
    seatSetback = 0;
    seatLength = 0;
    seatDrop = 0;
    spacerHeight = 0; //dl rama-siodelko
    stemLength = 0; //dl. wspornika (ger. Vorbau)
    stemAngle = 0;

    //to calculations
    frameHeight = 0; 
    crankLengthInInch = 0; 

    //stack = 0;
    //reach = 0;

    stackMin = 0
    reachMin = 0
    stackMax = 0
    reachMax = 0
    stack2ReachIndex1 = 0;
    stack2ReachIndex2 = 0;
    stack2ReachIndex3 = 0;

}

export { bikeParams, ridingStyle, bikeType, bikeTypeFromStr, ridingStyleFromStr };