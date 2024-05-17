-- Insert sample departments
INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Human Resources');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES 
  ('Software Engineer', 80000, 1),
  ('Sales Manager', 90000, 2),
  ('HR Specialist', 60000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jack', 'Yazzie', 1, NULL),
  ('Erica', 'Balderas', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1);
