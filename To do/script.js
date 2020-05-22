//Lyubishkin Gleb
const todoControl = document.querySelector ('.todo-control'),
    todoList = document.querySelector ('.todo-list'),
        todoCompleted = document.querySelector ('.todo-completed'),
            todoContainer = document.querySelector ('.todo-container');

//Save data
let obj = JSON.parse(localStorage.getItem('obj'));

const render = () => {
    todoList.textContent="";
    todoCompleted.textContent="";

    //Push objJson
    let objJson = new Array();
    obj.forEach( e => { (e !== null) ? objJson.push(e) : null; });
    obj = objJson;     
    
    //Create el
    obj.forEach( e => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${e.value}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;

        //Append
        (e.completed) ? todoCompleted.append(li) : todoList.append(li);
    });

    //To LS
    localStorage.obj = JSON.stringify(obj);
}; render();

todoControl.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();

    //Input
    const input = todoControl.querySelector('input');
    if (input.value!="") {
        newObj = { value: input.value, completed: false }
        input.value="";
        obj.push(newObj);
        render();

    } else alert('Please, write anyway');
});

const search = e => {
    let elemText = e.querySelector('span').textContent,
    elemCompleted = todoCompleted.contains(e);

    //desired el in obj
    obj.forEach( (el, index) => {
        (el.value === elemText) ? 
            (el.completed === elemCompleted) ? 
                ind = index : null : null;
    })

    return ind;
}

todoContainer.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    
    if(!target.matches('button')) return;

    const index = search(target.closest("li"));

    //Obj turn false ? true completed 
    (target.matches('.todo-remove')) ? delete obj[index] : null;
        (target.matches('.todo-complete')) ? 
            (obj[index].completed == true) ? 
                obj[index].completed = false : obj[index].completed = true : null;
    render();
});

