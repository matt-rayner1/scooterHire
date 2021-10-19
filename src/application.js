const Scooter = require('./scooter.js')

class Application {
    constructor() {
        this.usersRecord = [];
        this.scootersListAvailable = [];
    }

    //adds user to usersRecord ONLY if user is of age, else throws error
    addUser(user) {
        if(this.verifyAge(user.ageData)) {
            this.usersRecord.push(user);
        }
        else {
            throw new Error('User is not old enough to use this service');
        }
    }

    verifyAge(age) {
        return age >= 18 ? true: false;
    }

    //'syncs' Application scootersListAvailable with Scooter class scootersList
    updateScooterList() {
        this.scootersListAvailable = Scooter.scootersList
    }

    //charges user based on distance travelled.
    chargePayment(user, distanceTravelled) {
        let moneyAmount = distanceTravelled * 4
        return `User ${user.name} has been charged £${moneyAmount}`
    }
}

module.exports = Application;