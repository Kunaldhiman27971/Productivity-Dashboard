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




// To Do List JS Begins here
function todoList() {

    let currentTasks = []
    if (localStorage.getItem('tasks')) {
        currentTasks = JSON.parse(localStorage.getItem('tasks'))
    }
    else {
        console.log('No tasks found in localStorage');
    }

    function renderTasks() {

        var allTask = document.querySelector('.alltask')
        var sum = ''

        currentTasks.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
            <h5>${elem.task}<span class="${elem.isImportant}">imp</span></h5>
            <button id=${idx}>Mark As Completed</button>
            </div>`

        })
        allTask.innerHTML = sum
        localStorage.setItem('tasks', JSON.stringify(currentTasks))

        var markcompleted = document.querySelectorAll('.task button')
        markcompleted.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTasks.splice(btn.id, 1)
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
// To Do List JS Ends here



// Daily Planner Page JS Begins here
function dailyPlanner() {

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var dayplanner = document.querySelector('.day-planner')
    var hours = Array.from({ length: 18 }, (elem, idx) =>
        `${6 + idx}:00 -${7 + idx}:00`
    )


    var sum = ''
    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || ''
        sum = sum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}"type="text" placeholder="..." value="${savedData}">
                </div>`
    })
    dayplanner.innerHTML = sum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
dailyPlanner()
// Daily Planner Page JS Ends here


// Motivation Quotes JS Begins here
function motivationQuotes() {
    var motivationQuote = document.querySelector('.motivation2 h1')
    var authorName = document.querySelector('.author h2')

    async function fetchQuoteOfTheDay() {
        let response = await fetch(`https://corsproxy.io/https://zenquotes.io/api/random?t=${Date.now()}`)
        let data = await response.json()
        motivationQuote.innerHTML = `${data[0].q}`
        authorName.innerHTML = `--${data[0].a}`
    }
    fetchQuoteOfTheDay()
}

motivationQuotes()
// Motivation Quotes JS Ends here


// Pompodoro Timer JS Begins here
// Elements
function pomodoroTimer() {
    let timer = document.querySelector('.pomotimer h1')
    let startbtn = document.querySelector('.pomotimer .start-timer')
    let pausebtn = document.querySelector('.pomotimer .pause-timer')
    let resetbtn = document.querySelector('.pomotimer .reset-timer')
    let sessiontext = document.querySelector('.pomodoro-timer-fullpage .session')

    // Timer state
    let totalSeconds = 1500 // 25 min
    let timerinterval = null
    let isworking = true


    function updatetimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }


    function startTimer() {

        if (timerinterval !== null) return

        timerinterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                updatetimer()
            } else {
                clearInterval(timerinterval)
                timerinterval = null


                if (isworking) {
                    isworking = false
                    totalSeconds = 300 // 5 min break
                    sessiontext.innerHTML = 'Break Session'
                } else {
                    isworking = true
                    totalSeconds = 1500 // 25 min work
                    sessiontext.innerHTML = 'Work Session'
                }

                updatetimer()
            }
        }, 1000)
    }


    function pauseTimer() {
        clearInterval(timerinterval)
        timerinterval = null
    }


    function resetTimer() {
        clearInterval(timerinterval)
        timerinterval = null
        isworking = true
        totalSeconds = 1500
        sessiontext.innerHTML = 'Work Session'
        updatetimer()
    }


    updatetimer()


    startbtn.addEventListener('click', startTimer)
    pausebtn.addEventListener('click', pauseTimer)
    resetbtn.addEventListener('click', resetTimer)

}
pomodoroTimer()

