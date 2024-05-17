-- Update employee role
-- Example: Update John Doe's role to Sales Manager
UPDATE employee
SET role_id = (SELECT id FROM role WHERE title = 'Sales Manager')
WHERE first_name = 'John' AND last_name = 'Doe';
