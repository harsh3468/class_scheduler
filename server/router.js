const {dbconnect} = require('./dbConfig')

exports.createTeacher = (request,response)=>{
    dbconnect.query('INSERT INTO teachers (teacher_name) VALUES (?)',[request.body.name],(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);;
        }
        return response.status(201).json({success:true});
    })
}
exports.getAllTeacher = (request,response)=>{
    dbconnect.query('SELECT * FROM teachers',(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);
        }
        return response.status(200).json(result);
    })
}
exports.getTeacherById = (request,response)=>{
    dbconnect.query('SELECT * FROM teachers WHERE id=(?)',[request.params.id],(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);
        }
        return response.status(200).json(result);
    })
}
exports.updateTeacherById = (request,response)=>{
    dbconnect.query('UPDATE teachers SET teacher_name=(?) WHERE id=(?)',[request.body.value,request.params.id],(error,result,fields)=>{
        if(error){
            return  response.status(304).json(error.sqlMessage);
        }
        return response.status(200).json({success:result.affectedRows?true:false});
    })
}
exports.deleteTeacherById = (request,response)=>{
    dbconnect.query('DELETE FROM teachers WHERE id=(?)',[request.params.id],(error,result,fields)=>{
        if(error){
            return response.status(304).json(error.sqlMessage);
        }
        return response.status(200).json({success:result.affectedRows?true:false});
    })
}

//batch functions

exports.createBatch = (request,response)=>{
    dbconnect.query('INSERT INTO batches (batch_name) VALUES (?)',[request.body.name],(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);;
        }
        return response.status(201).json({success:true});
    })
}
exports.getAllBatch = (request,response)=>{
    dbconnect.query('SELECT * FROM batches',(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);
        }
        return response.status(200).json(result);
    })
}
exports.getBatchById = (request,response)=>{
    dbconnect.query('SELECT * FROM batches WHERE id=(?)',[request.params.id],(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);
        }
        return response.status(200).json(result);
    })
}
exports.updateBatchById = (request,response)=>{
    dbconnect.query('UPDATE batches SET batch_name=(?) WHERE id=(?)',[request.body.value,request.params.id],(error,result,fields)=>{
        if(error){
            return  response.status(304).json(error.sqlMessage);
        }
        return response.status(200).json({success:result.affectedRows?true:false});
    })
}
exports.deleteBatchById = (request,response)=>{
    dbconnect.query('DELETE FROM batches WHERE id=(?)',[request.params.id],(error,result,fields)=>{
        if(error){
            return response.status(304).json(error.sqlMessage);
        }
        return response.status(200).json({success:result.affectedRows?true:false});
    })
}





// schedule function
const insertSchedule = (request,response)=>{
    dbconnect.query('INSERT INTO schedules (teacher_id,batch_id,date,start_time,end_time) VALUES (?,?,?,?,?)',[request.body.teacher_id,
        request.body.batch_id,
        request.body.date,
        request.body.start_time,
        request.body.end_time],(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);;
        }
        return response.status(201).json({success:true});
    })
}

exports.createSchedule = (request,response)=>{
    dbconnect.query('SELECT COUNT(id) AS count FROM schedules WHERE teacher_id=(?) AND batch_id<>(?) AND date=(?) AND start_time>=(?) AND end_time<=(?)',[request.body.teacher_id,
        request.body.batch_id,
        request.body.date,
        request.body.start_time,
        request.body.end_time],(error,result,fields)=>{
            if(error){
                return response.status(400).json(error.sqlMessage)
            }
            if(!JSON.parse(JSON.stringify(result))[0].count){
                insertSchedule(request,response)
            }else{
                return response.status(400).json({error:"already scheduled for this duration"})
            };
        })
   
}
exports.getAllSchedule = (request,response)=>{
    dbconnect.query('SELECT * FROM ((schedules INNER JOIN teachers ON schedules.teacher_id = teachers.teacher_id) INNER JOIN batches ON schedules.batch_id = batches.batch_id);',
    (error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);
        }
        return response.status(200).json(result);
    })
}
exports.getScheduleById = (request,response)=>{
    dbconnect.query('SELECT * FROM schedules WHERE id=(?)',[request.params.id],(error,result,fields)=>{
        if(error){
            return response.status(400).json(error.sqlMessage);
        }
        return response.status(200).json(result);
    })
}
exports.updateScheduleById = (request,response)=>{
    dbconnect.query('UPDATE schedules SET batch_id=(?) WHERE id=(?)',[request.body.batch_id,request.params.id],(error,result,fields)=>{
        if(error){
            return  response.status(304).json(error.sqlMessage);
        }
        return response.status(200).json({success:result.affectedRows?true:false});
    })
}
exports.deleteScheduleById = (request,response)=>{
    dbconnect.query('DELETE FROM schedules WHERE id=(?)',[request.params.id],(error,result,fields)=>{
        if(error){
            return response.status(304).json(error.sqlMessage);
        }
        return response.status(200).json({success:result.affectedRows?true:false});
    })
}
