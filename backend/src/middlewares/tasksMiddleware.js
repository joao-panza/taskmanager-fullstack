const validateBody = (req, res, next) => {
    const { body } = req;
    // Valida se o título da tarefa está preenchido.
    if(body.title === undefined){
        return res.status(400).json({message:'Campo título é obrigatório.'});
    }
    // 
    if(body.title === ''){
        return res.status(400).json({message:'Título não pode ser vazio.'});
    }

    next();
};

module.exports = {
    validateBody,
};