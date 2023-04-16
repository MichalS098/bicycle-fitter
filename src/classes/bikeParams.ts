
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

class bikeParams {
    seatLength = 0;
    seatHeigth = 0;
    seatSetback = 0;
    seatDrop = 0;
    spacerHeigth = 0; //dl rama-siodelko

    stemLength = 0; //dl. wspornika (ger. Vorbau)
    stemAngle = 0;

    frameHeight = 0;

    crankLength = 0; //KL, distance between the center of the crank and floor (see Maro's docs)

    stack = 0;
    reach = 0;

    handlebarX = 0; //wspolrzedna X kierownicy (?)

    type: bikeType = bikeType.City;
    style: ridingStyle = ridingStyle.Ergonomic;


}

export { bikeParams, ridingStyle, bikeType }