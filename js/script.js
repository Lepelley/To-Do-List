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
    const spanElt = document.createElement("span")
    spanElt.textContent = value
    if (id !== 0) {
        task.id = id
    }
    task.classList.add("item")
    task.appendChild(checkElt)
    task.appendChild(spanElt)
    document.getElementById("list_task").appendChild(task)

    // We can edit the task by clicking it

    spanElt.addEventListener("click", function(e) {
        const result = prompt("Modifier la tâche", e.target.textContent)
        if (result === null) {
            
        }
        else if (result === "") {
            document.getElementById("list_task").removeChild(task)
        }
        else {
            spanElt.textContent = result
        }
    })

    checkElt.addEventListener("change", function(e) {
        if (e.target.checked) { // if check, task done
            spanElt.setAttribute("style", "color:gray;text-decoration:line-through")
        }
        else {
            spanElt.setAttribute("style", "color:black")
        }
    })


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
        console.log(e.target.task.value)
        if (e.target.task.value !== "") {
            const task = {
                content: e.target.task.value,
                status: 1
            }

            ajaxPost("https://www.lepelley.fr/projects/to-do/post.php", task, function(response) {
                createTask(task.content)
                //console.log(response)
            }, true)

            // Switch form and button
            inputElt.value = ""
            inputElt.setAttribute("autocomplete", "off")
            addTaskElt.removeChild(inputElt)
            addTaskElt.removeChild(submitElt)
            addTaskElt.appendChild(buttonElt)
        }
    })
})
