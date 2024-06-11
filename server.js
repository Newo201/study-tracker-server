import express from "express"
import bodyParser from "body-parser";
import pg from "pg"
import moment from "moment"
import env from "dotenv";

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

const test = moment("2024-06-04", "YYYY-MM-DD").week()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/study", async (req, res) => {
    // Add in Date Filtering
    const result = await db.query("SELECT week_completed, SUM(study_unit) study_completed FROM study GROUP BY week_completed ORDER BY week_completed")  
    console.log(result.rows)
    res.json(result.rows)
}) 

app.post("/study/subject", async (req, res) => {
    const result = await db.query("SELECT subject, SUM(study_unit) study_completed FROM study GROUP BY subject ORDER BY subject")  
    console.log(result.rows)
    res.send(result.rows)
})

app.post("/study/type", async (req, res) => {
    const result = await db.query("SELECT study_type, SUM(study_unit) study_completed FROM study GROUP BY study_type ORDER BY study_type")  
    console.log(result.rows)
    res.send(result.rows)
})

console.log(test)

app.listen(port, () => {
    console.log(`App is litening on port ${port}`)
})
