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
        //verificação do email
        const usuario = await User.findOne({ where: { email: email } });
        if (usuario) {
            // Se não existir, renderiza a página de login com erro
            res.render("formCadastro", { error: "Email já cadastrado" });
          
          } else {
            await User.create({ 
                email: email,
                nome: name, 
                senha: hash 
            })
    
            //redireciona
            res.redirect('/login')
        }
          }
    
}

module.exports = userController;