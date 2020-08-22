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
            return values[0]
            //taking user back to choice selection
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
            return values[0];
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