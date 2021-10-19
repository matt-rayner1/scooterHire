const Scooter = require('./scooter.js')

class User {
    static usersList = [];

    //initialise object
    constructor(name, ageData) {
        this.name = name;
        this.ageData = ageData;
        this.usingScooter = -1;

        //any time an object is made from this class, it is added to 'usersList' record
        this.constructor.usersList.push(this);
    }

    //User picks up a scooter. If scooter is in Scooter class' scooterList,
    //  AND if the scooterCharge is 1
    //  THEN scooter will be 'picked up',
    //  AND scooter will be removed from 'scooterList'
    pickupScooter(scooter) {
        const index = Scooter.scootersList.indexOf(scooter);
        if(index > -1) {
            if(scooter.scooterCharge === 1) {
                this.usingScooter = scooter.scooterNum;
                Scooter.scootersList.splice(index, 1);
                return `User ${this.name} is now using Scooter ${this.usingScooter}`;
            }
            else {
                throw new Error('Scooter was not fully charged')
            }
        }
        else {
            throw new Error('Scooter was not found in scooter list');
        }
    }

    //returns scooter to the scooterList at specified charging point
    returnScooter(chargePoint) {
        let scooterNum = this.usingScooter;
        this.usingScooter = -1;
        new Scooter(scooterNum, chargePoint)
        return `scooter ${scooterNum} returned to charge point ${chargePoint}`;
    }

    //reports broken scooter
    //  takes scooter out of scootersList, or throws error if scooter not found.
    reportBroken(scooter) {
        const index = Scooter.scootersList.indexOf(scooter);
        if(index > -1) {
            Scooter.scootersList.splice(index, 1);
            return `Scooter ${scooter.scooterNum} marked as faulty and taken off list of available scooters`
        }
        else {
            throw new Error('Scooter was not found in scooter list');
        }
    }
}

module.exports = User;