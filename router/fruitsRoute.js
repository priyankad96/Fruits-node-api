const {Router} = require('express');
const router = Router();

const multer = require('multer');

const {post,getAll,deleteById,updateById,getById} = require('../controller/fruitsController');
const path = require('path');

//store image in the folder
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imageUploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    size:{
        width: 100,
        height: 100
    }
});


//var upload = multer({storage:storage});

//Add Data with Single image
//var upload = multer({storage: storage})
// router.post('/',upload.single('image'), (req,res,next)=>{
//   //  console.log(req.body);
//     req.body.image=req.file.filename;
//     console.log(req.body.image);
//     post(req.body,(err,result)=>{
//         if(err){
//             res.statusCode=400;
//             res.json(err);
//         }
//         else{
//             res.statusCode=200;
//             res.json(result);
//         }
//     })
// });

//Add Data with Multiple image upload
var upload = multer({storage:storage}).array('image',10);
router.post('/',upload, (req,res,next)=>{
    var pictures=[];
    for(let picture of req.files){
        pictures.push(picture.filename);
    }
    req.body.image=JSON.stringify(pictures);
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

//Add Data in both tables
// router.post('/',imageupload.single('image'),(req,res,next)=>{
//     req.body.image = req.file.filename;
//     debugger
//     post(req.body, (err, result) => {
//         debugger
//         if (err) {
//             res.statusCode = 400;
//             res.json(err);
//         }
//         else {
//             debugger
//             getFruitId(req.body, (err, result) => {
//                 if (err) {
//                     res.statusCode = 400;
//                     res.json(err);
//                 }
//                 else {
//                     debugger
//                      router.post('/', imageupload.array('thumbimage'), (req, res, next) => {
//                         var pictures = [];
//                         for (let picture of req.files) {
//                             pictures.push(picture.filename);
//                         }
//                         debugger
//                         // console.log(pictures);
//                         req.body.thumbimage = JSON.stringify(pictures);
//                         postThumbNail(req.body, result.fruitid, (err, result) => {
//                             if (err) {
//                                 res.statusCode = 400;
//                                 res.json(err);
//                             }
//                             else {
//                                 res.statusCode = 200;
//                                 res.json(result);
//                             }
//                         })
//                      })
//                 }
//             });
//         }
//     })
// })

//Get Data
router.get('/getFruits', (req, res) => {
   getAll((err,result) => {
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

//Get Data By ID
router.get('/:id',(req,res) => {
    const id = req.params.id;
    getById(id,(err,result) => {
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

//Delete Data
router.delete('/delete/:id',(req, res)=> {
    const id = req.params.id;
    deleteById(id,(err,result)=>{
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

//Update Data
router.put('/update/:id',(req,res) => {
    updateById(req.params.id,req.body,(err,result) => {
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

module.exports=router;