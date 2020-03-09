// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee {
    constructor (name, email, gitHub, jobRole, roomNumber) {
        super (name, email, gitHub, jobRole);
        this.roomNumber = roomNumber;
    };
    getRole() {
        return 'Manager';
    };
    getOfficeNumber() {
        return this.roomNumber;
    }
};

module.exports = Manager;