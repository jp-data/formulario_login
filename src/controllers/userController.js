const bcrypt = require('bcrypt');
// const saltRounds = 10;
const { User } = require('../../database/models');
const { Experience } = require('../../database/models');

const userController = {

    //renderiza a página de cadastro
    renderRegister: (req, res) => {
        res.render('register', { error: null })
    },

    //cadastro
    register: async (req, res) => {
        try {
            //pega os dados do usuário do corpo da req/
            const { email, name, senha } = req.body;


            //verificação do email     
            const users = await User.findOne({ where: { email: email } });

            //verificação do email 
            if (users) {
                return res.render('formCadastro', { error: 'Email já cadastrado' })
            }

            const senhaToString = senha.toString();
            const salt = await bcrypt.genSalt(12);
            const hash = bcrypt.hashSync(senhaToString, salt);

            await User.create({
                email: email,
                nome: name,
                senha: hash
            });

            return res.redirect('/login')
        }

        catch (error) {
            console.log(error)
            res.status(500).send("Erro ao cadastrar dados do usuário")
        }



    },

    // experiências do usuário
    experience: async(req, res) => {
        try{
        
        const user = req.session.user;

        const userLogin = await User.findOne({ where: { email: user.email } });

        const { companie, ocupation, job } = req.body; 

            await Experience.create(
                {
                    id_usuario: userLogin.id_usuario,
                    empresa: companie,
                    cargo: ocupation,
                    atividades: job,
                },
                {
                    where: { id_usuario: userLogin.id_usuario }
                }
            )
            res.redirect('/editPerfil');
        
        }catch(error) {
            console.log(error);
        }
       
    },

    experienceTwo: async(req, res) => {
        try{
        
        const user = req.session.user;

        const userLogin = await User.findOne({ where: { email: user.email } });

        const { companie2, ocupation2, job2 } = req.body;

            await Experience.create(
                {
                    id_usuario: userLogin.id_usuario,
                    empresa: companie2,
                    cargo: ocupation2,
                    atividades: job2,
                },
                {
                    where: { id_usuario: userLogin.id_usuario }
                }
            )
        
        }catch(error) {
            console.log(error);
            res.status(500).send("Erro ao atualizar dados do usuário")
        }
    },

    experiencheThree: async (req, res) => {
        try{
            const user = req.session.user;

            const userLogin = await User.findOne({ where: { email: user.email } });

            const { companie3, ocupation3, job3 } = req.body;

            await Experience.create(
                {
                    id_usuario: userLogin.id_usuario,
                    empresa: companie3,
                    cargo: ocupation3,
                    atividades: job3
                },
                {
                    where: { id_usuario: userLogin.id_usuario }
                }
            )
        }catch(error){
            console.log(error)
        }
    },

    //upload de foto e editor de perfil
    upload: async (req, res) => {
        try {

            //capturando o usuario da sessão
            const user = req.session.user;

            //capturando o usuário
            const userLogin = await User.findOne({ where: { email: user.email } });

            //capturando a foto
            if (userLogin.foto) {
                avatar = userLogin.foto;
            }

            if (req.file) {
                avatar = req.file.filename;
            }


            //capturando a descricao
            let { aboutMe: aboutMeValue } = req.body;

            if (aboutMeValue != "") {
                aboutMe = aboutMeValue;
            }

            else if (userLogin.descricao) {
                let { aboutMe: aboutMeValue } = userLogin.descricao;
                aboutMe = aboutMeValue;
            }

            else {
                aboutMe = null;
            }

            //capturando a idade
            let { age: ageValue } = req.body;

            if (ageValue != "") {
                age = ageValue;
            }

            else if (userLogin.idade) {
                let { age: ageValue } = userLogin.idade;
                age = ageValue;
            }

            else {
                age = null;
            }

            //capturando o estado
            let { state: stateValue } = req.body;

            if (stateValue !== "") {
                state = stateValue;
            }

            else if (userLogin.estado) {
                let { state: stateValue } = userLogin.estado;
                state = stateValue;
            }

            else {
                state = null;
            }


            //capturando a cidade
            let { city: cityValue } = req.body;

            if (cityValue !== "") {
                city = cityValue;
            }

            else if (userLogin.cidade) {
                let { city: cityValue } = userLogin.cidade;
                city = cityValue;
            }

            else {
                city = null;
            }


            //capturando o telefone
            let { phone: phoneValue } = req.body;

            if (phoneValue !== "") {
                phone = phoneValue;
            }

            else if (userLogin.telefone) {
                let { phone: phoneValue } = userLogin.telefone;
                phone = phoneValue;
            }

            else {
                phone = null;
            }

            //atualizando os dados do usuário capturado
            await User.update(
                {
                    foto: avatar,
                    descricao: aboutMe,
                    idade: age,
                    estado: state,
                    cidade: city,
                    telefone: phone
                },
                {
                    where: { id_usuario: userLogin.id_usuario }
                }
            );

            return res.redirect('/restrito');

        } catch (error) {
            console.log(error);
            res.status(500).send("Erro ao atualizar dados do usuário")
        }
    },

    selectUser: async (req, res) => {
        try {
            const user = req.session.user;

            const { id } = req.params;

            const userSelected = await User.findByPk(id);

            if (userSelected.email != user.email) {
                res.render('usersPerfil', { userSelected })
            }

            else {
                res.redirect('/restrito')
            }

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = userController;