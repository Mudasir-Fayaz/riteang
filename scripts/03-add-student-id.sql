-- Add student_id column to existing students table if it doesn't exist
ALTER TABLE students ADD COLUMN IF NOT EXISTS student_id VARCHAR(10) UNIQUE;

-- Update existing students with unique student IDs
DO $$
DECLARE
    student_record RECORD;
    counter INTEGER := 10;
BEGIN
    FOR student_record IN SELECT id FROM students WHERE student_id IS NULL ORDER BY id
    LOOP
        UPDATE students SET student_id = 'S' || counter WHERE id = student_record.id;
        counter := counter + 1;
    END LOOP;
END $$;

-- Make student_id NOT NULL after updating existing records
ALTER TABLE students ALTER COLUMN student_id SET NOT NULL;
