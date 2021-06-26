//URL
const url = "https://class-scheduler-pepcoding.herokuapp.com";
// add teacher
const addTeacher = document.querySelector("form[id=teacher-form]");
addTeacher.addEventListener('submit',function(event){
    event.preventDefault();
    const nameInput = addTeacher.querySelector("input");
    const data ={name:nameInput.value};
    nameInput.value = "";

    fetch(url+"/teacher/create",
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)}
    )
    .then(response=>response.json())
    .then((data)=>{
        let teacherResponse = document.querySelector(".teacher__response");
        const prevInnerHTML = teacherResponse.innerHTML;
       if(data.success){
           teacherResponse.innerHTML = "<div>Submitted</div>"
        
       }else{
           teacherResponse.innerHTML = "<div>Not Submitted</div>"
       }
       setTimeout(()=>{
        teacherResponse.innerHTML = prevInnerHTML;
        location.reload();
       },1000)
       
    })
})

//add batch
const addBatch = document.querySelector("form[id=batch-form]");
addBatch.addEventListener('submit',function(event){
    event.preventDefault();
    const batchInput = addBatch.querySelector("input");
    const data ={name:batchInput.value};
    batchInput.value = "";
    fetch(url+"/batch/create",
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)}
    )
    .then(response=>response.json())
    .then((data)=>{
        let batchResponse = document.querySelector(".batch__response");
        const prevInnerHTML = batchResponse.innerHTML;
        if(data.success){
            batchResponse.innerHTML = "<div>Submitted</div>"
         
        }else{
            batchResponse.innerHTML = "<div>Not Submitted</div>"
        }
        setTimeout(()=>{
         batchResponse.innerHTML = prevInnerHTML;
         location.reload();
        },1000)
    })
})

// add schedule
const addSchedule = document.querySelector("form[id=schedule-form]");
addSchedule.addEventListener('submit',function(event){
    event.preventDefault();
    const dataInput = addSchedule.querySelectorAll("input");
    const dataSelect = addSchedule.querySelectorAll("select");
    
    const data = {
        teacher_id:dataSelect[0].value,
        batch_id:dataSelect[1].value,
        date:dataInput[0].value,
        start_time:dataInput[1].value,
        end_time:dataInput[2].value
    }

    dataSelect[0].value = "";
    dataSelect[1].value = "";
    dataInput[0].value = "";
    dataInput[1].value = "";
    dataInput[2].value = "";
    fetch(url+"/schedule/create",
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)}
    )
    .then(response=>response.json())
    .then((data)=>{
        let scheduleResponse = document.querySelector(".schedule__response");
        const prevInnerHTML = scheduleResponse.innerHTML;
        if(data.success){
            scheduleResponse.innerHTML = "<div>Submitted</div>"
         
        }else{
            scheduleResponse.innerHTML = "<div>Not Submitted</div>"
        }
        setTimeout(()=>{
         scheduleResponse.innerHTML = prevInnerHTML;
         location.reload();
        },1000)
        
    })
})


//get different field
const selectTeacher = document.querySelector("select[name=teacher-select]");
const selectBatch = document.querySelector("select[name=batch-select]");
let events = [];
document.addEventListener('DOMContentLoaded',function(event){

    fetch(url+"/teacher",
    {method: 'GET'}
    )
    .then(response=>response.json())
    .then((data)=>{
        let list = "";
        data.forEach(element => {
            list+=`<option value=${element.teacher_id}>${element.teacher_name}</option>`
        });
        selectTeacher.innerHTML = list;
    })
    
    fetch(url+"/batch",
    {method: 'GET'}
    )
    .then(response=>response.json())
    .then((data)=>{
        let list = "";
        data.forEach(element => {
            list+=`<option value=${element.batch_id}>${element.batch_name}</option>`
        });
        selectBatch.innerHTML = list;
    })

    fetch(url+"/schedule",
    {method: 'GET'}
    )
    .then(response=>response.json())
    .then((data)=>{
        events = data;
        renderDate(1,events)
    })

})


let scheduleResponse = document.querySelector(".schedule__response");
const prevInnerHTML = scheduleResponse.innerHTML;
//calender 
var monthDateFetcher = new Date();
const yearDateFetcher = new Date();

