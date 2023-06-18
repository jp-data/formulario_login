module.exports = (sequelize, DataType) => {

    const Contact = sequelize.define('Contact', {
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
    return Contact
};