
//const db = require('./db/database');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Elephantww67?',
    database: 'employee_db'
});

// connection.query(
//     'SELECT * FROM employee',
//     function(err, results, fields) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(results);
//     }
// );

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    mainMenu();
});


//connection.promise() answers return and asks database // source it with schema and seeds / source schema.sql; enter source seeds.sql;

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menuConfirm',
                message: 'What would you like to do?',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
            }
        ]).then(userChoice => {
            switch (userChoice.menuConfirm) {
                case "View all departments":
                    console.log("all dept")
                    viewDepartments();
                    break;
                case "View all roles":
                    console.log("all roles")
                    viewRoles();
                    break;
                case "View all employees":
                    console.log("all employees")
                    viewEmployees();
                    break;
                case "Add a department":
                    console.log("add dept")
                    addDeparment();
                    break;
                case "Add a role":
                    console.log("add role")
                    addRole();
                    break;
                case "Add an employee":
                    console.log("add employee")
                    addEmployee();
                    break;
                case "Update an employee role":
                    console.log("update employee")
                    updateEmployeeRole();
                    break;
            }
        });
};

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

viewDepartments = () => {
    console.log('Loading Department database....\n');
    const params = {};
    const query = connection.query(
        'SELECT * FROM department',
        params,
        function (err, res) {
            if (err) throw err;
            console.log(res);
            //console.table(values[0]);
            //taking user back to choice selection
            mainMenu();
        }
    )
};

//console.log(query.sql);
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

viewRoles = () => {
    console.log('Loading Role database....\n');
    const params = {};
    const query = connection.query(
        'SELECT * FROM role',
        params,
        function (err, res) {
            if (err) throw err;
            console.log(res);
            //console.table(values[0]);
            //taking user back to choice selection
            mainMenu();
        }
    )
};

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

viewEmployees = () => {
    console.log('Loading Employee database....\n');
    const params = {};
    const query = connection.query(
        'SELECT * FROM employee',
        params,
        function (err, res) {
            if (err) throw err;
            console.log(res);
            //console.table(values[0]);
            //taking user back to choice selection
            mainMenu();
        }
    )
};

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

addDeparment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Write the name of the new DEPARTMENT:',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter a DEPARTMENT name.");
                        return false;
                    }
                },
            },
        ]).then(response => {
            let userInput = response.department
            console.log(userInput);
            const params = [(userInput)];
            console.log(params);
            const query = connection.query(
                'INSERT INTO department (name) VALUES = ?',
                params,
                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    //console.table(values[0]);
                    //taking user back to choice selection
                    mainMenu();
                }
            )
        })
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Write the name of the new ROLE:',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter a ROLE name.");
                        return false;
                    }
                },
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary:',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log("Please enter the salary as a NUMBER");
                        return false;
                    }
                },
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Choose a department:',
                choices: []
            },
        ]).then(response => {
            console.log(response);
            let role = response.role;
            let salary = response.salary;
            let departmentId = response.id;
            console.log(userInput);
            const params = [role, salary, departmentId];
            const query = connection.query(
                'INSERT INTO role (name)',
                params,
                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    //console.table(values[0]);
                    //taking user back to choice selection
                    mainMenu();
                }
            )
        })
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 