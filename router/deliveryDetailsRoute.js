const {Router} = require('express');
const router = Router();

const {post,getDeliveryDataByUser} = require('../controller/deliveryDetailsController');

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
})

router.get('/:uid',(req,res) => {
    getDeliveryDataByUser(req.params.uid,(err,result) => {
        if(err){
            res.statusCode=400;
            res.json(err);
        }
        else {
            res.statusCode=200;
            res.json(result);
        }
    })
})

module.exports = router;