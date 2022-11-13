module.exports = (sequelize, DataType) => {
    //const usuario será usada no controller
    const User = sequelize.define('User', {
        //abaixo as colunas e as configurações
        id_usuario: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncremente: true
        },
        email:  DataType.STRING,
        senha: DataType.STRING
    }, {
        tableName: 'usuarios',
        timestamps: false
    })
    return User
};