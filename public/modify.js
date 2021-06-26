const url = "http://localhost:3000";

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
        list += `<li class="each__list" key=${element.id}>${
          element.teacher_name
        } ${element.batch_name} ${element.start_time}  ${
          element.end_time
        } ${new Date(
          element.date
        ).toDateString()} <br/> <button> Delete</button></li>`;
      });
      schedulerList.innerHTML = list;
    });
});

// delete teacher
// const deleteTeacher = document.querySelector("form[id=teacher-form]");
// addTeacher.addEventListener('submit',function(event){
//     event.preventDefault();
//     const nameInput = addTeacher.querySelector("input");
//     const data ={name:nameInput.value};
//     nameInput.value = "";

//     fetch(url+"/teacher/create",
//     {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data)}
//     )
//     .then(response=>response.json())
//     .then((data)=>{
//         let teacherResponse = document.querySelector(".teacher__response");
//         const prevInnerHTML = teacherResponse.innerHTML;
//        if(data.success){
//            teacherResponse.innerHTML = "<div>Submitted</div>"

//        }else{
//            teacherResponse.innerHTML = "<div>Not Submitted</div>"
//        }
//        setTimeout(()=>{
//         teacherResponse.innerHTML = prevInnerHTML;
//         location.reload();
//        },1000)

//     })
// })

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