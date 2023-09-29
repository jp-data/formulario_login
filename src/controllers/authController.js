const bcrypt = require ('bcrypt');
const { User } = require('../../database/models');
const { Experience } = require('../../database/models');

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
                console.log("Usuário encontrado:", usuario);
                return res.render('login', { error: "Email ou senha inválidos" });
            }

            //validação da senha usando bcrypt
            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            //verifica se a senha está correta
            if (!senhaValida) {
                //se não existir, renderiza a página de login
                console.log("Senha inválida para o usuário:", email, senhaValida);
                return res.render('login', { error: "Email ou senha inválidos" });
            }

            //SE os dois estiverem ok, cria uma sessão para o usuário
            //Salvando o email e o id do usuário na sessão
            req.session.user = { email: usuario.email, id: usuario.id_usuario }


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
            const userPhoto = userLogin.foto;
            

            //traz as experiencias do usuário cadastradas
            const jobs = await Experience.findAll({ where: {id_usuario: user.id} })

            
            // //traz os usuários do banco de dados
            // const users = await User.findAll();

            //Renderiza a página restrita
            res.render('home', { userLogin, jobs, userPhoto } );

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
            const jobs = await Experience.findAll({ where: {id_usuario: user.id} })

            //renderiza a página com o perfil do usuário na sessão
            res.render('editPerfil', { user, userLogin, jobs });

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