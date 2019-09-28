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

const addTaskElt = document.getElementById("add_task")
const listElt = document.getElementById("list_task")
// Reset button

const buttonElt = document.createElement("button")
buttonElt.textContent = "Ajouter une tâche"
addTaskElt.appendChild(buttonElt)

buttonElt.addEventListener("click", function(e) {
    // Create form
    addTaskElt.removeChild(buttonElt)
    const formElt = document.createElement("form")
    const taskElt = createInput("text", "", "task", "Entrez votre tâche", true)
    const submitElt = createInput("submit", "Ajouter")
    formElt.appendChild(taskElt)
    formElt.appendChild(submitElt)
    addTaskElt.appendChild(formElt)

    formElt.addEventListener("submit", function(e) {
        e.preventDefault()
        
        const itemElt = document.createElement("p")
        const checkElt = createInput("checkbox")
        const labelElt = document.createElement("label")
        labelElt.textContent = e.target.task.value
        itemElt.appendChild(checkElt)
        itemElt.appendChild(labelElt)
        listElt.appendChild(itemElt)
        // Switch form and button
        addTaskElt.removeChild(formElt)
        addTaskElt.appendChild(buttonElt)

        // We can edit the task by clicking it
        labelElt.addEventListener("click", function(e) {
            const result = prompt("Modifier la tâche")
            console.log(result)
            if (result === null) {
                
            }
            else if (result === "") {
                listElt.removeChild(itemElt)
            }
            else {
                labelElt.textContent = result
            }
        })

        checkElt.addEventListener("change", function(e) {
            if (e.target.checked) { // if check, task done
                labelElt.setAttribute("style", "color:gray;text-decoration:line-through")
            }
            else {
                labelElt.setAttribute("style", "color:black")
            }
        })
    })
})
