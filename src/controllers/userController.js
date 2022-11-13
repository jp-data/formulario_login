const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../../database/models')

const userController = {

    //renderiza a página de cadastro
    renderFormCadastro: (req, res) => {
        res.render('formCadastro', { error: null })
    },

    //cadastro
    cadastro: async (req, res) => {
        //pega os dados do usuário do corpo da req/
        const { email, name, senha } = req.body;
        //verificação do email     
        const users = await User.findOne({ where: { email: email } });
        //senha - criptografia

        //verificação do email 
        if (users) {
            return res.render('formCadastro', { error: 'Email já cadastrado' })
        }

        const passwordToString = senha.toString()
        const hash = bcrypt.hashSync(passwordToString, saltRounds);
        
        await User.create({
            email: email,
            nome: name,
            senha: hash
        })

        return res.redirect('/login')


        //redireciona

    }

}

module.exports = userController;