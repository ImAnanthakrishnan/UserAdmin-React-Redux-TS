import multer from "multer";
import path from 'path';

//const __dirname = path.dirname(new URL(import.meta.url).pathname);
//console.log('dir-'+__dirname)
//console.log(dirname)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/profilePic'),function(error,success){
            if(error){
                console.log(error);
            }
        });
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname; 
        cb(null, name,function(error,success){
            if(error){
                console.log(error);
            }
            if(success){
                console.log('sj ')
            }
        });
    }
});

export const upload = multer({ storage: storage });
