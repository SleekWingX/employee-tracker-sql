const inquirer = require('inquirer');
const { getAllDepartments } = require('./db/queries');

async function main() {
  console.log('Welcome to the Employee Tracker');

  const departments = await getAllDepartments();
  console.log(departments);
}

main();