function renderDate(viewType,events) {
    var months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ]
    if(viewType==1){
    monthDateFetcher.setDate(1);
    var day = monthDateFetcher.getDay();
    var today = new Date();
    var endDate = new Date(
        monthDateFetcher.getFullYear(),
        monthDateFetcher.getMonth() + 1,
        0
    ).getDate();const endTime = document.querySelector("#end-time")


    var prevDate = new Date(
        monthDateFetcher.getFullYear(),
        monthDateFetcher.getMonth(),
        0
    ).getDate();
        document.getElementById("month").innerHTML = months[monthDateFetcher.getMonth()];
        document.getElementById("date_str").innerHTML = monthDateFetcher.toDateString();    
   
    var cells = "";
    for (x = day; x > 0; x--) {
        cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
    }
    for (i = 1; i <= endDate; i++) {
        if (i == today.getDate() && monthDateFetcher.getMonth() == today.getMonth()){
            let eventList = "<ul class='event__list'>";
            let eventCount = 0; 
            events.forEach(data=>{
               const checkDate = new Date(data.date);
               if(checkDate.getDate()==today.getDate()&&checkDate.getMonth()==today.getMonth()&&checkDate.getFullYear()==today.getFullYear()){
                   eventList+=`<li id=${data.id} >class at ${data.start_time} of batch: ${data.batch_name} faculty ${data.teacher_name}</li>`;
                   eventCount +=1 ;
               }  
            })
            eventList+="</ul >"  
            cells += `<div class='today'>${i}<br/> <br/> ${eventCount==0?"":`<span class="event_badge">${eventCount}</span> `}<div class="popup__event">${eventList}</div></div>`;
        }else{
            let eventList = "<ul class='event__list'>";
            let eventCount = 0; 
            events.forEach(data=>{
               const checkDate = new Date(data.date);
               if(checkDate.getDate()==i&&checkDate.getMonth()==monthDateFetcher.getMonth()&&checkDate.getFullYear()==monthDateFetcher.getFullYear()){
                   eventList+=`<li id=${data.id} >class at ${data.start_time} of batch: ${data.batch_name} <br/> faculty: ${data.teacher_name}</li>`;
                    eventCount +=1 ;
               }  
            })
            eventList+="</ul>"
            cells += `<div > ${i} <br/> <br/> ${eventCount==0?"":`<span class="event_badge">${eventCount}</span>`}<div class="popup__event">${eventList}</div></div>`  ;
        }

            
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;
    
    }else{ 
        var today = new Date();
        document.getElementById("month").innerHTML = yearDateFetcher.getFullYear();
        for(let k=0;k<12;k++){

            const endDate = new Date(
                yearDateFetcher.getFullYear(),
                k + 1,
                0
            ).getDate();
             
            const prevDate = new Date(
                yearDateFetcher.getFullYear(),
                k,
                0
            ).getDate();
            yearDateFetcher.setDate(1);
            yearDateFetcher.setMonth(k);
            const day = yearDateFetcher.getDay();    
            let cells = "";
            for (x = day; x > 0; x--) {
                cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
            }
            for (i = 1; i <= endDate; i++) {
                if (i == today.getDate() && k == today.getMonth()&&yearDateFetcher.getFullYear()==today.getFullYear()){
                    let eventList = "<ul class='event__list'>";
                    let eventCount = 0; 
                    events.forEach(data=>{
                       const checkDate = new Date(data.date);
                       if(checkDate.getDate()==today.getDate()&&checkDate.getMonth()==today.getMonth()&&checkDate.getFullYear()==yearDateFetcher.getFullYear()){
                           eventList+=`<li id=${data.id} >class at ${data.start_time} of batch: ${data.batch_name} faculty ${data.teacher_name}</li>`;
                           eventCount +=1 ;
                       }  
                    })
                    eventList+="</ul >"  
                    cells += `<div class='today'>${i}<br/> <br/> ${eventCount==0?"":`<span class="event_badge">${eventCount}</span> `}<div class="popup__event">${eventList}</div></div>`;
                }else{
                    let eventList = "<ul class='event__list'>";
                    let eventCount = 0; 
                    events.forEach(data=>{
                       const checkDate = new Date(data.date);
                       if(checkDate.getDate()==i&&checkDate.getMonth()==k&&checkDate.getFullYear()==yearDateFetcher.getFullYear()){
                           eventList+=`<li id=${data.id} >class at ${data.start_time} of batch: ${data.batch_name} <br/> faculty: ${data.teacher_name}</li>`;
                            eventCount +=1 ;
                       }  
                    })
                    eventList+="</ul>"
                    cells += `<div > ${i} <br/> <br/> ${eventCount==0?"":`<span class="event_badge">${eventCount}</span>`}<div class="popup__event">${eventList}</div></div>`  ;
                }
        
            }
            document.getElementsByClassName("each__month")[k].innerHTML = months[k];
            document.getElementsByClassName("days")[k].innerHTML = cells;
        }
    }
}
function moveDate(para) {
    if(para == "prev") {
        monthDateFetcher.setMonth(monthDateFetcher.getMonth() - 1);
    } else if(para == 'next') {
        monthDateFetcher.setMonth(monthDateFetcher.getMonth() + 1);
    }
    renderDate(1,events);
}
function moveYear(para) {
    if(para == "prev") {
        yearDateFetcher.setYear(yearDateFetcher.getFullYear() - 1);
    } else if(para == 'next') {
        yearDateFetcher.setYear(yearDateFetcher.getFullYear() + 1);
    }  let scheduleResponse = document.querySelector(".schedule__response");
    const prevInnerHTML = scheduleResponse.innerHTML;
    renderDate(12,events);
}
document.addEventListener('DOMContentLoaded',function() {
    renderDate(1,events)
});


