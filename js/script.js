function createInput(type, value = "", name =  "", placeholder = "", require = false)
{
    const input = document.createElement("input")
    input.setAttribute("type", type)
    input.setAttribute("style", "margin-right:10px")
    if (value !== "") {
        input.setAttribute("value", value)
    }
    if (name !== "") {
        input.setAttribute("id", name)
        input.setAttribute("name", name)
    }
    if (placeholder !== "") {
        input.setAttribute("placeholder", placeholder)
    }
    if (require) {
        input.setAttribute("required", "true")
    }
    
    return input
}

function createTask(value, status = 1, id = 0)
{
    const task = document.createElement("span")
    const checkElt = createInput("checkbox")
    const taskElt = document.createElement("span")
    taskElt.textContent = value
    if (id !== 0) {
        task.id = id
    }
    task.classList.add("item")
    task.appendChild(checkElt)
    task.appendChild(taskElt)
    document.getElementById("add_task").appendChild(task)
    return task;
}

const addTaskElt = document.getElementById("add_task")
const formElt = document.getElementById("list_task")
const inputElt = createInput("text", "", "task", "Entrez votre tâche")
const submitElt = createInput("submit", "Ajouter")

const buttonElt = document.createElement("button")
buttonElt.textContent = "Ajouter une tâche"
addTaskElt.appendChild(buttonElt)


ajaxGet("https://www.lepelley.fr/projects/to-do/get.php", function (response) {
    const tasks = JSON.parse(response);
    tasks.forEach(task => {
        createTask(task.content, task.value, task.id)
    })
})

buttonElt.addEventListener("click", function(e) {
    addTaskElt.removeChild(buttonElt)
    inputElt.setAttribute("autocomplete", "on")
    addTaskElt.appendChild(inputElt)
    addTaskElt.appendChild(submitElt)
    inputElt.focus()

    formElt.addEventListener("submit", function(e) {
        e.preventDefault()
        const itemElt = document.createElement("span")
        const checkElt = createInput("checkbox")
        const taskElt = document.createElement("span")
        if (e.target.task.value !== "") {
            createTask(e.target.task.value)
            // Switch form and button
            inputElt.value = ""
            inputElt.setAttribute("autocomplete", "off")
            addTaskElt.removeChild(inputElt)
            addTaskElt.removeChild(submitElt)
            addTaskElt.appendChild(buttonElt)
        }


        // We can edit the task by clicking it
        taskElt.addEventListener("click", function(e) {
            const result = prompt("Modifier la tâche", e.target.textContent)
            if (result === null) {
                
            }
            else if (result === "") {
                formElt.removeChild(itemElt)
            }
            else {
                taskElt.textContent = result
            }
        })

        checkElt.addEventListener("change", function(e) {
            if (e.target.checked) { // if check, task done
                taskElt.setAttribute("style", "color:gray;text-decoration:line-through")
            }
            else {
                taskElt.setAttribute("style", "color:black")
            }
        })
    })
})