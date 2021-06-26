const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config()
app.use(express.static(__dirname + '/public'));
const {getAllTeacher,createTeacher,getTeacherById,deleteTeacherById,updateTeacherById,
        getAllBatch,getBatchById,createBatch,updateBatchById,deleteBatchById,
        getAllSchedule,getScheduleById,createSchedule,updateScheduleById,deleteScheduleById} = require('./server/router')
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//GET ALL TEACHER
app.get('/teacher',getAllTeacher)

//GET TEACHER
app.get('/teacher/:id',getTeacherById)

//ADD TEACHER
app.post('/teacher/create',createTeacher)

//UPDATE TEACHER
app.put('/teacher/update/:id',updateTeacherById)

//DELETE TEACHER
app.delete('/teacher/delete/:id',deleteTeacherById)


//GET ALL BATCH
app.get('/batch',getAllBatch)

//GET BATCH
app.get('/batch/:id',getBatchById)

//ADD BATCH
app.post('/batch/create',createBatch)

//UPDATE BATCH
app.put('/batch/update/:id',updateBatchById)

//DELETE BATCH
app.delete('/batch/delete/:id',deleteBatchById)


//GET ALL SCHEDULE
app.get('/schedule',getAllSchedule)

//GET SCHEDULE
app.get('/schedule/:id',getScheduleById)

//ADD SCHEDULE
app.post('/schedule/create',createSchedule)

//UPDATE SCHEDULE
app.put('/schedule/update/:id',updateScheduleById)

//DELETE SCHEDULE
app.delete('/schedule/delete/:id',deleteScheduleById)

app.listen(process.env.PORT,()=>{
    console.log("live")
})