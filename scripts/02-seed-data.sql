-- Insert default admin
INSERT INTO admin (username, password) VALUES 
('admin', 'admin123') ON CONFLICT (username) DO NOTHING;

-- Insert sample teachers
INSERT INTO teachers (username, password) VALUES 
('teacher1', 'teacher123'),
('teacher2', 'teacher456') ON CONFLICT (username) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (title, description, duration, fee, paid, certification_given, teacher) VALUES 
('Web Development Fundamentals', 'Learn HTML, CSS, and JavaScript basics', '3 months', 299.99, true, true, 1),
('Data Science Basics', 'Introduction to Python and data analysis', '4 months', 399.99, true, true, 2),
('Free Programming Course', 'Basic programming concepts for beginners', '2 months', 0.00, false, false, 1) ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (notification_title, notification_description) VALUES 
('Welcome to RITE Education', 'Welcome to our education platform. Start exploring courses today!'),
('New Course Available', 'Check out our latest Web Development course with certification.') ON CONFLICT DO NOTHING;

-- Insert sample examinations
INSERT INTO examinations (exam_title, exam_description, exam_date) VALUES 
('Web Development Final Exam', 'Comprehensive exam covering HTML, CSS, and JavaScript', '2024-02-15'),
('Data Science Assessment', 'Python and data analysis practical exam', '2024-02-20') ON CONFLICT DO NOTHING;
