const { notDeepEqual } = require('assert');
const Application = require('../src/application.js')
const Scooter = require('../src/scooter.js')
const User = require('../src/user.js')

//create 3 new scooter instances
var scooter1 = new Scooter(1, 'A');
var scooter2 = new Scooter(2, 'B');
var scooter3 = new Scooter(3, 'c');

//create 2 new user instances
var user1 = new User('user1', 25);
var user2 = new User('user2', 16);

//create 1 application instance
var scooterApp = new Application();


describe('Scooter class tests', () => {
    test('Scooter List should have 3 elements', () => {
        expect(Scooter.scootersList.length).toBe(3);
    })
    test('Scooter 1 should have scooterNum 1', () => {
        expect(scooter1.scooterNum).toBe(1);
    })
    test('Scooter 2 should have current charge point == B', () => {
        expect(scooter2.currentChargePoint).toBe('B');
    })
    test('Scooter 1 should have scooterCharge == 1', () => {
        expect(scooter1.scooterCharge).toBe(1)
    })
    test('Scooter 1 checkCharged() should be true', () => {
        expect(scooter1.checkCharged()).toBe(true)
    })
    test('Scooter 2 checkCharged() should be false', () => {
        scooter2.scooterCharge = 0;
        expect(scooter2.checkCharged()).toBe(false)
    })
    test('recordDistance(num) should be 32 if num > 32', () => {
        let num = 50;
        scooter3.recordDistance(num);
        expect(scooter3.distanceTravelled).toBe(32);
    })
    test('recordDistance(num) should be num if num < 32', () => {
        let num = 25;
        scooter3.recordDistance(num);
        expect(scooter3.distanceTravelled).toBe(num);
    })
})

describe('User class tests', () => {
    test('user list should have 2 elements', () => {
        expect(User.usersList.length).toBe(2);
    })
    test('user1 should have correct name', () => {
        expect(user1.name).toBe('user1')
    })
    test('user2 should have correct age', () => {
        expect(user2.ageData).toBe(16)
    })
    test('user1 should be able to pick up scooter 1 (fully charged)', () => {
        expect(user1.pickupScooter(scooter1))
            .toBe('User user1 is now using Scooter 1')
        expect(Scooter.scootersList.length).toBe(2)
    })
    test('user1 should not be able to pick up scooter 2 (not charged)', () => {
        scooter2.scooterCharge = 0;
        expect(() => user1.pickupScooter(scooter2))
            .toThrowError('Scooter was not fully charged')
    })
    test('user1 should not be able to pick up scooter already in use', () => {
        expect(() => user1.pickupScooter(scooter1))
            .toThrowError('Scooter was not found in scooter list')
    })
    test('user1 should be able to return scooter1 successfully', () => {
        expect(user1.returnScooter('B')).toBe('scooter 1 returned to charge point B')
        expect(Scooter.scootersList.length).toBe(3)
    })
    test('user1 should successfully report scooter 3 as broken', () => {
        expect(user1.reportBroken(scooter3))
            .toBe('Scooter 3 marked as faulty and taken off list of available scooters')
    })
    test('user1 should not be able to report a scooter as broken, if not in list', () => {
        expect(() => user1.reportBroken(scooter3))
            .toThrowError('Scooter was not found in scooter list')
    })
    test('charge() works properly', async () => {
        await scooter2.charge()
        expect(scooter2.scooterCharge).toBe(1)
    })
})

describe('Application class tests', () => {
    test('Should not add user to the list if they are under 18 years old', () => {
        expect(() => scooterApp.addUser(user2))
            .toThrowError('User is not old enough to use this service')
    })
    test('Should add user to list if they are over 18 years old', () => {
        scooterApp.addUser(user1)
        expect(scooterApp.usersRecord.length).toBe(1)
    })
    test('Should properly update available scooter list', () => {
        scooterApp.updateScooterList()
        expect(scooterApp.scootersListAvailable.length).toBe(2)
    })
    test('Should properly charge user', () => {
        expect(scooterApp.chargePayment(user1, 30))
            .toBe('User user1 has been charged £120')
    })
})