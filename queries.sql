-- Creating initial table
CREATE TABLE study (
    id SERIAL PRIMARY KEY,
    is_completed BOOLEAN DEFAULT FALSE
    completed DATE,
    week_completed INTEGER,
    study_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    study_unit INTEGER NOT NULL DEFAULT 1
);

-- Creating ToDo Table
-- CREATE TABLE todo (
--     id SERIAL PRIMARY KEY,
--     study_type TEXT NOT NULL,
--     subject TEXT NOT NULL,
--     task TEXT
--     study_unit INTEGER NOT NULL DEFAULT 1,
--     is_completed BOOLEAN DEFAULT FALSE
-- )

-- Test Data
INSERT INTO study (completed, week_completed, study_type, subject) 
VALUES ('2024-06-05', 23, 'Lecture', 'Maths');

INSERT INTO study (subject, study_type, task)
VALUES ('Maths', 'Lecture', 'Write Lecture Notes'), ('English', 'Assignment', 'Complete First Draft'), ('Science', 'Tutorials', 'Attempt Tutorial Prep Questions');


-- Group By Queries
-- May need to add a where clause in here for additional filtering

-- Group by week completed
SELECT week_completed, SUM(study_unit)
FROM study
GROUP BY week_completed
ORDER BY week_completed;

-- Group by study type
SELECT study_type, SUM(study_unit)
FROM study
GROUP BY study_type
ORDER BY study_type;

-- Group by subject
SELECT subject, SUM(study_unit)
FROM study
GROUP BY subject
ORDER BY subject;

-- Group by study type and week
SELECT study_type, week_completed, SUM(study_unit) study_completed 
FROM study 
GROUP BY study_type, week_completed 
ORDER BY study_type

-- Filtering by completed date
-- Placeholder dates used here - we would get this from the user
-- If we want to filter by week numbers then we could first convert the dates to week numbers in JS
-- before running the SQL query
SELECT * FROM study
WHERE completed >= current_date - 30
LIMIT 6

INSERT INTO study (subject, study_type, task)
