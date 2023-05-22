export class multiplierForMediaPipe{
    private _overallHeightMoreThan190;
    private _overallHeightMoreThan185;
    private _overallHeightMoreThan180;
    private _overallHeightMoreThan160;
    private _overallHeightLessThan160;

    constructor( overallHeightMoreThan190: number,
        overallHeightMoreThan185: number,
        overallHeightMoreThan180: number,
        overallHeightMoreThan160: number,
        overallHeightLessThan160: number,
       
    )
    {
        this._overallHeightMoreThan190 = overallHeightMoreThan190;
        this._overallHeightMoreThan185 = overallHeightMoreThan185;
        this._overallHeightMoreThan180 = overallHeightMoreThan180;
        this._overallHeightMoreThan160 = overallHeightMoreThan160;
        this._overallHeightLessThan160 = overallHeightLessThan160;
       
    }

    public correctValue(overallHeight: number, value: number): number {


        if(overallHeight > 190)
        {
            value = value*this._overallHeightMoreThan190;
        }

        if((overallHeight > 185) && (overallHeight <= 190))
        {
            value = value*this._overallHeightMoreThan185;
        }

        if((overallHeight > 180) && (overallHeight <= 185))
        {
            value = value*this._overallHeightMoreThan180;
        }

        if((overallHeight > 160) && (overallHeight <= 180))
        {
            value = value*this._overallHeightMoreThan160;
        }

        if(overallHeight < 160)
        {
            value = value*this._overallHeightLessThan160;
        }


        return value;
    }
}