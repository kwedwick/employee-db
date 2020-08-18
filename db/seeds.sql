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


INSERT INTO employee (first_name, last_name, role_id, is_manager, manager_id)
VALUES
('Bob', 'Barker', 3, 1, NULL),
('Barak', 'Obama', 1, 1, NULL),
('Angelina', 'Jolie', 6, 1, NULL),
('Nancy', 'Pelosi', 3, 1, NULL),
('Mitch', 'McConnel', 4, 1, NULL),
('Jane', 'Doe', 2, 0, 1),
('Kevin', 'Bacon', 2, 0, 2),
('Britney', 'Spears', 3, 0, 3),
('Nikki', 'Minaj', 4, 0, 4),
('Diana', 'Ross', 5, 0, 5),
('Carrie', 'Fisher', 1, 0, 1),
('Diane', 'Smith', 1, 0, 2),
('Bill', 'Nye', 2, 0, 3),
('Will', 'Smith', 4, 0, 4),
('Chris', 'Evans', 5, 0, 5);