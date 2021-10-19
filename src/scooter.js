class Scooter {
    static scootersList = [];

    //Initialise object
    constructor(scooterNum, currentChargePoint) {
        this.scooterNum = scooterNum;
        this.currentChargePoint = currentChargePoint;
        this.scooterCharge = 1;
        this.distanceTravelled = 0;

        //Adds scooter to scootersList when object created from this class
        this.constructor.scootersList.push(this);
    }

    checkCharged() {
        return (this.scooterCharge? true : false)
    }

    charge() {
        this.scooterCharge = 1;
    }

    recordDistance(journeyDistance) {
        journeyDistance > 32 ? 
            this.distanceTravelled = 32 : 
            this.distanceTravelled = journeyDistance
                
    }
}

module.exports = Scooter;