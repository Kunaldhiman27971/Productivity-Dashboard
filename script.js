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
let timer = document.querySelector('.pomotimer h1')
let startbtn = document.querySelector('.pomotimer .start-timer')
let pausebtn = document.querySelector('.pomotimer .pause-timer')
let resetbtn = document.querySelector('.pomotimer .reset-timer')
let sessiontext = document.querySelector('.pomodoro-timer-fullpage .session')

// Timer state
let totalSeconds = 1500 // 25 min
let timerinterval = null
let isworking = true

// Update timer UI
function updatetimer() {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Start Timer
function startTimer() {
    // ❌ Prevent multiple intervals
    if (timerinterval !== null) return

    timerinterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--
            updatetimer()
        } else {
            clearInterval(timerinterval)
            timerinterval = null

            // Switch sessions
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

// Pause Timer
function pauseTimer() {
    clearInterval(timerinterval)
    timerinterval = null
}

// Reset Timer
function resetTimer() {
    clearInterval(timerinterval)
    timerinterval = null
    isworking = true
    totalSeconds = 1500
    sessiontext.innerHTML = 'Work Session'
    updatetimer()
}

// Initial UI
updatetimer()

// Events
startbtn.addEventListener('click', startTimer)
pausebtn.addEventListener('click', pauseTimer)
resetbtn.addEventListener('click', resetTimer)
// Pompodoro Timer JS Ends here