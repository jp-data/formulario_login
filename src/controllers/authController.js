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

            console.log("Buscando usuário com o email:", email);
            //busca o email informado no banco de dados
            const usuario = await User.findOne({ where: { email: email } });
            console.log("Usuário encontrado:", usuario);

            //Verifica se o usuário existe
            if (!usuario) {
                //se não existir, renderiza a página de login
                console.log("Usuário encontrado:", usuario, usuario.senha);
                return res.render('login', { error: "Email ou senha inválidos" });
            }

            //validação da senha

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            //verifica se a senha está correta
            if (!senhaValida) {
                // console.log("usuário não encontrado")
                //se não existir, renderiza a página de login
                console.log("Senha inválida para o usuário:", email, senhaValida);
                return res.render('login', { error: "senha inválida" });
            }

            //SE os dois estiverem ok, cria uma sessão para o usuário
            //Salvando o email e o id do usuário na sessão
            req.session.user = { email: usuario.email, id: usuario.id_usuario }
            console.log("Sessão criada para o usuário:", req.session.user, senhaValida);

            //leva o usuário para a página restrita
            return res.redirect('/restrito')

        } catch (error) {
            console.log(error)
            return res.status(500).render('error', { error: "Erro no servidor"})
        }
    },

    privateArea: async (req, res) => {
        try {
            //busca o usuário na sessão
            const user = req.session.user;

            //const para ficha de usuário
            const userLogin = await User.findOne({ where: {email: user.email} });

            // //traz os usuários do banco de dados
            // const users = await User.findAll();

            //Renderiza a página restrita que contém a lista de usuários cadastrados
            res.render('areaRestrita', { userLogin });

        } catch (error) {
            console.log(error)
        }

        
    },
    
    privateAreaEdit: async (req, res) => {
        try {
            //bsca o usuário na sessão
            const user = req.session.user;

            //encontra no DB
            const userLogin = await User.findOne({ where: {email: user.email} });

            //renderiza a página com o perfil do usuário na sessão
            res.render('editPerfil', { user, userLogin });

        } catch (error) {
            console.log(error)
        }
    },

    logout: async (req, res) => {
        //destroi a sessão
        req.session.destroy();

        //redireciona para pág de login
        return res.redirect('/login');
    },

    usersList: async (req, res) => {
        try {
        //busca o usuário na sessão
            const user = req.session.user
            
            const users = await User.findAll()
            res.render('usersList', { user, users})
        } catch(error) {
            console.log(error)
        }  }

}

module.exports = authController;