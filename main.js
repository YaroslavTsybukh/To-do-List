    const inputMessage = document.querySelector(".create_new_todo__message"),
          addButton = document.querySelector(".add"),
          toDoBlock = document.querySelector(".todo"),
          warningBlock = document.querySelector(".todo_list__warning")

    let tasks

    !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"))

    function CreateTask (text) {
        this.text = text
        this.completed = false
    }

    const createTemplateList = (task , id) => {
        return `
            <li class="todo__list ${task.completed ? 'opacity' : ''}" >
                <input onclick="checkedTask(${id})" class="todo__input" 
                        type="checkbox" id="todo__input-${id}" ${task.completed ? 'checked' : ''}>
                <label class="todo__label" for="todo__input-${id}">${task.text}</label>
                <img onclick="deletePoint(${id})" src="./image/trash.svg" class="trash" alt="trash">
            </li>
        `
    }

    const checkedTask = (index) => {
        tasks[index].completed = !tasks[index].completed
        if(tasks[index].completed === true){
            document.querySelectorAll(".todo__list")[index].classList.add("opacity")
        }else{
            document.querySelectorAll(".todo__list")[index].classList.remove("opacity")
        }
        localStorage.setItem("tasks" , JSON.stringify(tasks))
        fillHtmlList()
    }

    const filterTasks = () => {
        const activeTasks = tasks.length && tasks.filter(item => item.completed === false)
        const completedTasks = tasks.length && tasks.filter(item => item.completed === true)
        tasks = [...activeTasks , ...completedTasks]
    }

    const fillHtmlList = () => {
        toDoBlock.innerHTML = ""
        if(tasks.length > 0){
            filterTasks()
            tasks.forEach((item , id)  => {
                toDoBlock.innerHTML += createTemplateList(item , id)
            })
        }
    }

    fillHtmlList()

    const addTask = () => {
        if(inputMessage.value !== "") {
            warningBlock.textContent = ""
            tasks.push(new CreateTask(inputMessage.value))
            inputMessage.value = ""
            localStorage.setItem("tasks", JSON.stringify(tasks))
            fillHtmlList()
        }else{
            warningBlock.textContent = "У вас не заполненное поле"
            warningBlock.style.color = "#ffd86f"
            warningBlock.style.textAlign = "center"
        }
    }

    addButton.addEventListener("click" , () => {
        addTask()
    })

    const deletePoint = (index) => {
        tasks.splice(index , 1)
        localStorage.setItem("tasks" , JSON.stringify(tasks))
        fillHtmlList()
    }

    document.addEventListener("keydown" , (e) => {
        if(e.key === "Enter") {
            addTask()
        }
    })

