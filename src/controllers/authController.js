const bcrypt = require('bcrypt');
const { User } = require('../../database/models')

const authController = {
    renderLogin: (req, res) => {
        //verifica se o usuário está logado
        if (req.session.user != undefined) {
            return res.redirect('/restrito')
        }

        return res.render('login', { error: null });
    },

    //validação de login
    login: async (req, res) => {
        try {
            //pegar os dados do usuário pelo formulário
            const { email, senha } = req.body;

            //busca o email informado no banco de dados
            const usuario = await User.findOne({ where: { email: email } });
            //Verifica se o usuário existe
            if (!usuario) {
                // console.log("usuário não encontrado")
                //se não existir, renderiza a página de login
                return res.render('login', { error: "Email ou senhá inválidos" });
            }

            //validação da senha
            const senhaValida = bcrypt.compareSync(senha, usuario.senha);
            //verifica se a senha está correta
            if (!senhaValida) {
                // console.log("usuário não encontrado")
                //se não existir, renderiza a página de login
                return res.render('login', { error: "Email ou senha inválidos" });
            }

            //SE os dois estiverem ok, cria uma sessão para o usuário
            //Salvando o email e o id do usuário na sessão
            req.session.user = { email: usuario.email, id: usuario.id_usuario }

            //leva o usuário para a página restrita
            return res.redirect('/restrito')

        } catch (error) {
            console.log(error)
        }
    },

    privateArea: async (req, res) => {
        try {
            //busca o usuário na sessão
            const user = req.session.user
            //traz os usuários do banco de dados
            const users = await User.findAll()
            //Renderiza a página restrita que contém a lista de usuários cadastrados
            res.render('areaRestrita', { user, users })

        } catch (error) {
            console.log(error)
        }

        
    },

    logout: async (req, res) => {
        //destroi a sessão
        req.session.destroy()
        //redireciona para pág de login
        return res.redirect('/login')
    }
}

module.exports = authController;