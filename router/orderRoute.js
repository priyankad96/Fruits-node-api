const {Router} = require('express');
const router = Router();

const {post} = require('../controller/orderController');

router.post('/', (req,res,next)=>{
    post(req.body,(err,result)=>{
        if(err){
            res.statusCode=400;
            res.json(err);
        }
        else{
            res.statusCode=200;
            res.json(result);
        }
    })
});

module.exports = router;