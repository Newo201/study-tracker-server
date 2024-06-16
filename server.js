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

app.listen(port, () => {
    console.log(`App is litening on port ${port}`)
})
