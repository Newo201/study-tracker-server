-- Creating initial table
CREATE TABLE study (
    id SERIAL PRIMARY KEY,
    completed DATE NOT NULL DEFAULT CURRENT_DATE,
    week_completed INTEGER NOT NULL,
    study_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    study_unit INTEGER NOT NULL DEFAULT 1
);

-- Test Data
INSERT INTO study (week_completed, study_type, subject) 
VALUES (23, 'Lecture', 'Maths');

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

-- Filtering by completed date
-- Placeholder dates used here - we would get this from the user
-- If we want to filter by week numbers then we could first convert the dates to week numbers in JS
-- before running the SQL query
SELECT * FROM study
WHERE completed BETWEEN '2024-05-01' AND '2024-06-01'

