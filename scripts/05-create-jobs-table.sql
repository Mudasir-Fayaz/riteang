-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    qualification_required VARCHAR(255),
    certificates_required TEXT[], -- Array of strings for required certificate titles
    status VARCHAR(20) DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'completed', 'closed')),
    applicants JSONB DEFAULT '[]'::jsonb, -- Array of objects: [{ student_id: 'S10', application_date: 'ISOString' }]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
