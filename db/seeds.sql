--You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.

-- Insert departments
INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('HR');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 70000, 1),
('Sales Manager', 60000, 2),
('HR Specialist', 50000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Jones', 3, NULL),
('Michael', 'Brown', 1, 1);
