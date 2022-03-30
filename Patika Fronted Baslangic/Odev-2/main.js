const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoContainer = document.querySelector(".todoContainer")

let deleteBtns;

const addHTML = (todo) => {
    //HTML ETİKETLERİ OLUŞTURULDU

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");


    const todoLeft = document.createElement("div");
    todoLeft.classList.add("todoLeft");



    const todoText = document.createElement("span");
    todoText.classList.add("todoText");


    todoText.textContent = todo.text;


    todoLeft.appendChild(todoText);


    const todoRight = document.createElement("div");
    todoRight.classList.add("todoRight");


    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todoDelete");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add("mx-1");
    deleteBtn.textContent = "Delete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("todoEdit");
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-success");
    editBtn.textContent = "Edit"

    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todoContainer.appendChild(todoDiv);
}



const startConf = () => {
    //baslangic ayarları
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
        localStorage.setItem("todos", JSON.stringify([]));

    }
    else {
        todos.forEach(todo => {
            addHTML(todo);
        });
        deleteBtns = document.querySelectorAll(".todoDelete");
        console.log(deleteBtns);
    }

}


startConf();



const addTodo = (e) => {
    e.preventDefault(); //"D" büyük olacak yoksa sıkıntı 


    const inputVal = input.value;


    const todo = {
        text: inputVal,
        isCompleted: false,
    };

    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));


    addHTML(todo);

    form.reset();


}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.textContent;


    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));


    todo.remove();
}

form.addEventListener("submit", addTodo)


deleteBtns.forEach(btn => btn.addEventListener("click", deleteTodo));
