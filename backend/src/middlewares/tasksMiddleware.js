const validateFieldTitle = (req, res, next) => {
    const { body } = req;
    // Valida se o título da tarefa foi enviado na requisição
    if(body.title === undefined){
        return res.status(400).json({message:'Campo título é obrigatório.'});
    }
    // Valida se o título está vazio
    if(body.title === ''){
        return res.status(400).json({message:'Título não pode ser vazio.'});
    }

    next();
};

const validateFieldStatus = (req, res, next) => {
    const { body } = req;
    if(body.status === undefined){
        return res.status(400).json({message:'Status não informado.'});
    }
    // Valida se o status está vazio
    if(body.status === ''){
        return res.status(400).json({message:'Campo status não pode ser vazio.'});
    }

    next();
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
};