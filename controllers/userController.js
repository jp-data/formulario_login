const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../database/models')

const userController = {
    
    //renderiza a página de cadastro
    renderFormCadastro: (req, res) => {
        res.render('formCadastro')
    },

    //cadastro
    cadastro: async (req, res) => {
        //pega os dados do usuário do corpo da req/
        const { email, name, senha } = req.body;

        const passwordToString = senha.toString() 
        //criptografia da senha
        const hash = bcrypt.hashSync(passwordToString, saltRounds);
        //chama a model para criar um novo usuário
        //passando email e a senha criptografada
        await User.create({ 
            email: email,
            nome: name, 
            senha: hash 
        })

        //redireciona
        res.redirect('/login')
    }
}

module.exports = userController;