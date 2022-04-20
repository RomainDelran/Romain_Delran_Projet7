const jwt = require ('jsonwebtoken');


module.exports = (req, res , next) => {

    //const body = JSON.parse(JSON.stringify(req.body));
    //console.log('body auth',req.body);
    
    
    try{
       
        const token = req.body.token;
        const decodedToken = jwt.verify(token,'RAMDOM_TOKEN_SECRET');
        const user_id = decodedToken.user_id ;
        
        if (req.body.user_id && req.body.user_id !== user_id ) {
            throw 'User ID non valable';
        }else{
            next();
        }
    } catch(error) {
        res.status(401).json({error:  'requête non authentifiée'});
    }
};