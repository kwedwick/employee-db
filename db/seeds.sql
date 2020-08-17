USE employee_db;

INSERT INTO department (name)
VALUES
    ('HR'),
    ('IT'),
    ('Marketing'),
    ('Legal'),
    ('Finance');


INSERT INTO role (title, salary, department_id)
VALUES
('HR Manager', '58000', 1),
('HR Assistant', '40000', 1),
('Lead Engineer', '55000', 2),
('Accountant', '60000', 5),
('Software Engineer', '55000', 2),
('Sales Lead', '50000', 3),
('Lawyer', '75000', 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Barker', 3, NULL),
('Barak', 'Obama', 1, NULL),
('Angelina', 'Jolie', 6, NULL),
('Nancy', 'Pelosi', 3, NULL),
('Mitch', 'McConnel', 4, NULL),
('Jane', 'Doe', 2, 1),
('Kevin', 'Bacon', 2, 2),
('Britney', 'Spears', 3, 3),
('Nikki', 'Minaj', 4, 4),
('Diana', 'Ross', 5, 5),
('Carrie', 'Fisher', 1, 1),
('Diane', 'Smith', 1, 2),
('Bill', 'Nye', 2, 3),
('Will', 'Smith', 4, 4),
('Chris', 'Evans', 5, 5);