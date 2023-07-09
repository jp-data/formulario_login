const { database } = require("../config/config");

module.exports = (sequelize, DataType) => {
    //const usuario será usada no controller
    const Experience = sequelize.define('Experience', {
        //abaixo as colunas e as configurações
        id_experiencia: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_usuario: DataType.INTEGER,
        cargo: DataType.STRING,
        empresa: DataType.STRING,
        data_inicio: DataType.DATE,
        data_termino: DataType.DATE,
        atividades: DataType.STRING

    }, {
        tableName: 'experiencias_usuario',
        timestamps: false
    })

    return Experience
};