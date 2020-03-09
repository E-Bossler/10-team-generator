// GLOBAL MODULES

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require('axios');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// GLOBAL VARRIABLES

let team = [];

// GLOBAL FUNCTIONS

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function addNewEmployee() {
    inquirer.prompt(
        [
            {
                message: "What is this employee's name?",
                name: 'name'
            },
            {
                message: "What is their email address?",
                name: 'email'
            },
            {
                message: "What is their GitHub username?",
                name: 'gitHub'
            },
            {
                type: 'list',
                message: 'What is their position?',
                name: 'jobRole',
                choices: [
                    'Manager',
                    'Engineer',
                    'Intern'
                ]
            }
        ]

    ).then(function (answers) {
        let name = answers.name;
        let email = answers.email;
        let gitHub = answers.gitHub;
        let jobRole = answers.jobRole;
        
        if (answers.jobRole === 'Manager') {
            // console.log('getting here for manager')
            managerSpecificQuestions(name, email, gitHub, jobRole);
        } else if (answers.jobRole === 'Engineer') {
            // console.log('getting here for engineer')
            engineerSpecificQuestions(name, email, gitHub, jobRole);
        } else if (answers.jobRole === 'Intern') {
            // console.log('getting here for interns');
            internSpecificQuestions(name, email, gitHub, jobRole);
        }
    })
};

function managerSpecificQuestions(name, email, gitHub, jobRole) {
    inquirer.prompt(
        [
            {
                message: "What is their office number?",
                name: 'roomNumber'
            },
        ]
    ).then(function (answers) {
        let roomNumber = answers.roomNumber;
        team.push( new Manager (name, email, gitHub, jobRole, roomNumber));
        // console.log(team);
        anyOtherTeamMates();
    });
};

function engineerSpecificQuestions(name, email, gitHub, jobRole) {
    inquirer.prompt(
        [
            {
                message: "What is their portfolio website?",
                name: 'portfolio'
            },
        ]
    ).then(function (answers) {
        let portfolio = answers.portfolio;
        team.push( new Engineer (name, email, gitHub, jobRole, portfolio));
        // console.log(team);
        anyOtherTeamMates();
    });
};

function internSpecificQuestions(name, email, gitHub, jobRole) {
    inquirer.prompt(
        [
            {
                message: "Where are they currently enrolled at school?",
                name: 'school'
            },
        ]
    ).then(function (answers) {
        let school = answers.school;
        team.push( new Intern(name, email,gitHub, jobRole, school));
        // console.log(team);
        anyOtherTeamMates();
    });
};

function anyOtherTeamMates() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: "Do you have any other team members to include?",
                name: 'anyOther',
                choices: [
                    'Yes, I have another.',
                    "No, that's everyone."
                ]
            },
        ]
    ).then(function (answers) {
        if (answers.anyOther === 'Yes, I have another.') {
            addNewEmployee();
        } else {
            const html = render(team); 
            createHTML(html);
        }
    })
};

function createHTML(html) {
    fs.writeFile('./output/team.html', html, (err) => {
        if (err) {
            return err;
        }
    
        console.log('Team page generated to output folder.');
    })
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does 

// APPLICATION START

addNewEmployee();