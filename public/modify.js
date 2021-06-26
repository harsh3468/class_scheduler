const url = "https://class-scheduler-pepcoding.herokuapp.com";

//get different field
const teacherList = document.querySelector("#teacher-list");
const batchList = document.querySelector("#batch-list");
const schedulerList = document.querySelector("#schedule-list");
document.addEventListener("DOMContentLoaded", function (event) {
  fetch(url + "/teacher", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      let list = "";
      data.forEach((element) => {
        list += `<li class="each__list" key=${element.teacher_id}>${element.teacher_name} <br/>  <button> Delete</button></li>`;
      });
      teacherList.innerHTML = list;
    });

  fetch(url + "/batch", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      let list = "";
      data.forEach((element) => {
        list += `<li class="each__list" key=${element.batch_id}>${element.batch_name} <br/>  <button> Delete</button></li>`;
      });
      batchList.innerHTML = list;
    });

  fetch(url + "/schedule", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      let list = "";
      data.forEach((element) => {
        list += `<li class="each__list" key=${element.id}>
        Faculty
        ${element.teacher_name}
        will teach 
        ${element.batch_name} 
        start at
        ${element.start_time}  
        end at
        ${element.end_time
        } 
        on
        ${new Date(
          element.date
        ).toDateString()} <br/> <button> Delete</button></li>`;
      });
      schedulerList.innerHTML = list;
    });
});


//delete batch
const deleteBatch = document.querySelector("#batch-list");
const deleteTeacher = document.querySelector("#teacher-list");
const deleteSchedule = document.querySelector("#schedule-list");


deleteBatch.addEventListener("click", (event) => {
  if (event.target.innerText == "Edit" || event.target.innerText == "Delete") {
    const id = event.target.parentElement.getAttribute("key");
    fetch(url + `/batch/delete/${id}`, {
      method: "DELETE"
    }).then((response) =>{
            return  response.json();
      })
      .then((data) => {  
          if(data.success){
              location.reload();
          }
      });
  }
});

deleteTeacher.addEventListener("click", (event) => {
    if (event.target.innerText == "Edit" || event.target.innerText == "Delete") {
      const id = event.target.parentElement.getAttribute("key");
      fetch(url + `/teacher/delete/${id}`, {
        method: "DELETE"
      }).then((response) =>{
              return  response.json();
        })
        .then((data) => {  
            if(data.success){
                location.reload();
            }
        });
    }
  });

deleteSchedule.addEventListener("click", (event) => {
    if (event.target.innerText == "Edit" || event.target.innerText == "Delete") {
      const id = event.target.parentElement.getAttribute("key");
      fetch(url + `/schedule/delete/${id}`, {
        method: "DELETE"
      }).then((response) =>{
              return  response.json();
        })
        .then((data) => {  
            console.log(data)
            if(data.success){
                location.reload();
            }
        });
    }
  });
