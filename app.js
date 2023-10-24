const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const port = process.env.PORT || 3000

require('dotenv').config()
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/api/v1/tasks')    -  get all the tasks
// app.post('/api/v1/tasks') -    create a new task
// app.get('/api/v1/tasks/:id') -  get single task   
// app.patch('/api/v1/tasks/:id') -  update task
// app.delete('/api/v1/tasks/:id') -  delete task 


const start = async ()=>{
    try {
         await connectDB(process.env.MONGO_URI)
         app.listen(port, console.log("listening on the port 3000"))

    } catch(error) {
          console.log(error);
    }
}

start()



