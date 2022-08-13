    const inputMessage = document.querySelector(".message"),
          addButton = document.querySelector(".add"),
          toDoBlock = document.querySelector(".todo")

    let arr = []
    let tasks = localStorage.getItem("tasks")

    function CreateTask (text) {
        this.text = text
    }

    const createTemplateList = (text , id) => {
        return `
            <li class="todo__list">
                <input type="checkbox" id="todo__input-${id}">
                <label for="todo__input-${id}">${text}</label>
                <img src="./image/trash.svg" alt="trash">
            </li>
        `
    }

    const workItemsStorage = () => {
        toDoBlock.innerHTML = ""
        JSON.parse(localStorage.getItem("tasks")).forEach((item , id)  => {
            toDoBlock.innerHTML += createTemplateList(item.text , id)
        })
    }

    tasks ? workItemsStorage() : alert("В хранилище тасков нет , заполните , пожалуйста! ")

    addButton.addEventListener("click" , () => {
        arr.push(new CreateTask(inputMessage.value))
        inputMessage.value = ""
        localStorage.setItem("tasks" , JSON.stringify(arr))
        workItemsStorage()
    })

    try{
        let trashPoint = document.querySelector("[alt = 'trash']")
        trashPoint.addEventListener("click" , () => {
            console.log("Кликаем по мусорке")
        })
    }catch(e){
        console.log(e.message)
    }

