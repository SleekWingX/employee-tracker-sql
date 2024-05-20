const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  database: 'employee_tracker',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

const getAllDepartments = async () => {
  try {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
  } catch (error) {
    console.error('Error getting departments:', error);
    throw error;
  }
};

const getAllRoles = async () => {
  try {
    const result = await pool.query(`
      SELECT r.*, d.name AS department_name
      FROM role AS r
      INNER JOIN department AS d ON r.department_id = d.id
    `);
    return result.rows;
  } catch (error) {
    console.error('Error getting roles:', error);
    throw error;
  }
};

const getAllEmployees = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id,
        e.first_name,
        e.last_name,
        r.title AS role,
        d.name AS department,
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee AS e
      INNER JOIN role AS r ON e.role_id = r.id
      INNER JOIN department AS d ON r.department_id = d.id
      LEFT JOIN employee AS m ON e.manager_id = m.id
    `);
    return result.rows;
  } catch (error) {
    console.error('Error getting employees:', error);
    throw error;
  }
};

const addDepartment = async (name) => {
  try {
    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding department:', error);
    throw error;
  }
};

const addRole = async (title, salary, departmentId) => {
  try {
    const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding role:', error);
    throw error;
  }
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  try {
    const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

const updateEmployeeRole = async (employeeId, roleId) => {
  try {
    const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [roleId, employeeId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating employee role:', error);
    throw error;
  }
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
