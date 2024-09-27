const connection = require('./connection');

// Lista todas as tarefas cadastradas no banco
const getAll = async () =>{
    const [tasks] = await connection.execute('SELECT * FROM TASKS');
    return tasks;
};

// Cria uma nova tarefa a partir do título enviado na requisição
const createTask = async (task) => {
    const { title } = task;
    //Pega a data atual
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO TASKS (title, status, created_at) VALUES (?, ?, ?)';
    const [createdTask] = await connection.execute(query,[title,'pendente',dateUTC]);
    return {insertId: createdTask.insertId};
};

// Deleta uma tarefa a partir do seu id passado como parâmetro na url
const deleteTask = async (id) => {
    const query = 'DELETE FROM TASKS WHERE id = ?';
    const deletedTask = await connection.execute(query,[id]);
    return deletedTask;
};

// Atualiza o título de uma tarefa a partir do seu id
const updateTask = async (id, task) => {
    const { title, status } = task;
    const query = 'UPDATE TASKS SET title = ?, status = ? WHERE id = ?';
    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};