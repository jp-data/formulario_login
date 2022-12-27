const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../../database/models');

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
    },

    //upload de foto 
    upload: async (req, res) => {
        try {
            const avatar = req.file.filename;
            const user = req.session.user;
            const userLogin = await User.findOne({ where: { email: user.email } })
            await User.update({ foto: avatar }, {
                where: { id_usuario: userLogin.id_usuario }
            })
            return res.redirect('/restrito')

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = userController;