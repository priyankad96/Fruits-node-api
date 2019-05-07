const {Router} = require('express');
const router = Router();

const {post,getByUser,deleteById,updateOrderProduct,getCartByFruit} = require('../controller/cartController');

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

router.get('/:uid',(req,res) => {
    const userid = req.params.uid;
    getByUser(userid,(err,result) => {
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

router.get('/fruit/:fid',(req,res) => {
    const fruitid = req.params.fid;
    getCartByFruit(fruitid,(err,result) => {
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

router.delete('/delete/:id',(req, res)=> {
    const fruitid = req.params.id;
    deleteById(fruitid,(err,result)=>{
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

router.put('/:fid/:uid',(req,res) => {
    updateOrderProduct(req.params.fid,req.params.uid,(err,result) => {
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