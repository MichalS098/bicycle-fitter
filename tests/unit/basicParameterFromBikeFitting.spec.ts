import { calculatedBikeFittingParams } from '@/functions/calculatedBikeFittingParams';
import { seatHeightCalc, sind, cosd } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { bikeParams, bikeType, ridingStyle } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';


describe('calculatedBikeFittingParams', () => {
  it('should return correct bike and person parameters', () => {

    // Przykładowe wartości wejściowe
    const clickPedals = 1;
    const neckOrBackPain = 2;
    const butPain = 2;
    const feetPain = 2;
    const kneePain = 2;
    const choiceFlexibilitySurvey = 1;
    const person = new humanParams(47, 42, 42, 81, 145, 70, 85, 190);
    const bike = new bikeParams();

    // Ustawienie wartości dla bike
    bike.type = bikeType.Road
    bike.style = ridingStyle.Sport
    bike.crankLength = 18
    bike.seatHeigth = 90
    bike.seatSetback = 20
    bike.seatLength = 40
    bike.seatDrop = -5
    bike.spacerHeigth = 2 //W programie matlabowym było to tak zdefiniowane 
    bike.stemLength = 10 //VL
    bike.stemAngle = 10 //VW

     // Wywołanie funkcji z przykładowymi wartościami wejściowymi
     const [returnedBike, returnedPerson] = calculatedBikeFittingParams(
      clickPedals,
      neckOrBackPain,
      butPain,
      feetPain,
      kneePain,
      choiceFlexibilitySurvey,
      person,
      bike
    );

    const footAngle = 13;
    let seatHeight: number = seatHeightCalc(person, footAngle);
    const supportX = 30;
    const supportY = 0;
    const S = 150

    const pelvisX = supportX - (cosd(74) * (seatHeight - bike.crankLength))
    const pelvisY = supportY + (sind(74) * (seatHeight - bike.crankLength))

    const H = 37.5
    const armX = pelvisX + cosd(H) * person.torsoHeight
    const armY = pelvisY + sind(H) * person.torsoHeight

    const handleX = armX + (sind(person.armTorsoangle + H - 90) * (person.armLength * 0.8))
    const handleY = armY - (cosd(person.armTorsoangle + H - 90) * (person.armLength * 0.8))

    const kgX = pelvisX + sind((180 - S) / 2) * person.thighLength
    const kgY = pelvisY - cosd((180 - S) / 2) * person.thighLength

    const spX = kgX
    const spY = kgY - person.shankLength
    const footTipX = spX + sind(90 - footAngle) * person.footLength

    const stemX = handleX - bike.stemLength * cosd(bike.stemAngle)
    const stemY = handleY - bike.stemLength * sind(bike.stemAngle)
    

    
    //expect(Math.round(drop)).toEqual(-2.51)
    expect(stemX).toEqual(76.84677206817196);
    expect(stemY).toEqual(50.064119427841284);
    expect(handleX).toEqual(86.69484959829404);
    expect(handleY).toEqual(51.800601204510585);
    expect(bike.crankLength).toEqual(18);
    expect(seatHeight).toEqual(85.03382177554003);
    expect(cosd(74)).toEqual(0.27563735581699916);
    expect(pelvisX).toEqual(11.522974615482166);
    expect(pelvisY).toEqual(64.43704520518263);
    expect(footTipX).toEqual(36.93119303323638);
    expect(pelvisX).toEqual(11.522974615482166);

    // Sprawdzanie czy zwrócone wartości są prawidłowe
    expect(returnedBike.seatDrop).toEqual(-12.6);
    expect(returnedBike.seatLength).toEqual(75.2);
    expect(returnedBike.seatHeigth).toEqual(90.5);
    expect(returnedBike.seatSetback).toEqual(20.1);
    expect(returnedBike.stemLength).toEqual(10);
    expect(returnedBike.stemAngle).toEqual(10);
    expect(returnedBike.frameHeight).toEqual(53.46);
    expect(returnedBike.stack2ReachIndex1).toEqual(46.1);
    expect(returnedBike.stack2ReachIndex2).toEqual(46.8);
    expect(returnedBike.stack2ReachIndex3).toEqual(0.9850427350427351);
    expect(returnedPerson.torsoangle).toEqual(37.5);
    expect(returnedPerson.armTorsoangle).toEqual(85);
    expect(returnedBike.spacerHeigth).toEqual(2);
    expect(returnedBike.stackMin).toEqual(36.8);
    expect(returnedBike.stackMax).toEqual(48.8);
    expect(returnedBike.reachMin).toEqual(55.0);
    expect(returnedBike.reachMax).toEqual(64.8);
    
    
    
    
  
  });
});