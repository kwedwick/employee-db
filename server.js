
const connection = require('./db/database');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const sqlCalls = require('./utils/sql-calls');
//const { connect } = require('./db/database');




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
            let values = [res]
            console.table(values[0]);
            //taking user back to choice selection
            mainMenu();
        }
    )
};

// viewDepartments = () => {
//     connection.promise().query(
//         'SELECT * FROM department').then(values => {
//             console.table('\n', values[0]);
//         });
//         mainMenu();
// };

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
            let values = [res]
            console.table(values[0]);
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
            let values = [res]
            console.table(values[0]);
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
            let departmentName = response.department
            const params = [departmentName];
            console.log(params);
            const query = connection.query(
                'INSERT INTO department (name) VALUES (?)',
                params,
                function (err, res) {
                    if (err) throw err;
                    let values = [res]
                    //console.table(values[0]);
                    console.log(values[0]);
                    //taking user back to choice selection
                    mainMenu();
                }
            )
        })
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

async function addRole() {
    const department = await connection.promise().query('SELECT * FROM department')
    console.log(department[0]);
    const departmentChoices = department[0].map(({ id, name}) => ({
        name: `${name}`,
        value: id
    }));
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
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
                name: 'department',
                message: 'Choose a department:',
                choices: departmentChoices
            }
        ]).then(response => {
            console.log(response);
            let title = response.title;
            let salary = response.salary;
            let department_id = response.department;
            const params = [title, salary, department_id];
            console.log(params);
            const query = connection.query(
                'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                params,
                function (err, res) {
                    if (err) throw error;
                    let values = [res]
                    console.table(values[0]);
                    //taking user back to choice selection
                    mainMenu();
                }
            )
        })
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

async function addEmployee() {
    const manager = await connection.promise().query('SELECT id, first_name, last_name FROM employee WHERE employee.is_manager = 1')
    console.log(manager[0]);
    const managerChoices = manager[0].map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    console.log(managerChoices);
    const role = await connection.promise().query('SELECT id, title FROM role')
    const roleChoices = role[0].map(({ id, title}) => ({
        name: `${title}`,
        value: id
    }));
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Write only the FIRST NAME of EMPLOYEE:',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter only their FIRST NAME.");
                        return false;
                    }
                },
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Write only the LAST NAME of EMPLOYEE:',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log("Please enter only their LAST NAME.");
                        return false;
                    }
                },
            },
            {
                type: 'list',
                name: 'role',
                message: 'Choose a Role:',
                choices: roleChoices
            },
            {
                type: 'confirm',
                name: 'managerConfirm',
                message: 'Is this EMPLOYEE a Manager?',
                default: false
            },
            {
                type: 'confirm',
                name: 'addManagerConfirm',
                message: 'Add a manager?',
                default: true
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Choose a Manager:',
                when: ({ addManagerConfirm }) => addManagerConfirm,
                choices: managerChoices
            }
        ]).then(response => {
            console.log(response);
            let first_name = response.firstName;
            let last_name = response.lastName;
            let role_id = response.role;
            let isManager = response.managerConfirm;
            let manager_id = response.managerId;
            console.log(manager_id);
            let dbparams = {response}
            const params = [first_name, last_name, role_id, isManager, manager_id];
            //const params = []
            const query = connection.query(
                'INSERT INTO employee (first_name, last_name, role_id, is_manager, manager_id) VALUES (?,?,?,?,?)',
                params,
                function (err, res) {
                    if (err) throw err;
                    let values = [res];
                    console.table(values[0]);
                    //taking user back to choice selection
                    mainMenu();
                }
            )
        })
};

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
async function updateEmployeeRole() {
    const employees = await loadEmployees();//.catch(console.log(err));

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await connection.returnRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await connection.updateEmployeeRole(employeeId, roleId);

    console.log("Updated employee's role");

    mainMenu();
};