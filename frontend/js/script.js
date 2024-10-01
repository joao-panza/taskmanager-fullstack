const fetchTasks = async () =>{
   const response = await fetch('http://localhost:3333/tasks');
   const tasks = await response.json();
   console.log(tasks);
   return tasks;
};

const task = {
    id: 3,
    title: "salve caraio",
    status: "disponível",
    created_at: "24/09/2024"
};

const createTask = (task) =>{
    const { title } = task;
    const li = document.createElement('li');
}

createTask(task);