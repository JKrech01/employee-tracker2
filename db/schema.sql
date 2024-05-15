-- Switch to postgres user to drop database if exists
\c postgres;
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employee_db;

-- CREATE TABLE
--     department(
--         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--         name VARCHAR(30) NOT NULL
--         );
CREATE TABLE
department(
    id: SERIAL PRIMARY KEY,
    name: VARCHAR(30) UNIQUE NOT NULL
)     ;
CREATE TABLE
role(
    id: SERIAL PRIMARY KEY,
    title: VARCHAR(30) UNIQUE NOT NULL,
    salary: DECIMAL NOT NULL,
    department_id: INTEGER NOT NULL,
)   

--manager_id: INTEGER to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
CREATE TABLE employee(
    id: SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

INSERT INTO employee(first_name, last_name, roles_id, manager_id)
VALUES("John", "Krech", 1, NULL),
    ("Jane", "Doe", 2, 1),
    ("Bob", "Boberson", 3, NULL),
    ("Jill", "Jones", 4, 3),
    ("Sergio", "Funk", 5, NULL),
    ("Taylor", "Alex", 6, 5),
    ("Jake", "Jones", 7, NULL),
    ("Jessica", "Trujillo", 8, 7),
    ("Heather", "Krech", 9, NULL),
    ("Sydney", "Krech", 10, 9);

SELECT * FROM department;
SELECT * FROM roles;

SELECT roles.title, department.name
    FROM roles
    JOIN deparment ON roles.department_id = department.id;

SELECT * FROM employee;
SELECT * FROM roles;

--SELECT employee.id, roles.department_id
--    FROM roles
--    JOIN employee ON employee.roles_id = roles.id;
--    JOIN employee ON employee.manager_id = employee.id;
-- pool.query(
    --SELECT e.id, e.first_name, e.last_name, roles.title, department.name as department, roles.salary, CONCAT(manager.first_name, '', manager.last_name) as manager
    --FROM employee e
    --JOIN roles ON e.roles_id = roles.id
   -- JOIN department ON roles.department_id = department.id
    --JOIN employee as manager ON e.manager_id = manager.id;
   -- LEFT JOIN employee manager ON e.manager_id = manager.id;)



SELECT e.id, e.first_name, e.last_name, roles.title, department.name as department, roles.salary, CONCAT(manager.first_name, '', manager.last_name) as manager
    FROM employee e
    JOIN roles ON e.roles_id = roles.id
    JOIN department ON roles.department_id = department.id
    --JOIN employee as manager ON e.manager_id = manager.id;
    LEFT JOIN employee manager ON e.manager_id = manager.id;

    -- We want to combine manager.first_name + " " + manager.last_name
    -- SQL method to join these together begins with CONCAT(manager.first_name, '', manager.last_name)