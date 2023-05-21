import { calculatedBikeFittingParams } from '@/functions/calculatedBikeFittingParams';
import { seatHeightCalc, sind, cosd } from '@/functions/bikefittinglogic/bikeFittingParamsLogic';
import { bikeParams, bikeType, ridingStyle } from '@/classes/bikeParams';
import { humanParams } from '@/classes/humanParams';
import { bikeExpectations } from '@/classes/bikeExpectations';


describe('calculatedBikeFittingParams', () => {
  it('should return correct bike and person parameters', () => {

    // Przykładowe wartości wejściowe
    const person = new humanParams(47, 42, 42, 81, 145, 70, 85, 190,0); //static write 
    //const person = new humanParams(0.3818923337112611, 0.33762064071644726, 44, 0.7888170281086873, 1.3059663404411772, 0.48638949800378456, 85, 180, 45); //dynamic write from mediapipe 
    const clickPedals = 1;
    const neckOrBackPain = 2;
    const butPain = 2;
    const feetPain = 2;
    const kneePain = 2;
    const choiceFlexibilitySurvey = 1;

    const bikeExpectationsTemp = new bikeExpectations(false,
      false,
      false,
      false,
      false, false);

    const newBikeParams = new bikeParams(bikeType.Road,ridingStyle.Sport, 18, 10, 10, bikeExpectationsTemp, 1);

    // Wywołanie funkcji z przykładowymi wartościami wejściowymi
    const [returnedBike, returnedPerson] = calculatedBikeFittingParams(
      person,
      newBikeParams
    );

    const footAngle = 13;
    let seatHeight: number = seatHeightCalc(person, footAngle);
    const supportX = 30;
    const supportY = 0;
    const S = 150

    const pelvisX = supportX - (cosd(74) * (seatHeight - newBikeParams.crankLength))
    const pelvisY = supportY + (sind(74) * (seatHeight - newBikeParams.crankLength))

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

    const stemX = handleX - newBikeParams.stemLength * cosd(newBikeParams.stemAngle)
    const stemY = handleY - newBikeParams.stemLength * sind(newBikeParams.stemAngle)


    // console.log("seatHeight: ", returnedBike.seatHeight);
    // console.log("seatSetback: ", returnedBike.seatSetback);
    // console.log("seatLength: ", returnedBike.seatLength);
    // console.log("seatDrop: ", returnedBike.seatDrop);
    // console.log("spacerHeight: ", returnedBike.spacerHeight);
    // console.log("stemLength: ", returnedBike.stemLength);
    // console.log("stemAngle: ", returnedBike.stemAngle);
    // console.log("stackMin: ", returnedBike.stackMin);
    // console.log("reachMin: ", returnedBike.reachMin);
    // console.log("stackMax: ", returnedBike.stackMax);
    // console.log("reachMax: ", returnedBike.reachMax);
    // console.log("stack2ReachIndex1: ", returnedBike.stack2ReachIndex1);
    // console.log("stack2ReachIndex2: ", returnedBike.stack2ReachIndex2);
    // console.log("stack2ReachIndex3: ", returnedBike.stack2ReachIndex3);

    //expect(Math.round(drop)).toEqual(-2.51)
    expect(stemX).toEqual(76.84677206817196);
    expect(stemY).toEqual(50.064119427841284);
    expect(handleX).toEqual(86.69484959829404);
    expect(handleY).toEqual(51.800601204510585);
    expect(newBikeParams.crankLength).toEqual(18);
    expect(seatHeight).toEqual(85.03382177554003);
    expect(cosd(74)).toEqual(0.27563735581699916);
    expect(pelvisX).toEqual(11.522974615482166);
    expect(pelvisY).toEqual(64.43704520518263);
    expect(footTipX).toEqual(36.93119303323638);
    expect(pelvisX).toEqual(11.522974615482166);

    // Sprawdzanie czy zwrócone wartości są prawidłowe
    expect(returnedBike.seatDrop).toEqual(-12.6);
    expect(returnedBike.seatLength).toEqual(75.2);
    expect(returnedBike.seatHeight).toEqual(90.5);
    expect(returnedBike.seatSetback).toEqual(20.1);
    expect(returnedBike.stemLength).toEqual(10);
    expect(returnedBike.stemAngle).toEqual(10);
    expect(returnedBike.frameHeight).toEqual(53.46);
    expect(returnedBike.stack2ReachIndex1).toEqual(46.1);
    expect(returnedBike.stack2ReachIndex2).toEqual(46.8);
    expect(returnedBike.stack2ReachIndex3).toEqual(0.9850427350427351);
    expect(returnedPerson.torsoangle).toEqual(37.5);
    expect(returnedPerson.armTorsoangle).toEqual(85);
    expect(returnedBike.stackMin).toEqual(36.8);
    expect(returnedBike.stackMax).toEqual(48.8);
    expect(returnedBike.reachMin).toEqual(55.0);
    expect(returnedBike.reachMax).toEqual(64.8);





  });
});