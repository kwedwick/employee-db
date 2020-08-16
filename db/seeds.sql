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
('Diane', 'Smith', 1, 3),
('Jane', 'Doe', 2, 6),
('Bob', 'Barker', 3, NULL),
('Will', 'Smith', 4, 12),
('Chris', 'Evans', 5, 14),
('Angelina', 'Jolie', 6, NULL),
('Kevin', 'Bacon', 2, 15),
('Britney', 'Spears', 3, 3),
('Nikki', 'Minaj', 4, 6),
('Diana', 'Ross', 5, 12),
('Carrie', 'Fisher', 1, 14),
('Barak', 'Obama', 1, NULL),
('Bill', 'Nye', 2, 15),
('Nancy', 'Pelosi', 3, NULL),
('Mitch', 'McConnel', 4, NULL);