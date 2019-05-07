const {Router} = require('express');
const router = Router();
const Sequelize = require('sequelize');
const path = require('path');
const multer = require('multer');

const Register = require('../schema/registrationSchema');
const {db} = require('../config/database');

const {getCountry,getStateByCountryId,AddRegistrationData,getRegisterData,deleteById,getDataById,updateById,getDataByLimit} = require('../controller/registrationDataController');

//Image storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './profileImage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}
});

var upload = multer({storage:storage});

//Get Country
router.get('/', (req, res) => {
    getCountry((err,result) => {
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

//Get state by country id
router.get('/:countryid',(req,res) => {
    const countryid = req.params.countryid;
    getStateByCountryId(countryid,(err,result) => {
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

//Post registration data
router.post('/',upload.single('image'), (req,res,next)=>{
    req.body.image= req.file.filename;    
    AddRegistrationData(req.body,(err,result)=>{
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

//get data from registrations table
router.get('/register/data', (req, res) => {
    getRegisterData((err,result) => {
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

//Delete Data
router.put('/delete/:id',(req, res)=> {
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

//get data from registration using regId
router.get('/register/:rid',(req,res) => {
    const id = req.params.rid;
    getDataById(id,(err,result) => {
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

//update Data
router.put('/:id',upload.single('image'),(req,res) => {
    if(req.file){
        req.body.image = req.file.filename;
    }
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
});

router.get('/pagination/:limit/:page', (req, res) => {
    let limit = req.params.limit; // number of records per page
    let offset = 0
    Register.findAndCountAll({where: {isDeleted: false}})
        .then((data) => {
            let page = req.params.page; // page number
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            db.query("select * from registrations,country,state where isDeleted=false && registrations.countryId = country.countryId && registrations.stateId = state.stateId ORDER BY registrations.regId DESC LIMIT " + offset + "," + limit, {type: Sequelize.QueryTypes.SELECT})
                .then((users) => {
                    res.status(200).json({users, 'count': data.count, 'pages': pages});
                });
        }).catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
});

module.exports=router;