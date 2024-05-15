const sequelize = require('../config/connection');
const Employee = require('../models/Employee');
const e = require('express');

const employeeData = require('./employeeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Employee.bulkCreate(employeeData);
  process.exit(0);
};

seedDatabase();