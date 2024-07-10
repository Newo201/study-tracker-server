import express from "express"
import bodyParser from "body-parser";
import pg from "pg"
import moment from "moment"
import env from "dotenv";
import { start } from "repl";

const port = 5000
const app = express()

env.config()

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

db.connect()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// const test = moment("2024-06-04", "YYYY-MM-DD").week()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/study", async (req, res) => {
    // Add in Date Filtering
    console.log(req.query)
    const {start_date, end_date} = req.query
    const result = await db.query("SELECT week_completed, SUM(study_unit) study_completed FROM study WHERE completed BETWEEN $1 AND $2 GROUP BY week_completed ORDER BY week_completed",
    [start_date, end_date])  
    console.log(result.rows)
    res.json(result.rows)
}) 

app.get("/study/subject", async (req, res) => {
    // For stacked bar chart we want to group by the week completed as well
    const {start_date, end_date} = req.query
    let result
    if (req.query.filterWeek) {
        result = await db.query("SELECT subject, week_completed, SUM(study_unit) study_completed FROM study WHERE completed BETWEEN $1 AND $2 GROUP BY subject, week_completed ORDER BY subject",
            [start_date, end_date]
        ) 
    } else {
        result = await db.query("SELECT subject, SUM(study_unit) study_completed FROM study WHERE completed BETWEEN $1 AND $2 GROUP BY subject ORDER BY subject",
            [start_date, end_date]
        ) 
    }
    console.log(result.rows)
    res.send(result.rows)
})

app.get("/study/type", async (req, res) => {
    // For stacked bar chart we want to group by the week completed as well
    const {start_date, end_date} = req.query
    let result
    if (req.query.filterWeek) {
        result = await db.query("SELECT study_type, week_completed, SUM(study_unit) study_completed FROM study WHERE completed BETWEEN $1 AND $2 GROUP BY study_type, week_completed ORDER BY study_type",
            [start_date, end_date]
        )
    } else {
        result = await db.query("SELECT study_type, SUM(study_unit) study_completed FROM study WHERE completed BETWEEN $1 AND $2 GROUP BY study_type ORDER BY study_type",
            [start_date, end_date]
        )  
    }
    console.log(result.rows)
    res.send(result.rows)
})

// Add a new ToDo to the list
app.post("/study", async(req, res) => {
    const {subject, study_type, task} = req.body
    const newToDo = await db.query("INSERT INTO study (subject, study_type, task) VALUES ($1, $2, $3) RETURNING *", [subject, study_type, task])
    res.send(newToDo.rows[0])
})

// Modify the contents of an uncompleted ToDo
app.patch("/study/:id", async(req, res) => {
    const {subject, study_type, task} = req.body
    // Check if the task has already been completed
    const getToDo = await db.query("SELECT is_completed FROM study WHERE id = $1", [req.params.id])
    if (getToDo.rows[0].is_completed) {
        // Update the database
        const update = await db.query("UPDATE study SET subject = $1, study_type = $2, task = $3 WHERE id = $4 RETURNING *", [subject, study_type, task, req.params.id])
        res.send(update.rows[0])
    } else {
        res.send("ToDo has already been marked as completed")
    }
})

// Mark a ToDo as completed
app.patch("/study/completed/:id", async (req, res) => {
    // Find the current date
    const currDate = new Date().toLocaleDateString().split('T')[0]
    // Convert to week number
    const weekNum = moment(currDate, "DD/MM/YYYY").week()
    // Check if the task has already been completed
    const getToDo = await db.query("SELECT is_completed FROM study WHERE id = $1", [req.params.id])
    if (getToDo.rows[0].is_completed) {
        // Update the databse
        const update = await db.query("UPDATE study SET is_completed = true, completed = $1, week_completed = $2 WHERE id = $3 RETURNING *", [currDate, weekNum, req.params.id])
        res.send(update.rows[0])
    } else {
        res.send("ToDo has already been marked as completed")
    }
})

// Duplicate the current todo
app.post("/study/duplicate/:id", async (req, res) => {
    const result = await db.query("SELECT study_type, subject, task FROM study WHERE id = ($1)", [req.params.id])
    const currentToDo = result.rows[0]
    const newToDo = await db.query("INSERT INTO study (subject, study_type, task) VALUES ($1, $2, $3) RETURNING *", [currentToDo.subject, currentToDo.study_type, currentToDo.task])
    res.send(newToDo.rows[0])
})

// Delete a ToDo
app.delete("/study/:id", async (req, res) => {
    // Check if the task has already been completed
    const getToDo = await db.query("SELECT is_completed FROM study WHERE id = $1", [req.params.id])
    console.log(getToDo.rows)
    try {
        if (getToDo.rows[0].is_completed == false) {
            const deleteToDo = await db.query("DELETE FROM study WHERE id = $1 RETURNING *", [req.params.id])
            res.send(deleteToDo.rows[0])
        } else {
            res.send("Cannot delete a ToDo which has already been completed")
        }
    } catch(err) {
        res.send("There are no ToDos which match that ID")
    }
})

app.listen(port, () => {
    console.log(`App is litening on port ${port}`)
})
