const multer = require('multer');
const { v4 } = require('uuid');

// local em que ficará salvo o arquivo de upload
const uploadPath = 'public/uploads';

module.exports = {
    //caminho da pasta e a propriedade
    uploadPath,

    storage: multer.diskStorage( {
        destination: ( request, file, callback ) => {
            callback( null, uploadPath )
        },
        //trocando o nome do arquivo para evitar duplicidade 
        filename: ( request, file, callback ) => {
            const fileName = `${v4()}-${file.originalname}`; 
            callback( null, fileName);

        }
    })
}