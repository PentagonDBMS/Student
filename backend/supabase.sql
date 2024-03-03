-- Correct the table name to 'students_or_externals' and add the missing comma before 'isstudent'
CREATE TABLE students_or_externals (
    students_or_externals_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    isstudent BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    college_name TEXT
);

-- Since 'organizers' is referenced before its creation, let's move its creation before 'events'
CREATE TABLE organizers (
    organizer_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    organizer_id INTEGER REFERENCES organizers(organizer_id)
);

CREATE TABLE db_admins (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Correct the foreign key reference to 'students_or_externals' and enforce student-only volunteering with a check constraint
CREATE TABLE volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    students_or_externals_id INTEGER REFERENCES students_or_externals(students_or_externals_id),
    event_id INTEGER REFERENCES events(event_id),
    UNIQUE(students_or_externals_id, event_id)
    -- CONSTRAINT fk_student_only FOREIGN KEY (students_or_externals_id) 
    --     REFERENCES students_or_externals(students_or_externals_id) 
    --     CHECK (isstudent = TRUE) -- This line enforces that only students can be volunteers
);

-- Correct the foreign key reference to 'students_or_externals' and adjust the UNIQUE constraint
CREATE TABLE event_participants (
    participation_id SERIAL PRIMARY KEY,
    students_or_externals_id INTEGER REFERENCES students_or_externals(students_or_externals_id),
    event_id INTEGER REFERENCES events(event_id),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(students_or_externals_id, event_id)
);
CREATE TABLE accommodation (
    accommodation_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    filled INT NOT NULL,
    capacity INT NOT NULL,
    photo_link TEXT
);
