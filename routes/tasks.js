const express = require('express')
const router = express.Router()
const {getallTasks,gettask,
    createtask,deletetask,
    updatetask} = require('../contorllesrs/task')


router.route('/').get(getallTasks).post(createtask)
router.route('/:id').get(gettask).patch(updatetask).delete(deletetask)
module.exports = router