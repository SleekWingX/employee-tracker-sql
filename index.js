const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  deleteDepartment,
  updateEmployeeRole,
} = require('./db/queries');

async function main() {
  console.log('Welcome to the Employee Tracker');

  // Main menu options
  const choices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Delete a department',
    'Exit',
  ];

  // Ask user for action
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices,
  });

  switch (action) {
    case 'View all departments':
      const departments = await getAllDepartments();
      console.table(departments);
      break;

    case 'View all roles':
      const roles = await getAllRoles();
      console.table(roles);
      break;

    case 'View all employees':
      const employees = await getAllEmployees();
      console.table(employees);
      break;

    case 'Add a department':
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      });
      await addDepartment(departmentName);
      console.log('Department added successfully!');
      break;

      case 'Delete a department':
        const departmentsToDelete = await getAllDepartments();
        if (departmentsToDelete.length === 0) {
          console.log('There are no departments to delete.');
          break;
        }
        const departmentChoices = departmentsToDelete.map(({ id, name }) => ({
          name,
          value: id,
        }));
        const { departmentId } = await inquirer.prompt({
          type: 'list',
          name: 'departmentId',
          message: 'Select the department to delete:',
          choices: departmentChoices,
        });
        await deleteDepartment(departmentId);
        console.log('Department deleted successfully!');
        break;
  

    case 'Add a role':
      const departmentsForRole = await getAllDepartments();
      const roleData = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the salary for this role:',
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department for this role:',
          choices: departmentsForRole.map(({ id, name }) => ({ name, value: id })),
        },
      ]);
      await addRole(roleData.title, roleData.salary, roleData.departmentId);
      console.log('Role added successfully!');
      break;

    case 'Add an employee':
      const rolesForEmployee = await getAllRoles();
      const employeesForManager = await getAllEmployees();
      const employeeData = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the role for this employee:',
          choices: rolesForEmployee.map(({ id, title }) => ({ name: title, value: id })),
        },
        {
          type: 'list',
          name: 'managerId',
          message: 'Select the manager for this employee:',
          choices: [...employeesForManager.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id })), { name: 'None', value: null }],
        },
      ]);
      await addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId);
      console.log('Employee added successfully!');
      break;

    case 'Update an employee role':
      const employeesForUpdate = await getAllEmployees();
      const rolesForUpdate = await getAllRoles();
      const { employeeId, roleId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update:',
          choices: employeesForUpdate.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id })),
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the new role for the employee:',
          choices: rolesForUpdate.map(({ id, title }) => ({ name: title, value: id })),
        },
      ]);
      await updateEmployeeRole(employeeId, roleId);
      console.log('Employee role updated successfully!');
      break;

    case 'Exit':
      console.log('Exiting Employee Tracker...');
      process.exit(0);
      break;

    default:
      console.log('Invalid action');
      break;
  }

  // Restart the main function
  main();
}

// Call the main function to start the application
main();

