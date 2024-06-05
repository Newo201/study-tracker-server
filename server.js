import express from "express"
import moment from "moment"
import env from "dotenv";

const port = 3000
const app = express()

env.config()

const db = ({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

db.connect()

const test = moment("2024-06-04", "YYYY-MM-DD").week()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

console.log(test)

app.listen(port, () => {
    console.log(`App is litening on port ${port}`)
})
