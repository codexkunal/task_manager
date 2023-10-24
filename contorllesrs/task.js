const Task = require('../models/Task')

const  asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')



const getallTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
     res.status(200).json({tasks})
})

const createtask = asyncWrapper( async (req, res) => {
         const task = await Task.create(req.body)
         res.status(201).json({task})
})

const gettask = asyncWrapper( async (req, res, next) => {
        const  {id : taskId} = req.params
        const task = await Task.findOne({_id : taskId})
        if(!task){
            return next(createCustomError(`NO task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
})


const deletetask = asyncWrapper (async (req, res) => {
    
        const { id : taskID} = req.params
        const task = await Task.findOneAndDelete({_id : taskID})
        if(!task){
          return res.status(404).json({msg : ` No task with id : ${taskId}`})
        }
        res.status(200).json({task})
        
    })


const updatetask =asyncWrapper( async (req, res) => {
   
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body, {
            new : true,
            runValidators: true,
        })
        
        if(!task){
            return next(createCustomError(`NO task with id : ${taskID}`,404))
        }
        res.status(200).json({task})
    })



module.exports = { getallTasks,createtask,
    updatetask,deletetask,gettask}