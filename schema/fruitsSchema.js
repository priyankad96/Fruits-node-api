const Sequelize = require('sequelize');
const {db}=require('../config/database');

const Fruit = db.define('fruits',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fruitsname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
});

Fruit.sync({force:false}).then((res)=>{
    console.log("Fruits Table created");
}).catch((err)=>{
    console.log("Error while creating Fruits table");
})

module.exports=Fruit;