const mysql = require('mysql2');
const connection = require('../db/database');

function loadEmployees() {
    const params = {};
    const query = connection.query(
        'SELECT id, first_name, last_name FROM employee',
        params,
        function (err, res) {
            if (err) throw err;
            let values = [res]
            //console.log(values[0])
            const employeeChoices = values[0].map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            //console.log(employeeChoices)
            return employeeChoices
        }
    )
};

function returnRoles() {
    console.log('Loading Role database....\n');
    const params = {};
    const query = connection.query(
        'SELECT * FROM role',
        params,
        function (err, res) {
            if (err) throw err;
            let values = [res];
            
            const roleChoices = values[0].map(({ id, title }) => ({
                name: title,
                value: id
            }));
            return roleChoices;
        }
    )
};

function updateEmployeeRole(employeeId, roleId) {
    const params = [roleId, employeeId]
    const query = connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        params,
        function (err, res) {
            if (err) throw err;
            let values = [res];
            return values[0];
        }
    )
}

//module.exports = new DB(connection)
module.exports = { loadEmployees, returnRoles, updateEmployeeRole };