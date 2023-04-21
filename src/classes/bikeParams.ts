
enum bikeType {
    City,
    Mountain,
    Road,
}

enum ridingStyle {
    Ergonomic,
    Sport,
    Aerodynamic
}

//This class is to rebuild !!!! 
class bikeParams {
    type: bikeType = bikeType.City;
    style: ridingStyle = ridingStyle.Ergonomic;
    crankLength = 0; //KL, distance between the center of the crank and floor (see Maro's docs)
    seatHeigth = 0;
    seatSetback = 0;
    seatLength = 0;
    seatDrop = 0;
    spacerHeigth = 0; //dl rama-siodelko
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

export { bikeParams, ridingStyle, bikeType }