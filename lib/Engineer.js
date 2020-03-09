// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee {
    constructor (name, email, gitHub, jobRole, portfolio) {
        super (name, email, gitHub, jobRole);
        this.portfolio = portfolio;
    };
    getRole() {
        return 'Engineer';
    };
    getPortfolio() {
        return this.portfolio;
    }
};

module.exports = Engineer;