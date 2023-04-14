


/*This class describes immutable body measurements, like arm length.*/ 
class humanParams {
    shankLength = 0; //podudzie, piszczel
    thighLength = 0; //udo
    legLength = this.shankLength + this.thighLength
    footLength = 0; //stopa, nie rozmiar buta, a fizyczna dulgosc
    inseamLength = 0; //wewnątrznoga
    shoulderHeight = 0; //floor-shoulder height
    armLength = 0;
    bicepLength = 0; //AR - armrumpf
    overallHeight = 0; //feet-head
    torsoHeight = 0;
}

export {humanParams}