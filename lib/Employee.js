// TODO: Write code to define and export the Employee class

class Employee {
    constructor (name, email, gitHub, jobRole) {
        this.name = name;
        this.email = email;
        this.gitHub = gitHub;
        this.jobRole = jobRole;
    };
    getName() {
        return this.name;
    };
    getEmail() {
        return this.email;
    };
    getGitHub() {
        return this.gitHub;
    }
    getRole() {
        return 'Employee';
    }  ;
}

module.exports = Employee; 