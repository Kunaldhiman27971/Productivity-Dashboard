// Open Features:-
function openfeatures() {
    var allElems = document.querySelectorAll(".elem")
    var fullElempage = document.querySelectorAll(".fullElem")
    var fullElempagebackButtons = document.querySelectorAll(".back")


    allElems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            fullElempage[elem.id].style.display = "block"
        })
    })

    fullElempagebackButtons.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElempage[back.id].style.display = "none"
        })
    })
}
openfeatures()


function todoList() {
    
let currentTasks=[]
if(localStorage.getItem('tasks')){
    currentTasks=JSON.parse(localStorage.getItem('tasks'))
}
else{
    console.log('No tasks found in localStorage');
}

function renderTasks() { 
       
var allTask = document.querySelector('.alltask')
var sum =''

currentTasks.forEach(function (elem,idx) {
    sum =sum+`<div class="task">
            <h5>${elem.task}<span class="${elem.isImportant}">imp</span></h5>
            <button id=${idx}>Mark As Completed</button>
            </div>`

})
allTask.innerHTML = sum
localStorage.setItem('tasks',JSON.stringify(currentTasks)) 

var markcompleted=document.querySelectorAll('.task button')
markcompleted.forEach(function(btn){
    btn.addEventListener('click',function(){
        currentTasks.splice(btn.id,1)
        renderTasks()
       
    })
})

}
renderTasks()

let form = document.querySelector('.addtask form')
let taskInput = document.querySelector('.addtask form input')
let textareaInput = document.querySelector('.addtask form textarea')
let taskCheckbox = document.querySelector('.addtask form #check')


form.addEventListener('submit', function (e) {
    e.preventDefault()
    currentTasks.push({
        task: taskInput.value,
        description: textareaInput.value,
        isImportant: taskCheckbox.checked
    })
   
    renderTasks()
    form.reset()
    
})

}
todoList()



// Daily Planner Page JS Begins here
function dailyPlanner(){
    
var dayPlanData=JSON.parse(localStorage.getItem('dayPlanData'))||{}

var dayplanner=document.querySelector('.day-planner')
var hours=Array.from({length:18},(elem,idx)=>
    `${6+idx}:00 -${7+idx}:00`
)


var sum=''
hours.forEach(function(elem,idx){
    var savedData=dayPlanData[idx]||''
    sum=sum+`<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}"type="text" placeholder="..." value="${savedData}">
                </div>`
})
dayplanner.innerHTML=sum


var dayPlannerInput=document.querySelectorAll('.day-planner input')
dayPlannerInput.forEach(function(elem){
    elem.addEventListener('input',function(){
        dayPlanData[elem.id]=elem.value
        localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
    })
})
}
dailyPlanner()