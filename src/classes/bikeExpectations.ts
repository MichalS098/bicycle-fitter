export class bikeExpectations{
    backOrNeckPain;
    butPain;
    kneePain;
    feetPain;
    clickPedal;
    nothing;

    constructor(backOrNeckPain: boolean,
        butPain: boolean,
        kneePain: boolean,
        feetPain: boolean,
        clickPedals: number,
        nothing: boolean
    )
    {
        this.backOrNeckPain = backOrNeckPain;
        this.butPain = butPain;
        this.kneePain = kneePain;
        this.feetPain = feetPain;
        this.clickPedal = clickPedals;
        this.nothing = nothing;
    }
}