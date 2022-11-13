//middleware para verificar se existe uma sessão criada de usuário
const userAuthenticated = (req, res, next) => {
    // verificando se existe a sessão
    //caso não, redireciona para login
    if (req.session.user === undefined) {
        return res.redirect('/sign-up')
    }
    //caso exista sessão: continua a execução do server
    next();
}

module.exports = userAuthenticated;