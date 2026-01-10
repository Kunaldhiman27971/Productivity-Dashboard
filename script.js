// Open Features:-
function openfeatures(){
    var allElems = document.querySelectorAll(".elem")
var fullElempage = document.querySelectorAll(".fullElem")
var fullElempagebackButtons=document.querySelectorAll(".back")


allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
        fullElempage[elem.id].style.display = "block"
    })
})

fullElempagebackButtons.forEach(function(back){
    back.addEventListener("click",function(){
        fullElempage[back.id].style.display="none"
    })
})
}
openfeatures()



let form=document.querySelector('.addtask form')
let taskInput=document.querySelector('.addtask form input')  
let textareaInput=document.querySelector('.addtask form textarea')
let taskCheckbox=document.querySelector('.addtask form #check')

form.addEventListener('submit',function(e){
    e.preventDefault()
    
    let task=taskInput.value
    let description=textareaInput.value
    let isImportant=taskCheckbox.checked

    
})
