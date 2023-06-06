


/*This class describes immutable body measurements, like arm length.*/
class humanParams {
    private _shankLength; //podudzie, piszczel
    private _thighLength; //udo
    private _legLength;
    private _shoeSize; //EU
    private _footLength; //stopa, nie rozmiar buta, a fizyczna dulgosc
    inseamLength; //wewnątrznoga
    private _shoulderHeight; //floor-shoulder height
    armLength;
    /*OPIS DZIALANIA Arm-Torsoangle
    Suwak steruje wartoscia AR(Arm-Torsoangle) w zakresie 50(min) do 90(max)*/
    armTorsoangle; //AR - armrumpf
    overallHeight; //feet-head
    torsoHeight;
    /*OPIS DZIAŁANIA SUWAKA AERODYNAMIC <> ERGONOMIC <> COMFORTABLE 
 SUWAK STERUJE WARTOSCIA H(Torsoangle) w zakresie 25.0(AERODYNAMIC) 42.5(ERGONOMIC) 60(COMFORTABLE) */
    torsoangle;
    choiceFlexibilitySurvey;





    constructor(
        shankLength: number,
        thighLength: number,
        shoeSize: number,
        inseamLength: number,
        shoulderHeight: number,
        armLength: number,
        armTorsoangle: number,
        overallHeight: number,
        torsoangle: number,
        choiceFlexibilitySurvey: number
    ) {
        this._shankLength = shankLength;
        this._thighLength = thighLength * 0.83;
        this._legLength = this._shankLength + this._thighLength;
        this._shoeSize = shoeSize;
        this._footLength = (this._shoeSize * 0.52) * 0.77;
        this.inseamLength = inseamLength;
        this._shoulderHeight = shoulderHeight;
        this.armLength = armLength;
        this.armTorsoangle = armTorsoangle;
        this.torsoangle = torsoangle;
        this.overallHeight = overallHeight;
        this.torsoHeight = (this._shoulderHeight - (this._legLength)) * 0.9;
        this.choiceFlexibilitySurvey = choiceFlexibilitySurvey;
        //this.torsoHeight = this._shoulderHeight - this.inseamLength
    }

    get thighLength(): number {
        return this._thighLength;
    }

    get legLength(): number {
        return this._legLength;
    }

    get shoeSize(): number {
        return this._shoeSize;
    }

    get shankLength(): number {
        return this._shankLength;
    }

    get footLength(): number {
        return this._footLength;
    }

    get shoulderHeight(): number {
        return this._shoulderHeight;
    }

    set setThighLength(thighLength: number) {
        this._thighLength = thighLength * 0.83;
        this._legLength = this._shankLength + thighLength;
        this.torsoHeight = (this._shoulderHeight - (this._legLength)) * 0.9;
    }

    set setShankLength(shankLength: number) {
        this._shankLength = shankLength;
        this._legLength = shankLength + this._thighLength;
        this.torsoHeight = (this._shoulderHeight - (this._legLength)) * 0.9;
    }

    set setShoeSize(shoeSize: number) {
        this._shoeSize = shoeSize;
        this._footLength = (shoeSize * 0.52) * 0.77;
    }

    set setShoulderHeight(shoulderHeight: number) {
        this._shoulderHeight = shoulderHeight;
        this.torsoHeight = (this._shoulderHeight - (this._legLength)) * 0.9;
    }
}

export { humanParams }