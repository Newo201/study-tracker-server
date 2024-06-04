import express from "express"
import moment from "moment"

const port = 3000
const app = express()

const test = moment("2024-06-04", "YYYY-MM-DD").week()

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

console.log(test)

app.listen(port, () => {
    console.log(`App is litening on port ${port}`)
})