// Weather App JS Begins here
function weatherchange(){
var city = "Hamirpur,Himachal Pradesh,India"
var apiKey = '4ca371f004b541c18c760805261601';

var data = null
var time = document.querySelector(".header1 .time")
var date = document.querySelector(".header1 .date")
var temp=document.querySelector(".header2 h2")
var Condition=document.querySelector(".header2 h4")
var Precipitation=document.querySelector(".header2 .Precipitation")
var windSpeed=document.querySelector(".header2 .windspeed") 
var Humidity=document.querySelector(".header2 .Humidity")
async function weatherapicall() {
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    data = await response.json();
    temp.innerHTML=`${data.current.temp_c}°C`
    Condition.innerHTML=`${data.current.condition.text}`
    Precipitation.innerHTML=`Heat Index: ${data.current.heatindex_c}%`
    Humidity.innerHTML=`Humidity: ${data.current.humidity} %`
    windSpeed.innerHTML=`Wind Speed: ${data.current.wind_kph} kph`
}
weatherapicall()

function timedate() {
    var header=document.querySelector(".allElems header")
    var date = null;
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthnames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    date = new Date();

    var dayofweek = weekday[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dateofmonth = date.getDate();
    var month = monthnames[date.getMonth()];
    var year = date.getFullYear();

    if (hours >= 6 && hours < 16) {
    header.style.backgroundImage = "url('./day.jpeg')";
} 
else if (hours >= 16 && hours < 19) {
    header.style.backgroundImage = "url('./evening.avif')";
} 
else {
    header.style.backgroundImage = "url('./night.jpg')";
}

    date.innerHTML = `${dateofmonth} ${month} ${year}`
    if (hours > 12){
        if (hours > 12) {
            time.innerHTML = `${dayofweek}, ${String(hours-12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} PM`
        }

    }
    else {
        time.innerHTML = `${dayofweek}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} AM`
    }
}
setInterval(() => {
    timedate()
}, 1000)

}
weatherchange()


function changeTheme() {
const themes = [
    ['#ECDFCC','#1E201E','#131312','#697565'],
  ['#EBF4DD','#90AB8B','#649272','#3B4953'],
  ['#ffffff','#423F3E','#252525','#2B2B2B'],
  ['#968a6f','#3E6B89','#1C3C50','#D9CAB3'],
  ['#585857','#8a8b7c','#A1BC98','#778873']
]

let flag = 0
document.querySelector('.theme').addEventListener('click', () => {
  const root = document.documentElement
  root.style.setProperty('--pri', themes[flag][0])
  root.style.setProperty('--sec', themes[flag][1])
  root.style.setProperty('--tri1', themes[flag][2])
  root.style.setProperty('--tri2', themes[flag][3])
  flag = (flag + 1) % themes.length
})


}
changeTheme()



function dailyGoals() {

    const page = document.querySelector('.daily-goals-fullpage')
    const form = page.querySelector('form')
    const taskInput = page.querySelector('input[type="text"]')
    const textareaInput = page.querySelector('textarea')
    const taskCheckbox = page.querySelector('#check')
    const allTask = page.querySelector('.alltask')

    const progressText = page.querySelector('.progress-text')
    const progressPercent = page.querySelector('.progress-percent')
    const progressFill = page.querySelector('.progress-fill')

    const today = new Date().toDateString()

    let storedDate = localStorage.getItem('dailyGoalsDate')
    let dailyGoals = JSON.parse(localStorage.getItem('dailyGoals')) || []

    /* ===== AUTO RESET EVERY DAY ===== */
    if (storedDate !== today) {
        dailyGoals = []
        localStorage.setItem('dailyGoalsDate', today)
        localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals))
    }

    function updateProgress() {
        const total = dailyGoals.length
        const completed = dailyGoals.filter(g => g.completed).length
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

        progressText.innerText = `${completed} / ${total} Completed`
        progressPercent.innerText = `${percent}%`
        progressFill.style.width = `${percent}%`
    }

    function renderGoals() {

        // Pinned goals first
        dailyGoals.sort((a, b) => b.pinned - a.pinned)

        let sum = ''

        dailyGoals.forEach((goal, idx) => {
            sum += `
            <div class="task">
                <div class="task-left">
                    <button class="pin-btn ${goal.pinned ? 'pinned' : ''}" data-pin="${idx}">📌</button>
                    <h5>
                        ${goal.task}
                        <span class="${goal.isImportant}">imp</span>
                    </h5>
                </div>

                <button data-done="${idx}">
                    ${goal.completed ? 'Done ✅' : 'Complete'}
                </button>
            </div>`
        })

        allTask.innerHTML = sum
        localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals))

        // Complete goal
        allTask.querySelectorAll('[data-done]').forEach(btn => {
            btn.addEventListener('click', () => {
                dailyGoals[btn.dataset.done].completed = true
                renderGoals()
            })
        })

        // Pin goal
        allTask.querySelectorAll('[data-pin]').forEach(btn => {
            btn.addEventListener('click', () => {
                dailyGoals[btn.dataset.pin].pinned =
                    !dailyGoals[btn.dataset.pin].pinned
                renderGoals()
            })
        })

        updateProgress()
    }

    renderGoals()

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!taskInput.value.trim()) return

        dailyGoals.push({
            task: taskInput.value,
            description: textareaInput.value,
            isImportant: taskCheckbox.checked,
            completed: false,
            pinned: false
        })

        form.reset()
        renderGoals()
    })
}

dailyGoals()
