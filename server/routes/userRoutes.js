import express from 'express';
import { signup,login,uploadProfileImage,updateUser,logout } from '../controller/userController.js';
//import { upload } from '../middleware/imageUpload.js';
import { protectUser } from '../middleware/authMiddleware.js';
import multer from 'multer';

import path,{dirname} from 'path';
import { fileURLToPath } from 'url'

const router = express.Router();

router.use(express.static('public'))
//multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
        const destinationPath = path.resolve(__dirname, '../public/profilePic');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage: storage });
router.post('/register',signup);
router.post('/login',login);
router.patch('/profile-image',protectUser,upload.single('image'),uploadProfileImage);
router.put('/update-user',protectUser,updateUser);
router.get('/logout',logout)
export default router; 