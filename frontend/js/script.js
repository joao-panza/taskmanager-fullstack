const ul = document.querySelector('ul');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () =>{
   const response = await fetch('http://localhost:3333/tasks');
   const tasks = await response.json();
   console.log(tasks);
   return tasks;
}

// Inclui a tarefa no banco e exibe a lista de tarefas após inclusão
const addTask = async(event) =>{
    event.preventDefault();
    
    const task = { title: inputTask.value };

    ul.innerHTML = '';

    // Faz uma chamada para o back inserir (post) o registro no banco
    await fetch('http://localhost:3333/tasks/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    loadTasks();
    // Limpa o campo de input após inclusão de tarefa
    inputTask.value = '';
}

// Remove a tarefa do banco e recarrega a página
const deleteTask = async (id) =>{
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });
    // TODO: fazer com que a lista seja resetada após a deleção (loadTasks deveria cumprir esse papel, mas não está funcionando)
    loadTasks();
}

// Atualiza o status para concluída
const updateTask = async (task) => {
    const { id, title, status, created_at } = task;

    await fetch(`http://localhost:3333/tasks/${id}`,{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status }),
    });
    loadTasks();
}

// Responsável por criar o elemento html 
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if(innerText){
        element.innerText = innerText;
    }

    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    return element;
}

// Insere a tag dentro do html 
const createTask = (task) =>{
    const { id, title, status, created_at } = task;
    const li = createElement('li');
    const liTitle = createElement('div', title);
    const divButtons = createElement('div');

    const completeButton = createElement('button', '', '<span class="material-symbols-outlined">check_small</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">close</span>');
    
    completeButton.classList.add('btn-complete');
    deleteButton.classList.add('btn-delete');

    completeButton.addEventListener('click', () => updateTask(id));
    deleteButton.addEventListener('click', () => deleteTask(id));

    divButtons.appendChild(completeButton);
    divButtons.appendChild(deleteButton);

    li.appendChild(liTitle);
    li.appendChild(divButtons);

    return li;
}

// Carrega as tarefas na tela com base no retorno da função fetchTasks
const loadTasks = async () => {
    const tasks = await fetchTasks ();

    // Limpa a lista antes de carregar as tasks
    ul.innerHTML = '';
    
    tasks.forEach((task) => {
        const li = createTask(task);
        ul.appendChild(li);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();