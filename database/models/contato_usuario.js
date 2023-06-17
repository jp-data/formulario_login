module.exports = (sequelize, DataType) => {

    const User_contact = sequelize.define('User', {
        //colunas e especificações
        id_cadastro: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idade: DataType.INTEGER,
        estado: DataType.STRING,
        cidade: DataType.STRING,
        email: DataType.STRING,
        telefone: DataType.INTEGER,
        id_usuarios: DataType.INTEGER

    }, {
        tableName: 'contato_usuario',
        timestamps: false
    })
    return User_contact
};