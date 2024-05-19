const { Employee } = require('pg');
// const require = require('dotenv').config();
// const require = require('pg');

const employee = ({
  user: 'postgres',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});


employee.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error setting up the database:', err.stack));

// const employee = new Employee({
//   user: 'postgres', // replace with your PostgreSQL username
//   host: 'localhost', // replace with your PostgreSQL host
//   database: 'postgres',
//   password: 'yourpassword', // replace with your PostgreSQL password
//   port: 5432, // replace with your PostgreSQL port
// });

async function setupDatabase() {
  try {
    await employee.connect();

    // Drop the database if it exists and create a new one
    await employee.query('DROP DATABASE IF EXISTS employees_db');
    await employee.query('CREATE DATABASE employees_db');

    // Connect to the new database
    await employee.query('\\c employees_db');

    // Create department table
    await employee.query(`
      CREATE TABLE department (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL
      );
    `);

    // Create role table
    await employee.query(`
      CREATE TABLE role (
        id SERIAL PRIMARY KEY,
        title VARCHAR(30) UNIQUE NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INTEGER NOT NULL REFERENCES department(id)
      );
    `);

    // Create employee table
    await employee.query(`
      CREATE TABLE employee (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        roles_id INT NOT NULL REFERENCES role(id) ON DELETE SET NULL,
        manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL
      );
    `);

    // Insert sample data into employee table
    await employee.query(`
      INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES
        ('John', 'Krech', 1, NULL),
        ('Jane', 'Doe', 2, 1),
        ('Bob', 'Boberson', 3, NULL),
        ('Jill', 'Jones', 4, 3),
        ('Sergio', 'Funk', 5, NULL),
        ('Taylor', 'Alex', 6, 5),
        ('Jake', 'Jones', 7, NULL),
        ('Jessica', 'Trujillo', 8, 7),
        ('Heather', 'Krech', 9, NULL),
        ('Sydney', 'Krech', 10, 9);
    `);

    // Example queries to select data
    const departments = await employee.query('SELECT * FROM department');
    console.log('Departments:', departments.rows);

    const roles = await employee.query('SELECT * FROM role');
    console.log('Roles:', roles.rows);

    const employees = await employee.query('SELECT * FROM employee');
    console.log('Employees:', employees.rows);

    const employeeRoles = await employee.query(`
      SELECT roles.title, department.name
      FROM role
      JOIN department ON role.department_id = department.id;
    `);
    console.log('Employee Roles:', employeeRoles.rows);

    const detailedEmployees = await employee.query(`
      SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, 
             CONCAT(manager.first_name, ' ', manager.last_name) as manager
      FROM employee e
      JOIN role ON e.roles_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON e.manager_id = manager.id;
    `);
    console.log('Detailed Employees:', detailedEmployees.rows);

  } catch (error) {
    console.error('Error setting up the database:', error);
  } finally {
    await employee.end();
  }
}

setupDatabase();

module.exports = {
  Employee,
};