// get the modal
const populateModal = (viewType)=>{
    const modal = document.getElementById("event-modal");
    const list = document.getElementById("event-list");
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    list.innerHTML = ""
    //popup events
    if(!viewType){
        let selectDay = document.querySelector("div[class=days]");
        selectDay.addEventListener('click',function(event){
            if(event.target.querySelector('.popup__event')!=null){
                const eventList = event.target.querySelector('div[class=popup__event]');
                if(eventList!=null)
                list.innerHTML = eventList.innerHTML;
                modal.style.display="block";    
            }
            
        })    
    }else{
        let selectYear = document.querySelector("div[class=calendar__year]");
        selectYear.addEventListener('click',function(event){
            if( event.target.querySelector('.popup__event')!=null){
                const eventList = event.target.querySelector('div[class=popup__event]');
                if(eventList!=null){
                list.innerHTML = eventList.innerHTML;
                }modal.style.display="block";    
            }
            
        })
    }
}
populateModal(0);




//calender view 
const calenderView = document.getElementById("calendar-view");
const calendarSection = document.querySelector(".calendar__section")
let calenderYear = "";
for(let i=0;i<12;i++){
    calenderYear +=  `
<div class="each__calendar">
<div class="each__month">
</div>
<div class="weekdays">
<div><b>Sun</b></div>
<div><b>Mon</b></div>
<div><b>Tue</b></div>
<div><b>Wed</b></div>
<div><b>Thu</b></div>
<div><b>Fri</b></div>
<div><b>Sat</b></div>
</div>
    <div class="days">

    </div>
</div>`
}

let viewSchema  = "month"
calenderView.addEventListener('change',function(event){
    viewSchema = event.target.value;
    if(event.target.value=='year'){
        calendarSection.innerHTML = `
        <div class="calendar__year">
        <div class="year">
        <div class="prev" onclick="moveYear('prev')">
            <span>&#10094;</span>
        </div>
        <div>
            <h2 id="month"></h2>
        </div>
        <div class="next" onclick="moveYear('next')">
            <span>&#10095;</span>
        </div>
        </div>
        <div class="calendar__flex">
            ${calenderYear}
        </div>
        </div>
        <!-- model for events -->
        <div id="event-modal" class="modal">
        <div class="modal-content">
        <span class="close">&times;</span>
        <div id="event-list">
        `
        renderDate(12,events)
        populateModal(1);
    }else if(event.target.value=='day'){
        "calendar__flex"
    }else{
        calendarSection.innerHTML =`
        <div class="calendar__month">
        <div class="month">
            <div class="prev" onclick="moveDate('prev')">
                <span>&#10094;</span>
            </div>
            <div>
                <h2 id="month"></h2>
                <p id="date_str"></p>
            </div>
            <div class="next" onclick="moveDate('next')">
                <span>&#10095;</span>
            </div>
        </div>
        <div class="weekdays">
        <div><b>Sun</b></div>
        <div><b>Mon</b></div>
        <div><b>Tue</b></div>
        <div><b>Wed</b></div>
        <div><b>Thu</b></div>
        <div><b>Fri</b></div>
        <div><b>Sat</b></div>
        </div>
        <div class="days">

        </div>
    </div>
    <!-- model for events -->
    <div id="event-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="event-list">

            </div>
        </div>
    </div>`
        renderDate(1,events);
        populateModal(0);
    }
    
})

//search bar

const searchBar  = document.querySelector(".search__bar input");
searchBar.addEventListener('input',function(event){
    
    const filterData = events.filter(data=>{
       if((data.teacher_name).toLowerCase().includes(event.target.value)){
           return data;
       }
    })
    if(viewSchema=="month")
         renderDate(1,filterData)
    else
        renderDate(12,filterData)
})

//duration check

const startTime = document.querySelector("#start-time")
const endTime = document.querySelector("#end-time")
const timeError = document.querySelector("#time-error")

let scheduleDiv = document.querySelector(".schedule__response");
let scheduleButton = `<input  type="submit" value="Schedule">`
startTime.addEventListener('input',function(event){
    if(endTime.value!=""){
        let et = endTime.value.split(":");
        let st = startTime.value.split(":");
        if(parseInt(st[0])>parseInt(et[0])){
            scheduleDiv.innerHTML = "<p style='color:red'>incorrect time interval</p>"
        }else if(parseInt(st[0])==parseInt(et[0])){
            if(parseInt(st[1])>=parseInt(et[1])){
                scheduleDiv.innerHTML = "<p style='color:red'>incorrect time interval</p>"
            }else{
                scheduleDiv.innerHTML = scheduleButton
            }
        }else{
            scheduleDiv.innerHTML = scheduleButton
        }
    }
        
})
endTime.addEventListener('input',function(event){
    if(startTime.value!=""){
        let et = endTime.value.split(":");
        let st = startTime.value.split(":");
        if(parseInt(st[0])>parseInt(et[0])){
            scheduleDiv.innerHTML  = "<p style='color:red'>incorrect time interval</p>"
        }else if(parseInt(st[0])==parseInt(et[0])){
            if(parseInt(st[1])>=parseInt(et[1])){
                scheduleDiv.innerHTML  = "<p style='color:red'>incorrect time interval</p>"
            }else{
                scheduleDiv.innerHTML = scheduleButton
            }
        }else{
            scheduleDiv.innerHTML = scheduleButton
        }
    }
})