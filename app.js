const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

newEmp = [];

const startPrompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "managerOfficeNo",
            message: "What is your manager's office number?"
        },
    ]).then(function (answer) {
        const addManager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNo)
        // console.log(addManager)
        newEmp.push(addManager)
        // console.log(newEmp)
        chooseMemberType();
    })
}

const chooseMemberType = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "teamMemberType",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        },
    ]).then(function (answer) {
        if (answer.teamMemberType === "Intern") {
            InternPrompt();
        }
        else if (answer.teamMemberType === "Engineer") {
            EngineerPrompt();
        }
        else if (answer.teamMemberType === "I don't want to add any more team members") {
            renderHTML();
        }
    })
}

const InternPrompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "intName",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "intId",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "intEmail",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "intSchool",
            message: "Where does your intern attend school?"
        },
    ]).then(function (answer) {
        const addIntern = new Intern(answer.intName, answer.intId, answer.intEmail, answer.intSchool)
        // console.log(addIntern)
        newEmp.push(addIntern)
        // console.log(newEmp)
        chooseMemberType();
    })
}

const EngineerPrompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "engName",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "engId",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "engEmail",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "engGithub",
            message: "What is your engineer's Github username?"
        },
    ]).then(function (answer) {
        const addEngineer = new Engineer(answer.engName, answer.engId, answer.engEmail, answer.engGithub)
        // console.log(addEngineer)
        newEmp.push(addEngineer)
        chooseMemberType();
    })
}

function renderHTML() {
    fs.writeFile(outputPath, render, function (err, data) {
        if (err) {
            console.error(err)
            return
        }
    })
}

startPrompt();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
