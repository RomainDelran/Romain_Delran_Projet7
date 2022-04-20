const multer = require ('multer');

const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
}



const storage = multer.diskStorage ({

    
    destination : (req, file, callback) => {
        console.log("body multer" ,req.body);
        callback (null, 'visuels')
    },
    filename : (req, file, callback) => {
        console.log("body multer2" ,req.body);
        const name = file.originalname.split (' ').join ('_');
        const extension = MINE_TYPES[file.mimetype];
        
        callback (null, name + Date.now() + '.' + extension );
    }
});

module.exports = multer({storage: storage}).single('image');