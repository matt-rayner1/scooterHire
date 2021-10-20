const Application = require('./application.js');
const Scooter = require('./scooter.js');
const User = require('./user.js');

//EXAMPLE INTERACTIONS/FLOW

//create object instances
const user1 = new User('user1', 34);
const user2 = new User('user2', 16);

const scooterApp = new Application();

const scooter1 = new Scooter(1, 'A');
const scooter2 = new Scooter(2, 'B');
const scooter3 = new Scooter(3, 'C');


//user2 downloads app (but is not 18 years old)
try {
    scooterApp.addUser(user2);
} catch (err) {
    //
}

//user1 downloads app, app will record this user
scooterApp.addUser(user1);

//app syncs scooterlist with Scooter class:
scooterApp.updateScooterList();



//user1 picks up scooter1 and rides it to new location
user1.pickupScooter(scooter1);
    //user1.usingScooter will = 1
    //scooter1 will be removed from scooterlist (during ride)

//user1 returns scooter to new location 'D'
user1.returnScooter('D');
    //user1.usingScooter will return to being -1
    //scooter1 will be in Scooter.scootersList at location D

//user1 reports scooter 3 as broken:
user1.reportBroken(scooter3);
    //scooter3 will be removed from Scooterlist
    //returns a string notifying maintenance to repair

//user1 reports scooter3 as broken again, will throw error
//  as it is not in current list of scooters
try {
    user1.reportBroken(scooter3);
} catch (err) {
    //
}

//user1 tries to ride scooter 2, which is not charged:
//  (will throw err)
scooter2.scooterCharge = 0;
try {
    user1.pickupScooter(scooter2)
} catch (err) {
    //
}

//user1 tries to ride scooter 3, which is not in list:
//  (will throw err)
try {
    user1.pickupScooter(scooter3)
} catch (err) {
    //
}

//scooter1.checkCharged() will be true
scooter1.checkCharged()
//scooter2.checkCharged() will be false
scooter2.checkCharged()

//charging scooter2:
scooter2.charge()
//recheck charge:
scooter2.checkCharged()

//scooter1 journey distance:
scooter1.recordDistance(25)

//charge user1 based on distance:
scooterApp.chargePayment(user1, scooter1.journeyDistance)